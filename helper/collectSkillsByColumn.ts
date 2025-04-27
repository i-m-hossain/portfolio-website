import { SkillData, SkillDataFromNotion } from "@/types/notion";

export function collectSkillsByColumn(result: SkillDataFromNotion[]): SkillData  {
    let skills:SkillData= {
        backendApiDevelopment: [],
        frontendDevelopment: [],
        devOpsSystemAdministration: [],
        database: [],
        dataEngineeringAutomation: [],
        otherTools: []
    };

    result.forEach((data:SkillDataFromNotion) => {
        if (!data) return;
        let skill = data['backendApiDevelopment']
        skill && skills.backendApiDevelopment.push(skill);
        
        skill = data['frontendDevelopment']
        skill && skills.frontendDevelopment.push(skill);

        skill = data['devOpsSystemAdministration']
        skill && skills.devOpsSystemAdministration.push(skill);

        skill = data['database']
        skill && skills.database.push(skill);

        skill = data['dataEngineeringAutomation']
        skill && skills.dataEngineeringAutomation.push(skill);

        skill = data['otherTools']
        skill && skills.otherTools.push(skill);
    });

    return skills;
}
