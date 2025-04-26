import Layout from "@/components/Layout"
import RecommendationSection from "@/components/RecommendationSection"
import { fetchFromNotion } from "@/lib/notionClient"
import { Recommendation } from "@/types/notion"
import { env } from "process"
const databaseId = process.env.NOTION_RECOMMENDATION_DATABASE_ID!

export default async function Recommendation() {
  let recommendations:Recommendation[] = []

  try {
    const results = await fetchFromNotion(databaseId)
    if (results && Array.isArray(results)) {
      recommendations = results.map((page) => {
        const creationDate = page.properties['Creation Date'].date?.start;
        const status = page.properties.Status.select?.name;
        const company = page.properties.Company.rich_text[0]?.plain_text;
        const lastName = page.properties['Last Name'].rich_text[0]?.plain_text;
        const jobTitle = page.properties['Job Title'].rich_text[0]?.plain_text;
        const text = page.properties.Text.rich_text[0]?.plain_text;
        const firstName = page.properties['First Name'].title[0]?.plain_text;

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
