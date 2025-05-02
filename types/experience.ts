import { NotionPropertyTypes } from "@/lib/notionClient";

export const EXPERIENCE_DATABASE_ID = process.env.NOTION_EXPERIENCE_DATABASE_ID!

export interface ExperienceData {
    id: string,
    title: string;
    company: string;
    location: string;
    duration: string;
    description: string;
    stack: string;
};

export const blogPropertyMappings = {
    "title": "title",
    "company": "company",
    "duration": "duration",
    "location": "location",
    "description": "description",
    "stack": "stack"
};

export const blogPropertyTypes: Record<string, NotionPropertyTypes> = {
    title: "title",
    company: "rich_text",
    location: "select",
    duration: "rich_text",
    description: "rich_text",
    stack: "rich_text",
};
