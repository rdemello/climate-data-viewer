import {} from '../utils/Utils.mjs';
import path from 'path';
import fs from 'fs';

export class MapDataModel {
    static async getMapData(fileName) {
        const filepath = path.resolve("./data/cleaned", fileName);
        const data = fs.readFileSync(filepath, 'utf-8');
        return data;
    };
}
