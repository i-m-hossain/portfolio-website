import { NotionPropertyTypes } from "@/lib/notionClient";

export const SKILL_DATABASE_ID = process.env.NOTION_SKILLS_DATABASE_ID!
export interface SkillData{
    category: "string",
    skills: "string",
}
export const skillPropertyMappings = {
    category: "category",
    skills: "skills",
};
export const skillPropertyTypes: Record<string, NotionPropertyTypes> = {
    category: "title",
    skills: "rich_text",
};