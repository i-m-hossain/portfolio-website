import Layout from "@/components/Layout"
import RecommendationSection from "@/components/RecommendationSection"

import { createNotionClient, fetchAndProcessNotion, fetchFromNotion } from "@/lib/notionClient"
import { Recommendation } from "@/types/notion"
export const revalidate = 86400

const databaseId = process.env.NOTION_RECOMMENDATION_DATABASE_ID!
const apiKey = process.env.NOTION_TOKEN!

export default async function RecommendationPage() {
  const recommendationMapping = {
    creationDate: 'Creation Date',
    status: 'Status',
    company: 'Company',
    lastName: 'Last Name',
    firstName: 'First Name',
    text: 'Text',
    jobTitle: 'Job Title'
  };
  const notionClient = createNotionClient(apiKey);
  const recommendations = await fetchAndProcessNotion<Recommendation>(notionClient, databaseId, recommendationMapping);
  
  return (
    <Layout>
      <RecommendationSection recommendations={recommendations} />

    </Layout>
  )
}
