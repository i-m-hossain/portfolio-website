// src/app/api/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createBlog, getAllBlogs } from '@/services/blogService';
import { BlogPost } from '@/types/blogs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.publishedAt || !body.url) {
      return NextResponse.json(
        { error: 'Title , published channel and url are required' },
        { status: 400 }
      );
    }

    // Format the data for the blog service
    const blogData: Omit<BlogPost, 'id'> = {
      title: body.title,
      publishedAt: body.publishedAt,
      url: body.url || null
    };

    // Create the blog post in Notion
    const newBlog = await createBlog(blogData);

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
    const blogs = await getAllBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching blog posts' },
      { status: 500 }
    );
  }
}