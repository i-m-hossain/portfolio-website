import { NotionPropertyTypes } from "@/lib/notionClient";

export const BLOG_DATABASE_ID = process.env.NOTION_BLOGS_DATABASE_ID!
export interface BlogPost {
    id: string;
    title: string;
    publishedAt: string;
    url: string;
}
export const blogPropertyMappings = {
    title: "title",
    publishedAt: "publishedAt",
    url: "url"
};
export const blogPropertyTypes: Record<string, NotionPropertyTypes> = {
    title: "title",
    publishedAt: 'rich_text',
    url: "url"
};