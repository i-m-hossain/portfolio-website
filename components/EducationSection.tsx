
import { createNotionClient, fetchAndProcessNotion, fetchFromNotion } from '@/lib/notionClient'
import { Education } from '@/types/notion'
import EducationItem from '@/components/EducationItem'


const databaseId = process.env.NOTION_EDUCATION_DATABASE_ID!
export const revalidate = 86400
const apiKey = process.env.NOTION_TOKEN!
const jsonFileName = process.env.LOCAL_EDUCATION_DATA_JSON_FILE_NAME!
export default async function EducationSection() {
  const dataMapping = {
    degree: "degree",
    institution: "institution",
    duration: "duration"
  }
  const notionClient = createNotionClient(apiKey);
  const educationList = await fetchAndProcessNotion<Education>(notionClient, databaseId, dataMapping, jsonFileName);
  return (
    <EducationItem educationList={educationList}/>
  )
}

