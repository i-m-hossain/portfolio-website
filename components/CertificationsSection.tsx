
import { createNotionClient, fetchAndProcessNotion } from '@/lib/notionClient'
import { Certification } from '@/types/notion'
import Certifications from './Certifications'
export const revalidate = 86400

const databaseId = process.env.NOTION_CERTIFICATIONS_DATABASE_ID!
const apiKey = process.env.NOTION_TOKEN!;

export default async function CertificationsSection() {
  const dataMapping = {
      certificationName: "certificationName",
      certificationLink: "certificationLink",
      issued: "issued",
      credentialId: "credentialId",
      issuedBy: "issuedBy"
    }
    const notionClient = createNotionClient(apiKey);
    const certifications = await fetchAndProcessNotion<Certification>(notionClient, databaseId, dataMapping);
  return (
    <Certifications certifications={certifications}/>
  )
  
}
