import ConnectMe from '@/components/Contact'
import Layout from '@/components/Layout'

import { createNotionClient, fetchAndProcessNotion, fetchFromNotion } from '@/lib/notionClient'
import { PersonalInfo } from '@/types/notion'
export const revalidate = 86400

const databaseId = process.env.NOTION_PERSONAL_INFO_DATABASE_ID!
const apiKey = process.env.NOTION_TOKEN!

export default async function HomePage() {
  const personalInfoMapping = {
    name: 'name',
    title: 'title',
    phone: 'phone',
    email: 'email',
    linkedin: 'linkedin',
    github: 'github'
  };
  const notionClient = createNotionClient(apiKey);
  const personalInfo = await fetchAndProcessNotion<PersonalInfo>(notionClient, databaseId, personalInfoMapping);
  return (
    <Layout>
      <ConnectMe personalInfo={personalInfo[0]} />
    </Layout>
  )
}
