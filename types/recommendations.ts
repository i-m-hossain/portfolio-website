import { NotionPropertyTypes } from "@/lib/notionClient";

export const RECOMMENDATION_DATABASE_ID = process.env.NOTION_RECOMMENDATION_DATABASE_ID!

export interface RecommendationData {
    id: string;
    firstName: string,
    lastName: string,
    jobTitle: string,
    company: string,
    status: string,
    creationDate: string,
    text: string
}
export const recommendationPropertyMappings = {
    order: "order",
    firstName: 'firstName',
    lastName: 'lastName',
    jobTitle: 'jobTitle',
    company: 'company',
    status: 'status',
    creationDate: 'creationDate',
    text: 'text',

};
export const blogPropertyTypes: Record<string, NotionPropertyTypes> = {
    firstName:"title",
    lastName:"rich_text",
    jobTitle:"rich_text",
    company:"rich_text",
    status:"select",
    creationDate:"date",
    text:"rich_text",
};