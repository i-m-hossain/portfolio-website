
import { createNotionClient, fetchAndProcessNotion } from '@/lib/notionClient'
import {  Reference } from '@/types/notion'

import References from '@/components/References'


export const revalidate = 86400

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

