//api/resume/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAllPdfPages } from '@/services/resumeService';

// Endpoint to get all PDF pages
export async function GET() {
    try {
        const pdfPages = await getAllPdfPages();
        return NextResponse.json(pdfPages);
    } catch (error) {
        console.error('Error fetching PDF pages:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching PDF pages' },
            { status: 500 }
        );
    }
}
