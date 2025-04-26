import { siteConfig } from '@/config/siteConfig'
import AboutContent from './AboutContent'
import { fetchFromNotion } from '@/lib/notionClient'

export const revalidate = siteConfig.revalidateTime

const databaseId = process.env.NOTION_SUMMARY_DATABASE_ID

export default async function About() {
  const results = await fetchFromNotion(databaseId)
  const summary = results?.[0]?.properties?.summary?.title?.[0]?.plain_text || ''

  return <AboutContent summary={summary} />
}
