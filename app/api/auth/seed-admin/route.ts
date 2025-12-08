/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
  try {
    await connectToDatabase();

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@autoparts.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Check if admin already exists
    const existingAdmin = await (User as any).findOne({ email: adminEmail });
    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin user already exists', email: adminEmail },
        { status: 200 }
      );
    }

    // Create admin user
    const adminUser = new (User as any)({
      name: 'Administrator',
      email: adminEmail,
      password: adminPassword,
      role: 'ADMIN'
    });

    await adminUser.save();

    return NextResponse.json(
      { 
        message: 'Admin user created successfully',
        email: adminEmail,
        defaultPassword: 'admin123 (please change this)'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Admin seed error:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}