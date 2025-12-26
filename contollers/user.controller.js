import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { generateToken } from '../config/jwt.config.js';
import ServerResponse from '../response/pattern.js';

export async function loginUser(req, res) {
    try {
        const { login_user, password } = req.body;


        let user = await User.findOne({
            $or: [
                { email: login_user },
                { phone: Number(login_user) }
            ]
        });

        if (!user) {
            return res.status(404).json(new ServerResponse(false, null, "User not found", null));
        }

        if (!user.isActive && user.isDeleted) {
            return res.status(401).json({ message: 'Unauthrize or Deteted Account Please Contact Admin person' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json(new ServerResponse(false, null, "password Invalid", null));
        }

        let userData = user.toObject();
        delete userData.password;
        delete userData.__v
        user = userData;

        let token = generateToken({ id: user._id, email: user.email, role: user.role });

        user.token = token;

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development' ? false : true,
            maxAge: 24 * 60 * 60 * 1000 * 24 * 30 // 30 days
        });

        return res.status(200).json(new ServerResponse(true, user, "User login successfully", null));
    } catch (error) {
        return res.status(500).json(new ServerResponse(false, null, error.message, error));
    }
}

export async function getUser(req, res) {
    try {
        let users = await User.findById(req.user.id).select("-password -__v");
        if (!users) {
            return res.status(404).json(new ServerResponse(false, null, "User not found", null));
        }
        return res.status(200).json(new ServerResponse(true, users, "Successfully fetched users", null));
    } catch (error) {
        return res.status(500).json(new ServerResponse(false, null, error.message, error));
    }
}

export async function addUser(req, res) {
    try {
        const { user_name, email, phone, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            user_name,
            email,
            phone,
            password: hashedPassword,
        });

        return res.status(201).json(new ServerResponse(true, user, "User registered successfully", null));
    } catch (error) {
        return res.status(500).json(new ServerResponse(false, null, error.message, error));
    }
}

export async function updateUser(req, res) {
    const { user_name, email, gender, bio, address } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.user.id, { user_name, email, gender, bio, address }, { new: true });

        if (!user) {
            return res.status(404).json(new ServerResponse(false, null, "user Not Found"))
        }

        return res.status(201).json(new ServerResponse(true, user, "Your Details Is Upadated", null))
    } catch (error) {
        return res.status(500).json(new ServerResponse(false, null, error.message, error));
    }
}

export async function deleteUser(req, res) {

    try {
        const user = await User.findOneAndUpdate({ _id: req.user.id, isDeleted: false, isActive: true }, { isDeleted: true, isActive: false });
        if (!user) {
            return res.status(404).json(new ServerResponse(false, null, "Your account Not Found"))
        }

        return res.status(200).json(new ServerResponse(true, user, "Your account is Deleted", null))
    } catch (error) {
        return res.status(500).json(new ServerResponse(false, null, error.message, error));
    }
}

export async function searchUsers(req, res) {
    const { q } = req.query;

    try {

        if (!q || q.trim() === "") {
            return res.status(400).json(new ServerResponse(false, null, "Search query is required", null));
        }

        // Regex for name & email (case-insensitive)
        let regex = new RegExp(q, "i");

        // If number, search phone also
        const phoneQuery = !isNaN(q) ? Number(q) : null;

        const users = await User.find({
            isDeleted: false,
            $or: [
                { user_name: { $regex: regex } },
                { email: { $regex: regex } },
                ...(phoneQuery ? [{ phone: phoneQuery }] : [])
            ]
        })
            .select("user_name email phone avatar bio") // security
            .limit(20);

        return res.status(200).json(new ServerResponse(true, users, { count: users.length }, null));
    } catch (error) {
        return res.status(500).json(new ServerResponse(false, null, error.message, error));
    }
}

