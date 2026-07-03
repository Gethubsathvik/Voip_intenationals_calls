// app/api/calls/initiate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { getCountryFromPhone } from '@/utils/helpers';
import { MESSAGES, COUNTRIES } from '@/utils/constants';

export async function POST(request: NextRequest) {
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

    const { phoneNumber } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, error: 'Phone number required' },
        { status: 400 }
      );
    }

    // Get country from phone
    const country = getCountryFromPhone(phoneNumber);
    
    // Find cost per minute
    const countryInfo = COUNTRIES.find(c => c.code === country);
    const costPerMinute = countryInfo?.costPerMinute || 0.01;

    // Check credits
    const credits = await db.credits.findUnique({
      where: { userId: decoded.userId },
    });

    if (!credits || credits.balance < costPerMinute) {
      return NextResponse.json(
        { success: false, error: MESSAGES.ERROR.INSUFFICIENT_CREDITS },
        { status: 402 }
      );
    }

    // Create call record
    const call = await db.call.create({
      data: {
        userId: decoded.userId,
        recipientNumber: phoneNumber,
        recipientCountry: country,
        status: 'INITIATED',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: MESSAGES.SUCCESS.CALL_INITIATED,
        data: {
          callId: call.id,
          costPerMinute,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Call initiation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to initiate call' },
      { status: 500 }
    );
  }
}
