// /app/api/blogs/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getBlogById, updateBlog, deleteBlog } from '@/services/blogService';

type tParams = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  props: { params: tParams }
): Promise<NextResponse> {
  const { id } = await props.params;
  try {
    const blog = await getBlogById(id);
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  props: { params: tParams }
) {
  const {id} = await props.params;
  try {
    const body = await request.json();
    
    const existingBlog = await getBlogById(id);
    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    const updatedBlog = await updateBlog(id, body);
    
    if (!updatedBlog) {
      return NextResponse.json(
        { error: 'Failed to update blog post' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating the blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  props: { params: tParams }
) {
  const {id} = await props.params;
  try {
    const existingBlog = await getBlogById(id);
    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    const success = await deleteBlog(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete blog post' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the blog post' },
      { status: 500 }
    );
  }
}