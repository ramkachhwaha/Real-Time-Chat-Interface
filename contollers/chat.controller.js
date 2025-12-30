import MessageModel from "../models/message.model.js"
import chatModel from "../models/chat.model.js";
import ServerResponse from "../response/pattern.js";
import { getIo } from "../websocketServer/socket.js";

// one and one chat option created-
export const accessChat = async (req, res) => {
    const { receiverId } = req.body;
    const myId = req.user.id;
    try {

        if (!receiverId) {
            return res.status(400).json(new ServerResponse(false, null, "receiverId required", null));
        }

        let chat = await chatModel.findOne({
            isGroupChat: false,
            members: { $all: [myId, receiverId], $size: 2 },
        }).populate("members lastMessage");

        if (chat) return res.status(200).json(new ServerResponse(true, chat, "success", null));

        const newChat = await chatModel.create({
            members: [myId, receiverId],
        });

        res.status(201).json(new ServerResponse(true, newChat, "chat created", null));

    } catch (error) {
        res.status(500).json(new ServerResponse(false, null, error.message, error));
    }
};

/**
 * Create Group Chat
 */
export const createGroupChat = async (req, res) => {
    const { members, groupName } = req.body;

    if (!members || members.length < 2) {
        return res.status(400).json(new ServerResponse(false, null, "At least 2 users required", null));
    }

    try {

        const groupChat = await chatModel.create({
            members: [...members, req.user.id],
            isGroupChat: true,
            groupName,
            groupAdmin: req.user.id,
        });

        res.status(201).json(new ServerResponse(true, groupChat, "success", null));

    } catch (error) {
        res.status(500).json(new ServerResponse(false, null, error.message, error));
    }
};

/**
 * Get My Chats
 */
export const getMyChats = async (req, res) => {
    try {
        let chats = await chatModel.find({
            members: req.user.id,
        })
            .populate("members lastMessage")
            .sort({ updatedAt: -1 });

        res.json(new ServerResponse(true, chats, "success", null));
    } catch (error) {
        res.status(500).json(new ServerResponse(false, null, error.message, error));
    }
};


/**
 * Send Message
 */
export const sendMessage = async (req, res) => {
    const { chatId, message } = req.body;

    try {

        const getMessage = await MessageModel.create({
            chatId,
            sender: req.user.id,
            message,
        });

        await chatModel.findByIdAndUpdate(chatId, {
            lastMessage: getMessage._id,
        });

        let io = getIo();

        io.to(chatId).emit("newMessage", getMessage);

        res.status(201).json(new ServerResponse(true, message, "message Sent", null));

    } catch (error) {
        res.status(500).json(new ServerResponse(false, null, error.message, error));
    }
};

/**
 * Get Messages of a Chat
 */
export const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await MessageModel.find({ chatId })
            .populate("sender", "user_name email")
            .populate("chatId")
            .sort({ createdAt: 1 });

        res.json(new ServerResponse(true, messages, "success", null));
    } catch (error) {
        res.status(500).json(new ServerResponse(false, null, error.message, error));
    }
};

