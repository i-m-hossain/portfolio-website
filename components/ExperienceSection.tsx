
import { createNotionClient, fetchAndProcessNotion, fetchFromNotion } from '@/lib/notionClient'
import { ExperienceData } from '@/types/notion'
import Experience from '@/components/Experience'


export const revalidate = 86400

const databaseId = process.env.NOTION_EXPERIENCE_DATABASE_ID!
const apiKey = process.env.NOTION_TOKEN!
const jsonFileName = process.env.LOCAL_EXPERIENCES_DATA_JSON_FILE_NAME!

export default async function ExperienceSection() {
  const dataMapping = {
    "order": "order",
    "title": "title",
    "company": "company",
    "duration": "duration",
    "location": "location",
    "description": "description",
    "stack": "stack"
  }
  const sorts = [
    {
        property: dataMapping?.order,
        direction: "descending"
    }
];
  const notionClient = createNotionClient(apiKey);
  const experiences = await fetchAndProcessNotion<ExperienceData>(notionClient, databaseId, dataMapping, jsonFileName, undefined, sorts);
  return (
    <Experience experiences={experiences} />
  )
}

