// app/api/admin/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

async function isAdmin(userId: string): Promise<boolean> {
  const user = await db.user.findUnique({ where: { id: userId } });
  return user?.email === process.env.ADMIN_EMAIL;
}

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

    if (!decoded || !(await isAdmin(decoded.userId))) {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get analytics
    const totalUsers = await db.user.count();
    const activeUsers = await db.user.count({
      where: {
        lastLogin: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
        },
      },
    });

    const totalCalls = await db.call.count({
      where: { status: 'COMPLETED' },
    });

    const totalDuration = await db.call.aggregate({
      _sum: { duration: true },
      where: { status: 'COMPLETED' },
    });

    const totalCreditsUsed = await db.call.aggregate({
      _sum: { creditsUsed: true },
      where: { status: 'COMPLETED' },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          totalUsers,
          activeUsers,
          totalCalls,
          totalDuration: totalDuration._sum.duration || 0,
          totalCreditsUsed: totalCreditsUsed._sum.creditsUsed || 0,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin analytics error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
