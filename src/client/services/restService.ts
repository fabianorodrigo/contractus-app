import axios, {AxiosInstance} from 'axios';

const apiClient: AxiosInstance = axios.create({
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function get(url: string): Promise<any> {
    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (e) {
        if (e && e.response) {
            return e.response.data;
        }
        throw e;
    }
}

export async function post(url: string, data: object) {
    try {
        const response = await apiClient.post(url, data);
        return response.data;
    } catch (e) {
        if (e && e.response) {
            return e.response.data;
        }
        throw e;
    }
}

export async function put(url: string, data: object) {
    try {
        const response = await apiClient.put(url, data);
        return response.data;
    } catch (e) {
        if (e && e.response) {
            return e.response.data;
        }
        throw e;
    }
}

export async function del(url: string, data: object) {
    try {
        const response = await apiClient.delete(url, data);
        return response.data;
    } catch (e) {
        if (e && e.response) {
            return e.response.data;
        }
        throw e;
    }
}
