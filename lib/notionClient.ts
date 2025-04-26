// notionClient.ts
import { Client } from "@notionhq/client";
import {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN, // Set your Notion secret as an env variable
});

// Fetch data from a Notion database
export const fetchFromNotion = async (
  databaseId: string,
  params?: Omit<QueryDatabaseParameters, "database_id">
): Promise<QueryDatabaseResponse["results"]> => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      ...params,
    });

    return response.results;
  } catch (error: any) {
    console.error("Notion fetch error:", error.message || error);
    throw error;
  }
};
