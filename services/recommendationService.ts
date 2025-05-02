

import {
    createNotionClient,
    fetchAndProcessNotion,
    createRecord,
    updateRecord,
    getRecordById,
    deleteDatabaseRow
} from "@/lib/notionClient";

import { RECOMMENDATION_DATABASE_ID, RecommendationData, recommendationPropertyMappings, blogPropertyTypes } from "@/types/recommendations";
const apiKey = process.env.NOTION_TOKEN!
const notionClient = createNotionClient(apiKey);
/**
 * Fetch all blog posts
 */
export async function getAllRecommendations(): Promise<RecommendationData[]> {


    // Sort by published date in descending order
    const sorts = [
        {
            property: recommendationPropertyMappings.creationDate,
            direction: "descending"
        }
    ];

    return await fetchAndProcessNotion<RecommendationData>(
        notionClient,
        RECOMMENDATION_DATABASE_ID,
        recommendationPropertyMappings,
        undefined,
        undefined,
        sorts
    );
}

/**
 * Fetch a single blog post by ID
 */
export async function getRecommendationById(id: string): Promise<RecommendationData | null> {

    return await getRecordById<RecommendationData>(
        notionClient,
        id,
        recommendationPropertyMappings
    );
}

/**
 * Create a new blog post
 */
export async function createRecommendation(blogData: Omit<RecommendationData, 'id'>): Promise<RecommendationData | null> {
    return await createRecord<RecommendationData>(
        notionClient,
        RECOMMENDATION_DATABASE_ID,
        blogData,
        recommendationPropertyMappings,
        blogPropertyTypes
    );
}

/**
 * Update an existing blog post
 */
export async function updateRecommendation(
    id: string,
    blogData: Partial<Omit<RecommendationData, 'id'>>
): Promise<RecommendationData | null> {
    return await updateRecord<RecommendationData>(
        notionClient,
        id,
        blogData,
        recommendationPropertyMappings,
        blogPropertyTypes
    );
}

/**
 * Delete (archive) a blog post
 */
export async function deleteRecommendation(id: string): Promise<boolean> {

    return await deleteDatabaseRow(notionClient, id);
}

/**
 * Search recommendations by title
 */
export async function searchRecommendationsByTitle(query: string): Promise<RecommendationData[]> {
    const filter = {
        property: recommendationPropertyMappings.company,
        title: {
            contains: query
        }
    };

    return await fetchAndProcessNotion<RecommendationData>(
        notionClient,
        RECOMMENDATION_DATABASE_ID,
        recommendationPropertyMappings,
        undefined,
        filter
    );
}