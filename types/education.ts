import { NotionPropertyTypes } from "@/lib/notionClient";

export const EDUCATION_DATABASE_ID = process.env.NOTION_EDUCATION_DATABASE_ID!

export interface Education {
    id: string,
    duration: string,
    institution: string,
    degree: string
}
export const blogPropertyMappings = {
    duration: "duration",
    institution: "institution",
    degree: "degree",

};
export const blogPropertyTypes: Record<string, NotionPropertyTypes> = {
    duration: 'rich_text',
    institution: 'rich_text',
    degree: 'title'
};