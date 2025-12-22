import { Schema, model } from "mongoose";

const attechmentSchema = new Schema({
    url: {
        type: String,
        trim: true
    },
    file_type: {
        type: String,
        trim: true
    },
    file_size: {
        type: Number
    },
    message: {
        type: String,
        trim: true
    }
});

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        required: [true, "sender id is Required"],
        ref: "users"
    },
    chatId: {
        type: Schema.Types.ObjectId,
        ref: "chats",
        required: true,
    },
    message: {
        type: String,
        trim: true,
        minLength: [1, "Blank message"],
    },
    attechment: [attechmentSchema],
    seen: [
        {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
    ],
    delivered: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const messageModel = model("messages", messageSchema);

export default messageModel;