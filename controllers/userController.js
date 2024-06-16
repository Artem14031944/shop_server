import { Basket, User } from "../models/models.js";
import TokenService from "../service/tokenService.js"
import ApiError from "../error/ApiError.js";
import bcrypt from "bcrypt";

class UserConttroller {
    async registration(req, res, next) {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'));
        }

        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest(`Пользователь с таким ${email} уже зарегистрирован`));
        };

        const hashPassword = await bcrypt.hash(password, 8);
        const user = await User.create({ email, password: hashPassword, role });
        if (!user) {
            return next(ApiError.internal('Ошибка при регистрации пользователя'));
        };

        const basket = await Basket.create({ user_id: user.id });
        const token = TokenService.generateToken(user.id, user.email, user.role);

        return res.json({ token: token.accessToken });
    };

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal('Пользователь с таким email не найден'));
        };

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Email или пароль неверный'));
        };

        const token = TokenService.generateToken(user.id, user.email, user.role);

        return res.json({ token: token.accessToken });
    };

    async logout(req, res) {

    };

    async check(req, res, next) {
        const token = TokenService.generateToken(req.user.id, req.user.email, req.user.role);
        return res.json({ token });
    };
};

export default new UserConttroller();