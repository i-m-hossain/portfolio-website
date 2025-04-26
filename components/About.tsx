import { siteConfig } from '@/config/siteConfig'
import AboutContent from './AboutContent'
import { fetchFromNotion } from '@/lib/notionClient'

export const revalidate = siteConfig.revalidateTime

const databaseId = process.env.NOTION_SUMMARY_DATABASE_ID!

export default async function About() {
  let summary = ''
  try {
    const results = await fetchFromNotion(databaseId)
    const page = results?.[0]

    if (page && 'properties' in page) {
      summary = page.properties.summary?.title?.[0]?.plain_text || ''
    }
  } catch (error) {
    console.error('Failed to fetch About summary:', error)
    summary = 'Welcome to our website! (Default summary)' // Fallback text
  }

  return <AboutContent summary={summary} />
}
