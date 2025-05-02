/**
 * Flexible helper functions for fetching and processing Notion database data
 * Including CRUD operations for database records
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
 * Create a new row in a Notion database
 * (Note: In Notion's API, database rows are represented as pages)
 * @param notionClient The Notion client instance
 * @param databaseId The ID of the database to add the row to
 * @param properties Object containing the column values for the new row
 * @returns The created database row or null if creation failed
 */
export async function createDatabaseRow(
  notionClient: Client,
  databaseId: string,
  properties: Record<string, any>
): Promise<PageObjectResponse | null> {
  try {
    const response = await notionClient.pages.create({
      parent: { database_id: databaseId },
      properties: properties
    });
    
    // Ensure the response is a PageObjectResponse
    if ('properties' in response) {
      return response as PageObjectResponse;
    }
    return null;
  } catch (error) {
    logError('createDatabaseRow', error);
    return null;
  }
}

/**
 * Update an existing row in a Notion database
 * @param notionClient The Notion client instance
 * @param rowId The ID of the row to update (page_id in Notion's API)
 * @param properties Object containing the column values to update
 * @returns The updated database row or null if update failed
 */
export async function updateDatabaseRow(
  notionClient: Client,
  rowId: string,
  properties: Record<string, any>
): Promise<PageObjectResponse | null> {
  try {
    const response = await notionClient.pages.update({
      page_id: rowId,
      properties: properties
    });
    
    // Ensure the response is a PageObjectResponse
    if ('properties' in response) {
      return response as PageObjectResponse;
    }
    return null;
  } catch (error) {
    logError('updateDatabaseRow', error);
    return null;
  }
}

/**
 * Delete (archive) a row from a Notion database
 * Note: Notion API doesn't truly delete rows, it archives them
 * @param notionClient The Notion client instance
 * @param rowId The ID of the row to delete (page_id in Notion's API)
 * @returns True if successful, false otherwise
 */
export async function deleteDatabaseRow(
  notionClient: Client,
  rowId: string
): Promise<boolean> {
  try {
    await notionClient.pages.update({
      page_id: rowId,
      archived: true
    });
    return true;
  } catch (error) {
    logError('deleteDatabaseRow', error);
    return false;
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
 * Format a single value for a specific Notion property type
 * Used when creating or updating records
 */
export function formatPropertyValue(value: any, type: NotionPropertyTypes): any {
  switch (type) {
    case 'title':
      return {
        title: [
          {
            type: "text",
            text: { content: String(value) }
          }
        ]
      };
    
    case 'rich_text':
      return {
        rich_text: [
          {
            type: "text",
            text: { content: String(value) }
          }
        ]
      };
    
    case 'select':
      return {
        select: { name: String(value) }
      };
    
    case 'multi_select':
      // value should be an array of strings
      return {
        multi_select: Array.isArray(value)
          ? value.map(item => ({ name: String(item) }))
          : []
      };
    
    case 'date':
      // Handles both date strings and Date objects
      return {
        date: typeof value === 'string' 
          ? { start: value } 
          : { start: value instanceof Date ? value.toISOString().split('T')[0] : null }
      };
    
    case 'checkbox':
      return {
        checkbox: Boolean(value)
      };
    
    case 'url':
      return {
        url: String(value)
      };
    
    case 'email':
      return {
        email: String(value)
      };
    
    case 'phone_number':
      return {
        phone_number: String(value)
      };
    
    case 'number':
      return {
        number: Number(value)
      };
    
    case 'status':
      return {
        status: { name: String(value) }
      };
    
    default:
      return null;
  }
}

/**
 * Format properties for creating or updating a Notion database row
 * Helps convert from your application's data model to Notion's property format
 * @param data Object containing the data to convert to Notion properties
 * @param propertyMappings Object mapping your data fields to Notion property names
 * @param propertyTypes Object specifying the Notion type for each property
 */
export function formatPropertiesForNotion(
  data: Record<string, any>,
  propertyMappings: Record<string, string>,
  propertyTypes: Record<string, NotionPropertyTypes>
): Record<string, any> {
  const properties: Record<string, any> = {};
  
  Object.entries(data).forEach(([dataField, value]) => {
    // Get the corresponding Notion property name
    const propertyName = propertyMappings[dataField];
    if (!propertyName) return;
    
    // Get the type for this property
    const propertyType = propertyTypes[dataField];
    if (!propertyType) return;
    
    // Format the property based on its type
    properties[propertyName] = formatPropertyValue(value, propertyType);
  });
  
  return properties;
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
    
    // Add the Notion page ID for reference
    output.id = page.id;
    
    return output as T;
  });
}

/**
 * Create a new record in a Notion database with proper type conversion
 * @param T The type of the record being created
 * @param notionClient The Notion client instance
 * @param databaseId The ID of the database
 * @param data The data to create
 * @param propertyMappings Mapping from your data model to Notion property names
 * @param propertyTypes Notion property types for each field
 * @returns The created record converted to your data model format, or null if creation failed
 */
export async function createRecord<T>(
  notionClient: Client,
  databaseId: string,
  data: Record<string, any>,
  propertyMappings: Record<string, string>,
  propertyTypes: Record<string, NotionPropertyTypes>
): Promise<T | null> {
  try {
    // Format properties for Notion
    const properties = formatPropertiesForNotion(data, propertyMappings, propertyTypes);
    
    // Create the database row
    const row = await createDatabaseRow(notionClient, databaseId, properties);
    if (!row) return null;
    
    // Convert the result back to your data model
    return processNotionResults<T>([row], propertyMappings)[0];
  } catch (error) {
    logError('createRecord', error);
    return null;
  }
}

/**
 * Update an existing record in a Notion database with proper type conversion
 */
export async function updateRecord<T>(
  notionClient: Client,
  rowId: string,
  data: Partial<Record<string, any>>,
  propertyMappings: Record<string, string>,
  propertyTypes: Record<string, NotionPropertyTypes>
): Promise<T | null> {
  try {
    // Format properties for Notion (only include properties that are in the data)
    const properties = formatPropertiesForNotion(data, propertyMappings, propertyTypes);
    
    // Update the database row
    const row = await updateDatabaseRow(notionClient, rowId, properties);
    if (!row) return null;
    
    // Convert the result back to your data model
    return processNotionResults<T>([row], propertyMappings)[0];
  } catch (error) {
    logError('updateRecord', error);
    return null;
  }
}

/**
 * Bulk create multiple records in a Notion database
 */
export async function bulkCreateRecords<T>(
  notionClient: Client,
  databaseId: string,
  dataArray: Record<string, any>[],
  propertyMappings: Record<string, string>,
  propertyTypes: Record<string, NotionPropertyTypes>
): Promise<T[]> {
  const results: T[] = [];
  
  for (const data of dataArray) {
    try {
      const record = await createRecord<T>(
        notionClient, 
        databaseId, 
        data, 
        propertyMappings, 
        propertyTypes
      );
      
      if (record) {
        results.push(record);
      }
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      logError('bulkCreateRecords item', error);
      // Continue with the next item on error
    }
  }
  
  return results;
}

/**
 * Get a single record by ID with proper formatting
 */
export async function getRecordById<T>(
  notionClient: Client,
  rowId: string,
  propertyMappings: Record<string, string>
): Promise<T | null> {
  try {
    const row = await notionClient.pages.retrieve({ page_id: rowId });
    
    // Ensure the response is a PageObjectResponse
    if ('properties' in row) {
      return processNotionResults<T>([row as PageObjectResponse], propertyMappings)[0];
    }
    return null;
  } catch (error) {
    logError('getRecordById', error);
    return null;
  }
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
  if (notionData && notionData.length > 0) {
    return processNotionResults<T>(notionData, propertyMappings)
  }
  
  if (jsonFileName) {
    const localData = await fetchLocalData<T>(jsonFileName);
    if (localData && localData.length > 0) {
      return localData;
    }
  }
  return [];
}