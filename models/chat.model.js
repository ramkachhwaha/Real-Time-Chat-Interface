import { Schema, model } from "mongoose";

const chatSchema = new Schema(
    {
        // chat participants
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "users",
                required: true,
            },
        ],

        // chat type
        isGroupChat: {
            type: Boolean,
            default: false,
        },

        // group chat name
        groupName: {
            type: String,
            trim: true,
        },

        // group chat name
        groupIcon: {
            type: String,
            trim: true,
        },

        // group admin (only for group)
        groupAdmin: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },

        // last message (for chat list preview)
        lastMessage: {
            type: Schema.Types.ObjectId,
            ref: "messages",
        },

        // unread count per user
        unreadCounts: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: "users",
                },
                count: {
                    type: Number,
                    default: 0,
                },
            },
        ],
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

export default model("chats", chatSchema)