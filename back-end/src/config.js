import dotenv from 'dotenv'
dotenv.config()
export default {
    PORT: process.env.PORT || 3000,
    SECRET: process.env.SECRET || "sdkajsldkjalsjd",
    OPEN_AI_SECRET: process.env.OPEN_AI_SECRET,
    OPEN_AI_ORGANIZATION: process.env.OPEN_AI_ORGANIZATION
}