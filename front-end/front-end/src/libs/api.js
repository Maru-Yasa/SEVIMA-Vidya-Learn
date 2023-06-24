import axios from "./axios"

export const login = async ({username, password}) => {
    const res = await axios.post('/auth/login', {username, password})
    return res
}

export const register = async ({username, email, password, name}) => {
    const res = await axios.post('/auth/register', {username, email, password, name})
    return res
}

export const validateToken = async (token) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const res = await axios.get('/auth/validate', {
        headers: {
            Authorization: 'Bearer '+token
        }
    });
    return res
}