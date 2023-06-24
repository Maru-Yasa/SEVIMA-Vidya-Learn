import axios from "./axios"

export const login = async ({email, password}) => {
    try {
        const res = await axios.post('/auth/login', {email, password})
        return res
    } catch (error) {
        return error.response
    }
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