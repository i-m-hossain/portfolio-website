
import { NextRequest, NextResponse } from 'next/server';

import { getRecommendationById, updateRecommendation, deleteRecommendation } from '@/services/recommendationService';

type tParams = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  props: { params: tParams }
): Promise<NextResponse> {
  const { id } = await props.params;
  try {
    const recommendation = await getRecommendationById(id);
    
    if (!recommendation) {
      return NextResponse.json(
        { error: 'Recommendation post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(recommendation);
  } catch (error) {
    console.error('Error fetching recommendation post:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the recommendation post' },
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
    
    const existingRecommendation = await getRecommendationById(id);
    if (!existingRecommendation) {
      return NextResponse.json(
        { error: 'Recommendation post not found' },
        { status: 404 }
      );
    }
    
    const updatedRecommendation = await updateRecommendation(id, body);
    
    if (!updatedRecommendation) {
      return NextResponse.json(
        { error: 'Failed to update recommendation post' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(updatedRecommendation);
  } catch (error) {
    console.error('Error updating recommendation post:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating the recommendation post' },
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
    const existingRecommendation = await getRecommendationById(id);
    if (!existingRecommendation) {
      return NextResponse.json(
        { error: 'Recommendation post not found' },
        { status: 404 }
      );
    }
    
    const success = await deleteRecommendation(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete recommendation post' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting recommendation post:', error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the recommendation post' },
      { status: 500 }
    );
  }
}