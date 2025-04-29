
import BlogContent from "@/components/BlogContent"
import Layout from "@/components/Layout"

import { createNotionClient, fetchAndProcessNotion, fetchFromNotion } from '@/lib/notionClient'
import { Blog } from '@/types/notion'
export const revalidate = 86400

const databaseId = process.env.NOTION_BLOGS_DATABASE_ID!
const apiKey = process.env.NOTION_TOKEN!
const jsonFileName = process.env.LOCAL_BLOGS_DATA_JSON_FILE_NAME!

export default async function BlogPage() {
  const blogMappings = {
    title: 'title',
    publishedAt: 'publishedAt',
    url: 'url'
  };
  const notionClient = createNotionClient(apiKey);
  const blogs = await fetchAndProcessNotion<Blog>(notionClient, databaseId, blogMappings, jsonFileName);
  console.log(blogs)
  return (
    <Layout>
      <BlogContent blogs={blogs} />
    </Layout>
  )
}
