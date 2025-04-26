
import BlogContent from "@/components/BlogContent"
import Layout from "@/components/Layout"
import { siteConfig } from '@/config/siteConfig'
import { fetchFromNotion } from '@/lib/notionClient'
import { Blog } from '@/types/notion'

export const revalidate = siteConfig.revalidateTime

const databaseId = process.env.NOTION_BLOGS_DATABASE_ID!

export default async function BlogPage() {
  let blogs: Blog[] = []

  try {
    const results = await fetchFromNotion(databaseId)
    if (results && Array.isArray(results)) {
      blogs = results.map((page) => {
        const title = page.properties?.title?.title?.[0]?.text?.content || 'Untitled'
        const publishedAt = page?.properties.publishedAt.rich_text[0].plain_text || 'Unknown '
        const url = page.properties?.url?.url || ''

        return { title, publishedAt, url }
      })
    }
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
  }
  return (
    <Layout>
      <BlogContent blogs={blogs}/>
    </Layout>
  )
}
