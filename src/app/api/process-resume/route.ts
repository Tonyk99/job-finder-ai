import { NextRequest, NextResponse } from 'next/server';
import { parseResumeWithGemini } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { cvText } = await request.json();

    // Validation
    if (!cvText) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      );
    }

    if (cvText.trim().length < 50) {
      return NextResponse.json(
        { error: 'Resume text is too short. Please provide a complete resume.' },
        { status: 400 }
      );
    }

    // API Key check
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured. Please add GEMINI_API_KEY to environment.' },
        { status: 500 }
      );
    }

    // Parse resume with Gemini (REPLACES MOCK DATA)
    const profile = await parseResumeWithGemini(cvText);

    const jobMatches = [
      {
        id: '1',
        title: 'Backend Developer',
        company: 'Stripe',
        location: 'Tokyo, Japan',
        salary: '$120,000 - $150,000',
        matchReasons: ['Python', 'Django', 'Tokyo location match'],
      },
      {
        id: '2',
        title: 'Full-Stack Engineer',
        company: 'Mercari',
        location: 'Tokyo, Japan',
        salary: '¥8,000,000 - ¥11,000,000',
        matchReasons: ['React', 'Python', 'Tokyo location match'],
      },
      {
        id: '3',
        title: 'Frontend Developer (React)',
        company: 'Notion (Remote)',
        location: 'Japan',
        salary: '$110,000 - $140,000',
        matchReasons: ['React', 'Japan location match'],
      },
    ];

    return NextResponse.json({
      profile,
      jobMatches,
    });
  } catch (error) {
    console.error('Error processing resume:', error);

    if (error instanceof Error && error.message.includes('Failed to parse resume with AI')) {
      return NextResponse.json(
        { error: 'AI processing failed. Please try again or check your API key.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process resume' },
      { status: 500 }
    );
  }
}
