export interface Summary {
    summary: string
}
export interface Blog {
    title: string
    publishedAt: string
    url: string
}
export interface Recommendation {
    firstName: string,
    lastName: string,
    jobTitle: string,
    company: string,
    status: string,
    creationDate: string,
    text: string
}

export interface Certification {
    certificationName: string,
    certificationLink: string,
    issued: string,
    credentialId: string,
    issuedBy: string
}

export interface Education {
    degree: string,
    institution: string,
    duration: string
}

export interface SkillData {
    backendApiDevelopment: string[];
    frontendDevelopment: string[];
    devOpsSystemAdministration: string[];
    database: string[];
    dataEngineeringAutomation: string[];
    otherTools: string[];
}
export interface SkillDataFromNotion {
    backendApiDevelopment: string;
    frontendDevelopment: string;
    devOpsSystemAdministration: string;
    database: string;
    dataEngineeringAutomation: string;
    otherTools: string;
}


export interface ExperienceData {
    title: string;
    company: string;
    location: string;
    duration: string;
    description: string;
    stack: string;
};

export interface Reference {
    name: string,
    title: string,
    email: string,
    phone: string,
}

export interface PersonalInfo {
    name: string,
    title: string,
    phone: string,
    email: string,
    github: string,
    linkedin: string
}

export type NotionEntity = 'about' | 'blog' | 'certification' | 'contact' | 'education' | 'experience' | 'profile' | 'recommendation' | 'skill'