// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, createToken } from '@/lib/auth';
import { MESSAGES } from '@/utils/constants';

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json();

    // Validation
    if (!email || !password || password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: MESSAGES.ERROR.EMAIL_EXISTS },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    // Create credits record
    await db.credits.create({
      data: {
        userId: user.id,
        balance: 5.0,
        bonusAmount: 5.0,
      },
    });

    // Create settings record
    await db.userSettings.create({
      data: {
        userId: user.id,
      },
    });

    // Create token
    const token = createToken(user.id, user.email);

    return NextResponse.json(
      {
        success: true,
        message: MESSAGES.SUCCESS.REGISTER,
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    );
  }
}
