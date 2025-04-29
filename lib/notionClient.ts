/**
 * Flexible helper functions for fetching and processing Notion database data
 */

import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { logError } from "./errorLogger";
import { fetchLocalData } from "./fetchLocalData";

/**
 * Initialize Notion client
 */
export function createNotionClient(apiKey: string): Client {
  return new Client({ auth: apiKey });
}
// Type definitions for common Notion property types
export type NotionPropertyTypes = 
  | 'title' 
  | 'rich_text' 
  | 'select' 
  | 'multi_select'
  | 'date' 
  | 'people' 
  | 'files' 
  | 'checkbox' 
  | 'url' 
  | 'email' 
  | 'phone_number' 
  | 'number' 
  | 'status'
  | 'relation'
  | 'created_by'
  | 'created_time'
  | 'last_edited_by'
  | 'last_edited_time'
  | 'formula';



/**
 * Fetch data from a Notion database
 */
export async function fetchFromNotion(
  notionClient: Client,
  databaseId: string,
  filter?: any,
  sorts?: any[]
): Promise<PageObjectResponse[]> {
  try {
    const queryParams: any = { database_id: databaseId };
    
    if (filter) queryParams.filter = filter;
    if (sorts) queryParams.sorts = sorts;
    
    const response = await notionClient.databases.query(queryParams);
    
    // Filter to ensure we only have PageObjectResponse objects
    return response.results.filter(
      (row): row is PageObjectResponse => 'properties' in row
    );
  } catch (error) {
    logError('fetchFromNotion', error);
    return [];
  }
}

/**
 * Extract property value from Notion page safely
 * Works with any property type and handles potential missing data
 */
export function extractPropertyValue(
  properties: Record<string, any>,
  propertyName: string,
  defaultValue: any = ''
): any {
  try {
    if (!properties || !properties[propertyName]) {
      return defaultValue;
    }
    
    const property = properties[propertyName];
    const type = property.type as NotionPropertyTypes;
    
    switch (type) {
      case 'title':
        return property.title?.[0]?.plain_text || defaultValue;
      
      case 'rich_text':
        return property.rich_text?.[0]?.plain_text || defaultValue;
      
      case 'url':
          return property.url || defaultValue;
      
      case 'select':
        return property.select?.name || defaultValue;
      
      case 'multi_select':
        return property.multi_select?.map((item: any) => item.name) || [];
      
      case 'date':
        return property.date?.start || defaultValue;
      
      case 'checkbox':
        return property.checkbox ?? defaultValue;
    
      case 'people':
        return property.people?.map((person: any) => person.id) || [];
      
      case 'email':
        return property.email || defaultValue;
      
      case 'phone_number':
        return property.phone_number || defaultValue;
      
      case 'number':
        return property.number ?? defaultValue;
      
      case 'status':
        return property.status?.name || defaultValue;
      
      case 'formula':
        // Handle different formula result types
        const formulaType = property.formula.type;
        return property.formula[formulaType] ?? defaultValue;
      
      default:
        return defaultValue;
    }
  } catch (error) {
    console.error(`Error extracting ${propertyName}:`, error);
    return defaultValue;
  }
}

/**
 * Process Notion results using a property mapping configuration
 * @param results The array of Notion page results
 * @param propertyMappings Object mapping output field names to Notion property names
 */
export function processNotionResults<T>(
  results: PageObjectResponse[],
  propertyMappings: Record<string, string>
): T[] {
  return results.map((page) => {
    const output: Record<string, any> = {};
    
    // Map each output field according to the property mappings
    Object.entries(propertyMappings).forEach(([outputField, notionProperty]) => {
      output[outputField] = extractPropertyValue(page.properties, notionProperty);
    });
    
    return output as T;
  });
}


/**
 * Generic function to fetch and process Notion database data
 */
export async function fetchAndProcessNotion<T>(
  notionClient: Client,
  databaseId: string,
  propertyMappings: Record<string, string>,
  jsonFileName: string = '',
  filter?: any,
  sorts?: any[],
  
): Promise<T[]> {
  const notionData  = await fetchFromNotion(notionClient, databaseId, filter, sorts);
  // If we got data from Notion, process it
  // if (notionData && notionData.length > 0) {
  //   return processNotionResults<T>(notionData, propertyMappings)
  // }
  
  if (jsonFileName) {
    const localData = await fetchLocalData<T>(jsonFileName);
    if (localData && localData.length > 0) {
      return localData;
    }
  }
  return [];
}
