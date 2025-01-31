import { Brand } from '../models/models.js';

class BrandConttroller {
    async create(req, res) {
        const { name } = req.body;
        const brand = await Brand.create({ name });
        return res.json(brand);
    };

    async getAll(req, res) {
        const brands = await Brand.findAll();
        res.json(brands);
    };
};

export default new BrandConttroller();