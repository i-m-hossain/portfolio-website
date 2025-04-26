
import { fetchFromNotion } from '@/lib/notionClient'
import {  Reference } from '@/types/notion'
import EducationItem from './EducationItem'
import { siteConfig } from '@/config/siteConfig'
import References from './References'
import {  extractReferenceData } from '@/helper/extractReferenceData'

const databaseId = process.env.NOTION_REFERENCES_DATABASE_ID!
export const revalidate = siteConfig.revalidateTime

export default async function ReferenceSection() {
  let referenceList: Reference[] = []
  
  try {
    const results = await fetchFromNotion(databaseId)
    if (results && Array.isArray(results)) {
      referenceList = results.map((notionData) => {
        return extractReferenceData(notionData.properties)
      })
    }
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
  }

  return (
    <References referenceList={referenceList}/>
  )
}

