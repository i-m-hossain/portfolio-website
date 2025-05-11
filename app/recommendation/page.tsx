import Layout from "@/components/Layout"
import RecommendationSection from "@/components/RecommendationSection"

import { createNotionClient, fetchAndProcessNotion, fetchFromNotion } from "@/lib/notionClient"
import { Recommendation } from "@/types/notion"
import { recommendationPropertyMappings } from "@/types/recommendations"
export const revalidate = 86400

const databaseId = process.env.NOTION_RECOMMENDATION_DATABASE_ID!
const apiKey = process.env.NOTION_TOKEN!
const jsonFileName = process.env.LOCAL_RECOMMENDATIONS_DATA_JSON_FILE_NAME!

export default async function RecommendationPage() {

  const notionClient = createNotionClient(apiKey);
  const sorts = [
    {
      property: recommendationPropertyMappings.order,
      direction: "descending"
    }
  ];
  const recommendations = await fetchAndProcessNotion<Recommendation>(notionClient, databaseId, recommendationPropertyMappings, jsonFileName, undefined, sorts);
  
  return (
    <Layout>
      <RecommendationSection recommendations={recommendations} />
    </Layout>
  )
}
