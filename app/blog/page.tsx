
import BlogContent from "@/components/BlogContent"
import Layout from "@/components/Layout"
import { siteConfig } from '@/config/siteConfig'
import { createNotionClient, fetchAndProcessNotion, fetchFromNotion } from '@/lib/notionClient'
import { Blog } from '@/types/notion'

export const revalidate = siteConfig.revalidateTime
const databaseId = process.env.NOTION_BLOGS_DATABASE_ID!
const apiKey = process.env.NOTION_TOKEN!
export default async function BlogPage() {
  const blogMappings = {
    title: 'title',
    publishedAt: 'publishedAt',
    url: 'url'
  };
  const notionClient = createNotionClient(apiKey);
  const blogs = await fetchAndProcessNotion<Blog>(notionClient, databaseId, blogMappings);

  return (
    <Layout>
      <BlogContent blogs={blogs} />
    </Layout>
  )
}
