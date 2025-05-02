import { NotionPropertyTypes } from "@/lib/notionClient";

export const CERTIFICATION_DATABASE_ID = process.env.NOTION_CERTIFICATIONS_DATABASE_ID!

export interface CertificationData {
    id: string;
    certificationName: string,
    certificationLink: string,
    issued: string,
    credentialId: string,
    issuedBy: string
}
export const certificationPropertyMappings = {
    certificationName: "certificationName",
    certificationLink: 'certificationLink',
    issued: "issued",
    credentialId: "credentialId",
    issuedBy: "issuedBy"

};
export const certificationPropertyTypes: Record<string, NotionPropertyTypes> = {
    certificationName: "title",
    certificationLink: 'url',
    issued: "rich_text",
    credentialId: "rich_text",
    issuedBy: "rich_text"
};