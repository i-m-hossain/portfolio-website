
import BlogContent from "@/components/BlogContent"
import Layout from "@/components/Layout"
import { siteConfig } from '@/config/siteConfig'
import { fetchFromNotion } from '@/lib/notionClient'
import { Blog } from '@/types/notion'
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export const revalidate = siteConfig.revalidateTime

const databaseId = process.env.NOTION_BLOGS_DATABASE_ID!

export default async function BlogPage() {
  let blogs: Blog[] = []

  try {
    const results = await fetchFromNotion(databaseId)
    if (results && Array.isArray(results)) {
      blogs = results.map((page) => {
        const p = page as PageObjectResponse
        const titleProperty = p.properties?.title
        const title = titleProperty?.type === 'title' 
          ? titleProperty.title?.[0]?.type === 'text' 
            ? titleProperty.title[0].text.content || 'Untitled' 
            : 'Untitled'
          : 'Untitled'
        const publishedAtProperty = p?.properties?.publishedAt
        const publishedAt = publishedAtProperty?.type === 'rich_text' && publishedAtProperty.rich_text[0]
          ? publishedAtProperty.rich_text[0].plain_text
          : 'Unknown'
        const urlProperty = p.properties?.url
        const url = urlProperty?.type === 'url' && urlProperty.url ? urlProperty.url : ''

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
