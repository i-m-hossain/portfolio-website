import { fetchFromNotion } from '@/lib/notionClient';
import Skills from './Skills';
import { siteConfig } from '@/config/siteConfig';
import { SkillData } from '@/types/notion';
import { collectSkillsByColumn } from '@/helper/collectSkillsByColumn';

export const revalidate = siteConfig.revalidateTime;

const databaseId = process.env.NOTION_SKILLS_DATABASE_ID!;

export default async function SkillSection() {
    let skillData: SkillData = {
        backendApiDevelopment: [],
        frontendDevelopment: [],
        devOpsSystemAdministration: [],
        database: [],
        dataEngineeringAutomation: [],
        otherTools: [],
    };

    try {
        const results = await fetchFromNotion(databaseId);
        skillData = collectSkillsByColumn(results);
    } catch (error) {
        console.error('Failed to fetch skills:', error);
        // skills already initialized with empty arrays
    }

    return <Skills skillData={skillData} />;
}
