import axios from "./axios"
import _axios from 'axios'

export const login = async ({email, password}) => {
    try {
        const res = await axios.post('/auth/login', {email, password})
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const register = async (data) => {
    try {        
        const res = await axios.post('/auth/register', data)
        console.log(res);
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const updateUser = async (data) => {
    try {        
        const token = localStorage.getItem('token');
        const res = await axios.post('/auth/updateProfile', data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const refreshToken = async () => {
    try {        
        const token = localStorage.getItem('token');
        console.log('Bearer '+token);
        const res = await axios.get('/auth/refresh', {
            headers: {
                Authorization: 'Bearer '+token
            }
        })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getProvince = async () => {
    try {
        const res = await _axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
        return res.data
    } catch (error) {
        return error        
    }
}

export const getRegencies = async (provinceId) => {
    try {
        const res = await _axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`)
        return res.data
    } catch (error) {
        return error
    }
}

export const getSekolah = async (name) => {
    try {
        const res = await _axios.get(`https://api-sekolah-indonesia.vercel.app/sekolah?npsn=${name}`)
        const data = []
        res.data.dataSekolah.map((d) => {
            data.push({
                'value': d.npsn,
                'label': d.sekolah
            })
        })
        return data
    } catch (error) {
        return []
    }
}

export const getAllPrompt = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/prompt', {
            headers: {
                Authorization: 'Bearer '+token
            }
        })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getPromptById = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/prompt/${id}`, {
            headers: {
                Authorization: 'Bearer '+token
            }
        })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getAnalyticTrend = async (npsn) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/prompt/analytic/trend?npsn=${npsn}`, {
            headers: {
                Authorization: 'Bearer '+token
            }
        })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getAnalyticUses = async (npsn) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/prompt/analytic/uses?npsn=${npsn}`, {
            headers: {
                Authorization: 'Bearer '+token
            }
        })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getSelfAnalyticUses = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/prompt/analytic/selfuses`, {
            headers: {
                Authorization: 'Bearer '+token
            }
        })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const createPrompt = async (data) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.post('/prompt/create', data,{
            headers: {
                Authorization: 'Bearer '+token
            },
        })
        return res.data
    } catch (error) {
        console.log(error);
        return error.response.data
    }
}

export const deletePrompt = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.delete(`/prompt/${id}`,{
            headers: {
                Authorization: 'Bearer '+token
            },
        })
        return res.data
    } catch (error) {
        console.log(error);
        return error.response.data
    }
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
