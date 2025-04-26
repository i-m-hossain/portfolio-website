import { ExperienceData } from "@/types/notion";

export function parseExperience(properties: any): ExperienceData {
    const getPlainText = (field: any) => {
        if (field?.type === 'rich_text' && field.rich_text?.length > 0) {
            return field.rich_text.map((rt: any) => rt.plain_text).join('');
        }
        if (field?.type === 'title' && field.title?.length > 0) {
            return field.title.map((t: any) => t.plain_text).join('');
        }
        if (field?.type === 'text' && field.text?.length > 0) {
            return field.text.map((t: any) => t.plain_text).join('');
        }
        if (field?.type === 'select' && field?.select?.name?.length > 0) {
            return field.select.name;
        }
        return '';
    };

    return {
        title: getPlainText(properties.title),
        company: getPlainText(properties.company),
        location: getPlainText(properties.location),
        duration: getPlainText(properties.duration),
        description: getPlainText(properties.description).split('|').map(str => str.trim()).filter(Boolean),
        stack: getPlainText(properties.stack).split('|').map(str => str.trim()).filter(Boolean),
    };
}