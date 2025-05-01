
import AboutContent from '@/components/AboutContent'
import { createNotionClient, fetchAndProcessNotion, } from '@/lib/notionClient'
import { Summary } from '@/types/notion'

export const revalidate = 86400

const databaseId = process.env.NOTION_SUMMARY_DATABASE_ID!
const jsonFileName = process.env.LOCAL_ABOUT_DATA_JSON_FILE_NAME!
const apiKey = process.env.NOTION_TOKEN!

export default async function About() {
  const notionClient = createNotionClient(apiKey);
  const summaryMappings = {
    summary: 'summary'
  }
  const summaryData = await fetchAndProcessNotion<Summary>(notionClient, databaseId, summaryMappings, jsonFileName);
  return (
    <AboutContent summary={summaryData[0]} />
  )
}
