
import { fetchFromNotion } from '@/lib/notionClient'
import { Education } from '@/types/notion'
import EducationItem from './EducationItem'

const databaseId = process.env.NOTION_EDUCATION_DATABASE_ID!

export default async function EducationSection() {
  let educationList: Education[] = []
  
  try {
    const results = await fetchFromNotion(databaseId)
    if (results && Array.isArray(results)) {
      educationList = results.map((notionData) => {
        const duration = notionData.properties.duration.rich_text[0]?.plain_text || '';
        const institution = notionData.properties.institution.rich_text[0]?.plain_text || '';
        const degree = notionData.properties.degree.title[0]?.plain_text || '';
        return { degree, institution, duration }
      })
    }
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
  }

  return (
    <EducationItem educationList={educationList}/>
  )
}

