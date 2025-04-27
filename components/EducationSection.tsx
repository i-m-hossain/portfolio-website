
import { createNotionClient, fetchAndProcessNotion, fetchFromNotion } from '@/lib/notionClient'
import { Education } from '@/types/notion'
import EducationItem from './EducationItem'
import { siteConfig } from '@/config/siteConfig'

const databaseId = process.env.NOTION_EDUCATION_DATABASE_ID!
export const revalidate = siteConfig.revalidateTime
const apiKey = process.env.NOTION_TOKEN!
export default async function EducationSection() {
  const dataMapping = {
    degree: "degree",
    institution: "institution",
    duration: "duration"
  }
  const notionClient = createNotionClient(apiKey);
  const educationList = await fetchAndProcessNotion<Education>(notionClient, databaseId, dataMapping);
  return (
    <EducationItem educationList={educationList}/>
  )
}

