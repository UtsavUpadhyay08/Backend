import fs from 'fs';
import path from 'path';
const dbPath = path.resolve(__dirname, '../db.json');

export const readDatabase = (): any[] => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (err:any) {
        if (err.code === 'ENOENT' || err instanceof SyntaxError) {
            fs.writeFileSync(dbPath, JSON.stringify([]));
            return [];
        } else {
            throw err;
        }
    }
};

export const writeDatabase = (submissions: any[]): void => {
    fs.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));
};