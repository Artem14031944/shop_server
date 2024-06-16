import { Device, DeviceInfo } from '../models/models.js';
import { fileURLToPath } from 'url';
import { v4 } from 'uuid';
import ApiError from '../error/ApiError.js';
import path from 'path';

class DeviceConttroller {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId } = req.body;
            const { img } = req.files;

            let fileName = v4() + '.jpg';
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);

            img.mv(path.resolve(__dirname, '..', 'static', fileName));   
            const device = await Device.create({ name, price, brandId, typeId, img: fileName });

            if (info) {
                info = JSON.parse(info);
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                })
            };

            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };

    async getAll(req, res) {
        let { brandId, typeId, limit, page, info } = req.query;
        page = +page || 1;
        limit = +limit || 9;
        let offset = page * limit - limit;
        let devices;

        if(!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset });
        } 

        if(brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
        }

        if(!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
        }

        if(brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset });
        }

        return res.json(devices);
    };

    async getOne(req, res) {
        let { id } = req.params;
        const device = await Device.findOne(
            { 
                where: { id },
                include: [{ model: DeviceInfo, as: 'device_infos' }], 
            }
        );
        
        return res.json(device);
    };
};

export default new DeviceConttroller();