import MessageModel from "../models/message.model.js"

export async function addMessage(req, res) {
    try {
        let messages = await MessageModel.create({
            sender: "",
            receiver: "",
            message: "",
            attechment 
        })
    } catch (error) {

    }
}

export async function getUserMessages(req, res) {
    try {
        let messages = await MessageModel.find({sender : " ", receiver : })
    } catch (error) {
        
    }
}