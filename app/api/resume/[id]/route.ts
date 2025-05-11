// src/app/api/pdfs/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPdfPage } from '@/services/resumeService';

type tParams = Promise<{ id: string }>;
// Endpoint to get a specific PDF page
export async function GET(
    request: NextRequest,
    props: { params: tParams }
) {
    const { id } = await props.params;
    try {
        const pdfPage = await getPdfPage(id);

        if (!pdfPage) {
            return NextResponse.json(
                { error: 'PDF page not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(pdfPage);
    } catch (error) {
        console.error('Error fetching PDF page:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching the PDF page' },
            { status: 500 }
        );
    }
}