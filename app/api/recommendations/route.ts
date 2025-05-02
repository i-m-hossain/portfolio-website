// src/app/api/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createRecommendation,  getAllRecommendations } from '@/services/recommendationService';
import { RecommendationData } from '@/types/recommendations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.firstName || !body.text || !body.lastName || !body.jobTitle || !body.company || !body.status || !body.creationDate) {
        return NextResponse.json(
          { error: 'firstName, lastName, text, jobTitle, company, status, creationDate are required' },
          { status: 400 }
        );
      }

    // Format the data for the blog service
    const recommendationData: Omit<RecommendationData, 'id'> = {
        firstName : body.firstName, 
        text : body.text, 
        lastName : body.lastName, 
        jobTitle : body.jobTitle, 
        company : body.company, 
        status : body.status, 
        creationDate : body.creationDate,
    };

    // Create the blog post in Notion
    const newBlog = await createRecommendation(recommendationData);

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
    const blogs = await getAllRecommendations();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching blog posts' },
      { status: 500 }
    );
  }
}