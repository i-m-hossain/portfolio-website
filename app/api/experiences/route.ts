// src/app/api/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createExperience, getAllExperiences } from '@/services/experienceService';
import { ExperienceData } from '@/types/experience';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.title || !body.company|| !body.location || !body.duration || !body.description || !body.stack) {
            return NextResponse.json(
                { error: 'firstName, lastName, text, jobTitle, company, status, creationDate are required' },
                { status: 400 }
            );
        }

        // Format the data for the blog service
        const experienceData: Omit<ExperienceData, 'id'> = {
            title: body.title,
            company: body.company,
            location: body.location,
            duration: body.duration,
            description: body.description,
            stack: body.stack,
        };

        // Create the blog post in Notion
        const newBlog = await createExperience(experienceData);

        if (!newBlog) {
            return NextResponse.json(
                { error: 'Failed to create blog post' },
                { status: 500 }
            );
        }

        return NextResponse.json(newBlog, { status: 201 });

    } catch (error) {
        console.error('Error creating blog post:', error);
        return NextResponse.json(
            { error: 'An error occurred while creating the blog post' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const blogs = await getAllExperiences();
        return NextResponse.json(blogs);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching blog posts' },
            { status: 500 }
        );
    }
}