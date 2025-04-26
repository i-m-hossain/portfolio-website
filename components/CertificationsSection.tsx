import { siteConfig } from '@/config/siteConfig'
import { fetchFromNotion } from '@/lib/notionClient'
import { Certification } from '@/types/notion'
import Certifications from './Certifications'
export const revalidate = siteConfig.revalidateTime

const databaseId = process.env.NOTION_CERTIFICATIONS_DATABASE_ID!


export default async function CertificationsSection() {
  let certifications: Certification[] = []

  try {
    const results = await fetchFromNotion(databaseId)
    if (results && Array.isArray(results)) {
      certifications = results.map((notionData) => {
        const issuedBy = notionData.properties.issuedBy.rich_text[0]?.plain_text || '';
        const credentialId = notionData.properties.credentialId.rich_text[0]?.plain_text || '';
        const certificationLink = notionData.properties.certificationLink.url || '';
        const issued = notionData.properties.issued.rich_text[0]?.plain_text || '';
        const certificationName = notionData.properties.certificationName.title[0]?.plain_text || '';

        return {certificationName, certificationLink, issued, credentialId, issuedBy}
      })
    }
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
  }
  
  return (
    <Certifications certifications={certifications}/>
  )
  
}
