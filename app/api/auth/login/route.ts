// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { comparePassword, createToken } from '@/lib/auth';
import { MESSAGES } from '@/utils/constants';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Find user
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { success: false, error: MESSAGES.ERROR.INVALID_CREDENTIALS },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.password || '');
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: MESSAGES.ERROR.INVALID_CREDENTIALS },
        { status: 401 }
      );
    }

    // Update last login
    await db.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Create token
    const token = createToken(user.id, user.email);

    return NextResponse.json(
      {
        success: true,
        message: MESSAGES.SUCCESS.LOGIN,
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            country: user.country,
            verified: user.verified,
            createdAt: user.createdAt,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}
