
import { createNotionClient, fetchAndProcessNotion, fetchFromNotion } from '@/lib/notionClient'
import { ExperienceData } from '@/types/notion'
import Experience from './Experience'
import { parseExperience } from '@/helper/parseExperience'
import { siteConfig } from '@/config/siteConfig'

export const revalidate = siteConfig.revalidateTime

const databaseId = process.env.NOTION_EXPERIENCE_DATABASE_ID!
const apiKey = process.env.NOTION_TOKEN!

export default async function ExperienceSection() {
  const dataMapping = {
    "title": "title",
    "company": "company",
    "duration": "duration",
    "location": "location",
    "description": "description",
    "stack": "stack"
  }
  const notionClient = createNotionClient(apiKey);
  const experiences = await fetchAndProcessNotion<ExperienceData>(notionClient, databaseId, dataMapping);
  return (
    <Experience experiences={experiences} />
  )
}

