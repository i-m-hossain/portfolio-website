

import {
    createNotionClient,
    fetchAndProcessNotion,
    createRecord,
    updateRecord,
    getRecordById,
    deleteDatabaseRow
} from "@/lib/notionClient";

import { CERTIFICATION_DATABASE_ID, CertificationData, certificationPropertyMappings,certificationPropertyTypes } from "@/types/certifications";
const apiKey = process.env.NOTION_TOKEN!
const notionClient = createNotionClient(apiKey);
/**
 * Fetch all certification posts
 */
export async function getAllCertifications(): Promise<CertificationData[]> {


    // Sort by published date in descending order
    const sorts = [
        {
            property: certificationPropertyMappings.certificationName,
            direction: "descending"
        }
    ];

    return await fetchAndProcessNotion<CertificationData>(
        notionClient,
        CERTIFICATION_DATABASE_ID,
        certificationPropertyMappings,
        undefined,
        undefined,
        sorts
    );
}

/**
 * Fetch a single certification post by ID
 */
export async function getCertificationById(id: string): Promise<CertificationData | null> {

    return await getRecordById<CertificationData>(
        notionClient,
        id,
        certificationPropertyMappings
    );
}

/**
 * Create a new certification post
 */
export async function createCertification(certificationData: Omit<CertificationData, 'id'>): Promise<CertificationData | null> {
    return await createRecord<CertificationData>(
        notionClient,
        CERTIFICATION_DATABASE_ID,
        certificationData,
        certificationPropertyMappings,
        certificationPropertyTypes
    );
}

/**
 * Update an existing certification post
 */
export async function updateCertification(
    id: string,
    certificationData: Partial<Omit<CertificationData, 'id'>>
): Promise<CertificationData | null> {
    return await updateRecord<CertificationData>(
        notionClient,
        id,
        certificationData,
        certificationPropertyMappings,
        certificationPropertyTypes
    );
}

/**
 * Delete (archive) a certification post
 */
export async function deleteCertification(id: string): Promise<boolean> {

    return await deleteDatabaseRow(notionClient, id);
}

/**
 * Search certifications by title
 */
export async function searchCertificationsByTitle(query: string): Promise<CertificationData[]> {
    const filter = {
        property: certificationPropertyMappings.certificationName,
        title: {
            contains: query
        }
    };

    return await fetchAndProcessNotion<CertificationData>(
        notionClient,
        CERTIFICATION_DATABASE_ID,
        certificationPropertyMappings,
        undefined,
        filter
    );
}