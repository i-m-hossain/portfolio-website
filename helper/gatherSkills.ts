import { SkillData } from "@/types/notion";

export function collectSkillsByColumn(results: any[]): SkillData {
    const skills: SkillData = {
        backendApiDevelopment: [],
        frontendDevelopment: [],
        devOpsSystemAdministration: [],
        database: [],
        dataEngineeringAutomation: [],
        otherTools: [],
    };

    results.forEach((notionData) => {
        const properties = notionData.properties;

        if (!properties) return;
        let skill = properties['Backend & API Development']?.title?.[0]?.plain_text
        skill && skills.backendApiDevelopment.push(skill);
        
        skill = properties['Frontend Development']?.rich_text?.[0]?.plain_text
        skill && skills.frontendDevelopment.push(skill);

        skill = properties['DevOps & System Administration']?.rich_text?.[0]?.plain_text || ''
        skill && skills.devOpsSystemAdministration.push(skill);

        skill = properties['Database']?.rich_text?.[0]?.plain_text || ''
        skill && skills.database.push(skill);

        skill = properties['Data Engineering & Automation']?.rich_text?.[0]?.plain_text || ''
        skill && skills.dataEngineeringAutomation.push(skill);

        skill = properties['Other Tools']?.rich_text?.[0]?.plain_text || ''
        skill && skills.otherTools.push(skill);
    });

    return skills;
}
