import { Reference } from "@/types/notion";

export function extractReferenceData(properties: any):Reference {
    return {
      phone: properties.phone?.phone_number || '',
      title: properties.title?.rich_text?.[0]?.plain_text || '',
      email: properties.email?.email || '',
      name: properties.name?.title?.[0]?.plain_text || ''
    }
  }