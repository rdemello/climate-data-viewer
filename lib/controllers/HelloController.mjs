import { HelloModel } from '../models/HelloModel.mjs';

export class HelloController {
    static async test(req, res) {
        try {
            const response = HelloModel.test();
            res.status(200).json({
                message: response,
            });
        } catch (error) {
            res.status(500).json({
                message: 'Goodbye world',
                error: error.message,
            });
        }
    }
}
