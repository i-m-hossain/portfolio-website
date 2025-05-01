import fs from 'fs';
import path from 'path';
import { logError } from './errorLogger';

export async function fetchLocalData<T>(databaseType: string): Promise<T[]> {
    try {
        const filePath = path.join(process.cwd(), 'data', `${databaseType}.json`);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        logError('fetchLocalData', error);
        return [];
    }
}