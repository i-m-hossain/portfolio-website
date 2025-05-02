

import {
    createNotionClient,
    fetchAndProcessNotion,
    createRecord,
    updateRecord,
    getRecordById,
    deleteDatabaseRow
} from "@/lib/notionClient";

import { SKILL_DATABASE_ID, SkillData, skillPropertyMappings, skillPropertyTypes} from "@/types/skills";
const apiKey = process.env.NOTION_TOKEN!
const notionClient = createNotionClient(apiKey);
/**
 * Fetch all blog posts
 */
export async function getAllSkills(): Promise<SkillData[]> {


    // Sort by published date in descending order
    const sorts = [
        {
            property: skillPropertyMappings.category,
            direction: "descending"
        }
    ];

    return await fetchAndProcessNotion<SkillData>(
        notionClient,
        SKILL_DATABASE_ID,
        skillPropertyMappings,
        undefined,
        undefined,
        sorts
    );
}

/**
 * Fetch a single blog post by ID
 */
export async function getSkillById(id: string): Promise<SkillData | null> {

    return await getRecordById<SkillData>(
        notionClient,
        id,
        skillPropertyMappings
    );
}

/**
 * Create a new blog post
 */
export async function createSkill(blogData: Omit<SkillData, 'id'>): Promise<SkillData | null> {
    return await createRecord<SkillData>(
        notionClient,
        SKILL_DATABASE_ID,
        blogData,
        skillPropertyMappings,
        skillPropertyTypes
    );
}

/**
 * Update an existing blog post
 */
export async function updateSkill(
    id: string,
    blogData: Partial<Omit<SkillData, 'id'>>
): Promise<SkillData | null> {
    return await updateRecord<SkillData>(
        notionClient,
        id,
        blogData,
        skillPropertyMappings,
        skillPropertyTypes
    );
}

/**
 * Delete (archive) a blog post
 */
export async function deleteSkill(id: string): Promise<boolean> {

    return await deleteDatabaseRow(notionClient, id);
}

/**
 * Search skills by title
 */
export async function searchSkillsByTitle(query: string): Promise<SkillData[]> {
    const filter = {
        property: skillPropertyMappings.category,
        title: {
            contains: query
        }
    };

    return await fetchAndProcessNotion<SkillData>(
        notionClient,
        SKILL_DATABASE_ID,
        skillPropertyMappings,
        undefined,
        filter
    );
}