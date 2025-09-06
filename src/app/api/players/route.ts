import { NextResponse } from 'next/server';
import { players } from '@/data/players';

export async function GET() {
  try {
    // Simulate API delay for demonstration
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return NextResponse.json({
      players,
      total: players.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching players:', error);
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 }
    );
  }
}