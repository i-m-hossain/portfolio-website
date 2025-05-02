import { NotionPropertyTypes } from "@/lib/notionClient";

export const PERSONAL_INFO_DATABASE_ID = process.env.NOTION_PERSONAL_INFO_DATABASE_ID!

export interface PersonalInfoData {
    id: string,
    name: string,
    title: string,
    phone: string,
    email: string,
    github: string,
    linkedin: string
}
export const blogPropertyMappings = {
    name: 'name',
    title: 'title',
    phone: 'phone',
    email: 'email',
    github: 'github',
    linkedin: 'linkedin',

};
export const blogPropertyTypes: Record<string, NotionPropertyTypes> = {
    name: 'title',
    title: 'rich_text',
    phone: 'phone_number',
    email: 'email',
    github: 'url',
    linkedin: 'url',
};