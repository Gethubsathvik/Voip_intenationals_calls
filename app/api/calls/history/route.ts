// app/api/calls/history/route.ts
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

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const calls = await db.call.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    const total = await db.call.count({
      where: { userId: decoded.userId },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          calls,
          total,
          limit,
          offset,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Call history error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch call history' },
      { status: 500 }
    );
  }
}
