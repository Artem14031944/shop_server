import { Type } from '../models/models.js';

class TypeController {
    async create(req, res) {
        const { name } = req.body;
        const type = await Type.create({ name });
        res.json(type);
    };

    async getAll(req, res) {
        const types = await Type.findAll(); 
        res.json(types);
    };
};

export default new TypeController();