import { Schema, model } from "mongoose";

const userSchema = new Schema({
    user_name: {
        type: String,
        trim: true,
        required: [true, "User Name is Required"],
        minLength: [2, "Invalid name"],
        maxLength: [32, "Invalid name"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email Id Is Required"],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid Email Id!`
        },
        lowercase: true,
        unique: true
    },
    phone: {
        type: Number,
        required: [true, "Phone Number is Required"],
        validate: {
            validator: function (v) {
                return /^(\+91[\-\s]?)?[0]?(91)?[6-9]\d{9}$/.test(v)
            },
            message: props => `${props.value} is Not a Valid Phone Number`
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password Is Required"]
    },
    address: {
        type: String,
        trim: true,
        minLength: [3, "Invalid Address"],
        maxLength: [32, "Invalid Address"]
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    bio: {
        type: String,
        trim: true,
        maxLength: [32, "Invalid Address"],
        default: "Hi There I am using Chat App"
    },
    avatar: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });


const userModel = model("users", userSchema);

export default userModel;