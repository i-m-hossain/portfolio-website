import { siteConfig } from '@/config/siteConfig'
import AboutContent from './AboutContent'
import { createNotionClient, fetchAndProcessNotion, } from '@/lib/notionClient'
import { Summary } from '@/types/notion'

export const revalidate = siteConfig.revalidateTime

const databaseId = process.env.NOTION_SUMMARY_DATABASE_ID!
const apiKey = process.env.NOTION_TOKEN!
export default async function About() {
  const notionClient = createNotionClient(apiKey);
  const summaryMappings = {
    summary: 'summary'
  }
  const summaryData = await fetchAndProcessNotion<Summary>(notionClient, databaseId, summaryMappings);
  return (
    <AboutContent summary={summaryData[0]} />
  )
}
