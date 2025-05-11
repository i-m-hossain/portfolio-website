import { NotionPropertyTypes } from "@/lib/notionClient";

export const SKILL_DATABASE_ID = process.env.NOTION_SKILLS_DATABASE_ID!
export interface SkillData{
    order: "number"
    category: "string",
    skills: "string",
}
export const skillPropertyMappings = {
    order: "order",
    category: "category",
    skills: "skills",
};
export const skillPropertyTypes: Record<string, NotionPropertyTypes> = {
    order:"number",
    category: "title",
    skills: "rich_text",
};