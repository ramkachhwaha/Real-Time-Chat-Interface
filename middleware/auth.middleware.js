import { verifyToken } from "../config/jwt.config.js";
import userModel from "../models/user.model.js";

export async function authMiddlewareOnlyForUser(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];

    try {

        let verify = verifyToken(token);

        if (!verify) return res.status(401).json({ message: 'Unauthrized user rt' });

        let user = await userModel.findOne({ _id: verify.id, role: verify.role, isActive: true, isDeleted: false })
  
        if (!user) {
            return res.status(401).json({ message: 'Unauthrized user' });
        }

        req.user = verify

        next()
    } catch (error) {
        return res.status(403).json({ message: error.message })
    }


}

