import Layout from "@/components/Layout"
import RecommendationSection from "@/components/RecommendationSection"
import { siteConfig } from "@/config/siteConfig"
import { fetchFromNotion } from "@/lib/notionClient"
import { Recommendation } from "@/types/notion"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
const databaseId = process.env.NOTION_RECOMMENDATION_DATABASE_ID!
export const revalidate = siteConfig.revalidateTime
export default async function RecommendationPage() {
  let recommendations:Recommendation[] = []

  try {
    const results = await fetchFromNotion(databaseId)
    if (results && Array.isArray(results)) {
      recommendations = results
        .filter((page): page is PageObjectResponse => 'properties' in page)
        .map((page) => {
          const creationDate = page.properties['Creation Date'].type === 'date' 
            ? page.properties['Creation Date'].date?.start || '' 
            : '';
          const status = page.properties.Status.type === 'select' ? page.properties.Status.select?.name || '' : '';
          const company = page.properties.Company.type === 'rich_text' 
            ? page.properties.Company.rich_text[0]?.plain_text || '' 
            : '';
          const lastName = page.properties['Last Name'].type === 'rich_text' 
            ? page.properties['Last Name'].rich_text[0]?.plain_text || '' 
            : '';
          const jobTitle = page.properties['Job Title'].type === 'rich_text' 
            ? page.properties['Job Title'].rich_text[0]?.plain_text || '' 
            : '';
          const text = page.properties.Text.type === 'rich_text' 
            ? page.properties.Text.rich_text[0]?.plain_text 
            : undefined;
          const firstName = page.properties['First Name'].type === 'title' 
            ? page.properties['First Name'].title[0]?.plain_text || '' 
            : '';

          return { creationDate, status, company, lastName, firstName, text, jobTitle }
        })
    }
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
  }
  return (
    <Layout>
      <RecommendationSection  recommendations={recommendations}/>

    </Layout>
  )
}
