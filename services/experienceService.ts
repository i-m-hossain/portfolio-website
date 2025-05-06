

import {
    createNotionClient,
    fetchAndProcessNotion,
    createRecord,
    updateRecord,
    getRecordById,
    deleteDatabaseRow
} from "@/lib/notionClient";

import {  EXPERIENCE_DATABASE_ID, ExperienceData, experiencePropertyMappings, experiencePropertyTypes } from "@/types/experience";
const apiKey = process.env.NOTION_TOKEN!
const notionClient = createNotionClient(apiKey);
/**
 * Fetch all experience posts
 */
export async function getAllExperiences(): Promise<ExperienceData[]> {


    // Sort by published date in descending order
    const sorts = [
        {
            property: experiencePropertyMappings.company,
            direction: "descending"
        }
    ];

    return await fetchAndProcessNotion<ExperienceData>(
        notionClient,
        EXPERIENCE_DATABASE_ID,
        experiencePropertyMappings,
        undefined,
        undefined,
        sorts
    );
}

/**
 * Fetch a single experience post by ID
 */
export async function getExperienceById(id: string): Promise<ExperienceData | null> {

    return await getRecordById<ExperienceData>(
        notionClient,
        id,
        experiencePropertyMappings
    );
}

/**
 * Create a new experience post
 */
export async function createExperience(experienceData: Omit<ExperienceData, 'id'>): Promise<ExperienceData | null> {
    return await createRecord<ExperienceData>(
        notionClient,
        EXPERIENCE_DATABASE_ID,
        experienceData,
        experiencePropertyMappings,
        experiencePropertyTypes
    );
}

/**
 * Update an existing experience post
 */
export async function updateExperience(
    id: string,
    experienceData: Partial<Omit<ExperienceData, 'id'>>
): Promise<ExperienceData | null> {
    return await updateRecord<ExperienceData>(
        notionClient,
        id,
        experienceData,
        experiencePropertyMappings,
        experiencePropertyTypes
    );
}

/**
 * Delete (archive) a experience post
 */
export async function deleteExperience(id: string): Promise<boolean> {

    return await deleteDatabaseRow(notionClient, id);
}

/**
 * Search experiences by title
 */
export async function searchExperiencesByTitle(query: string): Promise<ExperienceData[]> {
    const filter = {
        property: experiencePropertyMappings.company,
        title: {
            contains: query
        }
    };

    return await fetchAndProcessNotion<ExperienceData>(
        notionClient,
        EXPERIENCE_DATABASE_ID,
        experiencePropertyMappings,
        undefined,
        filter
    );
}