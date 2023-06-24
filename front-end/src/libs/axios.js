import _axios from "axios";
import { config } from "../config";

_axios.defaults.baseURL = config.API_URL

export default _axios