import { MapDataModel } from '../models/MapDataModel.mjs';

export class MapDataController {
    static async getMapData(req, res) {
        const filename = req.body.filename;
        try {
            const response = await MapDataModel.getMapData(filename);
            res.status(200).json({
                message: response,
            });
        } catch (error) {
            res.status(500).json({
                message: `Could not load data from ${filename}`,
                error: error.message,
            });
        }
    }
}
