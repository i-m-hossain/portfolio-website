
import { createNotionClient, fetchAndProcessNotion } from '@/lib/notionClient'
import {  Reference } from '@/types/notion'
import { siteConfig } from '@/config/siteConfig'
import References from './References'


export const revalidate = siteConfig.revalidateTime

const databaseId = process.env.NOTION_REFERENCES_DATABASE_ID!
const apiKey=process.env.NOTION_TOKEN!

export default async function ReferenceSection() {
  const dataMapping = {
    name: "name",
    title: "title",
    email: "email",
    phone: "phone",
  }
  const notionClient = createNotionClient(apiKey);
  const referenceList = await fetchAndProcessNotion<Reference>(notionClient, databaseId, dataMapping);

  return (
    <References referenceList={referenceList}/>
  )
}

