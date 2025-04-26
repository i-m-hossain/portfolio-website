
import { fetchFromNotion } from '@/lib/notionClient'
import {  ExperienceData } from '@/types/notion'
import Experience from './Experience'
import { parseExperience } from '@/helper/parseExperience'
import { siteConfig } from '@/config/siteConfig'

const databaseId = process.env.NOTION_EXPERIENCE_DATABASE_ID!
export const revalidate = siteConfig.revalidateTime

export default async function ExperienceSection() {
  let experiences: ExperienceData[] = []
  
  try {
    const results = await fetchFromNotion(databaseId)
    if (results && Array.isArray(results)) {
      experiences = results.map((notionData) => {
        const experience = parseExperience(notionData?.properties);        
        return experience;
      })
    }
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
  }

  return (
    <Experience experiences={experiences}/>
  )
}

