import { Configuration, OpenAIApi } from "openai";
import config from "../config";

const configuration = new Configuration({
    organization: config.OPEN_AI_ORGANIZATION,
    apiKey: config.OPEN_AI_SECRET

})
export const openai = new OpenAIApi(configuration);
