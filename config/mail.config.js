import {createTransport}  from  "nodemailer";
import { config } from "dotenv";
config();

const transpoter = createTransport({
    service : "gmail",
    auth : {
        user : process.env.GMAIL_ID,
        pass : process.env.GOOGLE_APP_PASSWORD
    }
})

console.log(process.env.GMAIL_ID);


export default transpoter;