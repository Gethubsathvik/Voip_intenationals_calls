// app/api/credits/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
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

    return NextResponse.json(
      {
        success: true,
        data: credits,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Credits fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch credits' },
      { status: 500 }
    );
  }
}
