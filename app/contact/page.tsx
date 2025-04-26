import ConnectMe from '@/components/Contact'
import Layout from '@/components/Layout'
import { siteConfig } from '@/config/siteConfig'
import { fetchFromNotion } from '@/lib/notionClient'
import { PersonalInfo } from '@/types/notion'
export const revalidate = siteConfig.revalidateTime

const databaseId = process.env.NOTION_PERSONAL_INFO_DATABASE_ID!
export default async function HomePage() {
  let personalInfo: PersonalInfo[] = []
  try {
    const results = await fetchFromNotion(databaseId)
    if (results && Array.isArray(results)) {
      personalInfo = results.map((row) => {
        const phone= row.properties.phone.phone_number
        const email= row.properties.email.email
        const title= row.properties.title.rich_text[0].plain_text // Assuming rich_text contains at least one element
        const linkedin= row.properties.linkedin.url
        const github= row.properties.github.url
        const name= row.properties.name.title[0].plain_text 
        
        return {name, title, phone, email, linkedin, github}
      })
    }
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
  }
  return (
    <Layout>
      <ConnectMe personalInfo={personalInfo[0]} />
    </Layout>
  )
}
