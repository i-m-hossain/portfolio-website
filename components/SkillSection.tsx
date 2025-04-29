import { createNotionClient, fetchAndProcessNotion, fetchFromNotion } from '@/lib/notionClient';
import Skills from '@/components/Skills';
;
import { SkillData, SkillDataFromNotion } from '@/types/notion';
import { collectSkillsByColumn } from '@/helper/collectSkillsByColumn';

export const revalidate = 86400;

const databaseId = process.env.NOTION_SKILLS_DATABASE_ID!;
const apiKey = process.env.NOTION_TOKEN!;
const jsonFileName= process.env.LOCAL_SKILLS_DATA_JSON_FILE_NAME!;

export default async function SkillSection() {
    const skillMapping = {
        "backendApiDevelopment": "Backend & API Development",
        "frontendDevelopment": "Frontend Development",
        "devOpsSystemAdministration": "DevOps & System Administration",
        "database": "Database",
        "dataEngineeringAutomation": "Data Engineering & Automation",
        "otherTools": "Other Tools",

    }
    const notionClient = createNotionClient(apiKey);
    const skillData = await fetchAndProcessNotion<SkillDataFromNotion>(notionClient, databaseId, skillMapping, jsonFileName);
    const skills = collectSkillsByColumn(skillData)

    return (
        <>
            <Skills skillData={skills} />
        </>
    );
}
