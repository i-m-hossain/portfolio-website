
import { createNotionClient, fetchAndProcessNotion } from '@/lib/notionClient'
import {  Reference } from '@/types/notion'

import References from '@/components/References'


export const revalidate = 86400

const databaseId = process.env.NOTION_REFERENCES_DATABASE_ID!
const apiKey=process.env.NOTION_TOKEN!
const jsonFileName = process.env.LOCAL_REFERENCES_DATA_JSON_FILE_NAME!

export default async function ReferenceSection() {
  const dataMapping = {
    order: "order",
    name: "name",
    title: "title",
    email: "email",
    phone: "phone",
  }
  const sorts = [
    {
        property: dataMapping.order,
        direction: "descending"
    }
];
  const notionClient = createNotionClient(apiKey);

  const referenceList = await fetchAndProcessNotion<Reference>(notionClient, databaseId, dataMapping, jsonFileName, undefined, sorts);
  
  return (
    <References referenceList={referenceList}/>
  )
}

