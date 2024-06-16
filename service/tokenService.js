import jwt from "jsonwebtoken";

class TokenService {
    generateToken(id, email, role) {
        const accessToken = jwt.sign({ id, email, role }, process.env.JWT_SECRET_ACCESS_TOKEN, { expiresIn: '24h'} );
        const refershToken = jwt.sign({ id, email, role }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '15d'} );

        return {
            accessToken,
            refershToken
        }
    }
}

export default new TokenService();