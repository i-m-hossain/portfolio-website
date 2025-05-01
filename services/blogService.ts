// src/lib/services/blogService.ts

import {
    createNotionClient,
    fetchAndProcessNotion,
    createRecord,
    updateRecord,
    getRecordById,
    deleteDatabaseRow
} from "@/lib/notionClient";
import { BLOG_DATABASE_ID, BlogPost, blogPropertyMappings, blogPropertyTypes } from "@/types/blogs";
const apiKey = process.env.NOTION_TOKEN!
const notionClient = createNotionClient(apiKey);
/**
 * Fetch all blog posts
 */
export async function getAllBlogs(): Promise<BlogPost[]> {


    // Sort by published date in descending order
    const sorts = [
        {
            property: blogPropertyMappings.publishedAt,
            direction: "descending"
        }
    ];

    return await fetchAndProcessNotion<BlogPost>(
        notionClient,
        BLOG_DATABASE_ID,
        blogPropertyMappings,
        undefined,
        undefined,
        sorts
    );
}

/**
 * Fetch a single blog post by ID
 */
export async function getBlogById(id: string): Promise<BlogPost | null> {

    return await getRecordById<BlogPost>(
        notionClient,
        id,
        blogPropertyMappings
    );
}

/**
 * Create a new blog post
 */
export async function createBlog(blogData: Omit<BlogPost, 'id'>): Promise<BlogPost | null> {
    return await createRecord<BlogPost>(
        notionClient,
        BLOG_DATABASE_ID,
        blogData,
        blogPropertyMappings,
        blogPropertyTypes
    );
}

/**
 * Update an existing blog post
 */
export async function updateBlog(
    id: string,
    blogData: Partial<Omit<BlogPost, 'id'>>
): Promise<BlogPost | null> {
    return await updateRecord<BlogPost>(
        notionClient,
        id,
        blogData,
        blogPropertyMappings,
        blogPropertyTypes
    );
}

/**
 * Delete (archive) a blog post
 */
export async function deleteBlog(id: string): Promise<boolean> {

    return await deleteDatabaseRow(notionClient, id);
}

/**
 * Search blogs by title
 */
export async function searchBlogsByTitle(query: string): Promise<BlogPost[]> {
    const filter = {
        property: blogPropertyMappings.title,
        title: {
            contains: query
        }
    };

    return await fetchAndProcessNotion<BlogPost>(
        notionClient,
        BLOG_DATABASE_ID,
        blogPropertyMappings,
        undefined,
        filter
    );
}