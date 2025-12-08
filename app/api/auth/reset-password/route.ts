import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await (User as any).findOne({ email });
    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({ 
        message: 'If an account with that email exists, we have sent a password reset link.' 
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    // Save reset token to user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // Send reset email (placeholder - implement your email service)
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;
    
    // For development, just log the reset URL
    console.log('Password Reset URL:', resetUrl);
    
    // In production, you would send an actual email:
    // await sendEmail({
    //   to: email,
    //   subject: 'Password Reset Request',
    //   html: `Click <a href="${resetUrl}">here</a> to reset your password. Link expires in 1 hour.`
    // });

    return NextResponse.json({ 
      message: 'If an account with that email exists, we have sent a password reset link.',
      resetUrl: resetUrl // Remove this in production
    });

  } catch (error: any) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}