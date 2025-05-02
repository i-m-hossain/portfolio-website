// src/app/api/certifications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createCertification, getAllCertifications } from '@/services/certificationService';
import { CertificationData } from '@/types/certifications';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields for certifications
        if (!body.certificationName || !body.issuedBy || !body.issued) {
            return NextResponse.json(
                { error: 'certificationName, issuedBy, and issued are required' },
                { status: 400 }
            );
        }
        

        // Format the data for the certification service
        const certificationData: Omit<CertificationData, 'id'> = {
            certificationName: body.certificationName,
            certificationLink: body.certificationLink || '',
            issued: body.issued,
            credentialId: body.credentialId || '',
            issuedBy: body.issuedBy
        };

        // Create the certification in Notion
        const newCertification = await createCertification(certificationData);

        if (!newCertification) {
            return NextResponse.json(
                { error: 'Failed to create certification' },
                { status: 500 }
            );
        }

        return NextResponse.json(newCertification, { status: 201 });

    } catch (error) {
        console.error('Error creating certification:', error);
        return NextResponse.json(
            { error: 'An error occurred while creating the certification' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const certifications = await getAllCertifications();
        return NextResponse.json(certifications);
    } catch (error) {
        console.error('Error fetching certifications:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching certifications' },
            { status: 500 }
        );
    }
}