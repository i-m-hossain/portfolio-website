import { createNotionClient, fetchAndProcessNotion, fetchFromNotion } from '@/lib/notionClient';
import Skills from '@/components/Skills';
import { SkillData } from '@/types/skills';



export const revalidate = 86400;

const databaseId = process.env.NOTION_SKILLS_DATABASE_ID!;
const apiKey = process.env.NOTION_TOKEN!;
const jsonFileName = process.env.LOCAL_SKILLS_DATA_JSON_FILE_NAME!;

export default async function SkillSection() {
    const skillMapping = {
        order: "order",
        category: "category",
        skills: "skills",
    }
    const sorts = [
        {
            property: skillMapping.order,
            direction: "descending"
        }
    ];
    const notionClient = createNotionClient(apiKey);
    const skills = await fetchAndProcessNotion<SkillData>(notionClient, databaseId, skillMapping, jsonFileName, undefined, sorts);
    

    return (
        <>
            <Skills skills={skills} />
        </>
    );
}
