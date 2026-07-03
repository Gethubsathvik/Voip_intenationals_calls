// app/api/calls/[callId]/end/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { COUNTRIES } from '@/utils/constants';

export async function POST(
  request: NextRequest,
  { params }: { params: { callId: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.slice(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { duration } = await request.json();

    // Get call
    const call = await db.call.findUnique({
      where: { id: params.callId },
    });

    if (!call || call.userId !== decoded.userId) {
      return NextResponse.json(
        { success: false, error: 'Call not found' },
        { status: 404 }
      );
    }

    // Calculate cost
    const countryInfo = COUNTRIES.find(c => c.code === call.recipientCountry);
    const costPerMinute = countryInfo?.costPerMinute || 0.01;
    const durationMinutes = Math.ceil(duration / 60);
    const creditsUsed = durationMinutes * costPerMinute;

    // Update call
    const updatedCall = await db.call.update({
      where: { id: params.callId },
      data: {
        status: 'COMPLETED',
        duration,
        creditsUsed,
        endedAt: new Date(),
      },
    });

    // Deduct credits
    await db.credits.update({
      where: { userId: decoded.userId },
      data: {
        balance: {
          decrement: creditsUsed,
        },
      },
    });

    // Create transaction
    await db.transaction.create({
      data: {
        userId: decoded.userId,
        type: 'CALL_DEDUCTION',
        amount: creditsUsed,
        status: 'COMPLETED',
        description: `Call to ${call.recipientNumber}`,
        referenceId: call.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Call ended',
        data: updatedCall,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Call end error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to end call' },
      { status: 500 }
    );
  }
}
