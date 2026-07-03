// app/api/credits/daily-bonus/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

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

    const credits = await db.credits.findUnique({
      where: { userId: decoded.userId },
    });

    if (!credits) {
      return NextResponse.json(
        { success: false, error: 'Credits not found' },
        { status: 404 }
      );
    }

    // Check if bonus was already claimed today
    const lastBonus = credits.lastDailyBonus;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (lastBonus) {
      const lastBonusDate = new Date(lastBonus);
      lastBonusDate.setHours(0, 0, 0, 0);
      if (lastBonusDate.getTime() === today.getTime()) {
        return NextResponse.json(
          { success: false, error: 'Bonus already claimed today' },
          { status: 400 }
        );
      }
    }

    // Update credits
    const updatedCredits = await db.credits.update({
      where: { userId: decoded.userId },
      data: {
        balance: credits.balance + credits.bonusAmount,
        lastDailyBonus: new Date(),
      },
    });

    // Create transaction record
    await db.transaction.create({
      data: {
        userId: decoded.userId,
        type: 'DAILY_BONUS',
        amount: credits.bonusAmount,
        status: 'COMPLETED',
        description: 'Daily bonus claimed',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Daily bonus claimed',
        data: updatedCredits,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Daily bonus error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to claim bonus' },
      { status: 500 }
    );
  }
}
