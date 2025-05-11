
import { createNotionClient, fetchAndProcessNotion } from '@/lib/notionClient'
import { Certification } from '@/types/notion'
import Certifications from './Certifications'
export const revalidate = 86400

const databaseId = process.env.NOTION_CERTIFICATIONS_DATABASE_ID!
const apiKey = process.env.NOTION_TOKEN!;
const jsonFileName = process.env.LOCAL_CERTIFICATIONS_DATA_JSON_FILE_NAME!

export default async function CertificationsSection() {
  const dataMapping = {
      order: "order",
      certificationName: "certificationName",
      certificationLink: "certificationLink",
      issued: "issued",
      credentialId: "credentialId",
      issuedBy: "issuedBy"
    }
    const sorts = [
      {
          property: dataMapping?.order,
          direction: "descending"
      }
  ];
    const notionClient = createNotionClient(apiKey);
    const certifications = await fetchAndProcessNotion<Certification>(notionClient, databaseId, dataMapping, jsonFileName, undefined, sorts);
  return (
    <Certifications certifications={certifications}/>
  )
  
}
