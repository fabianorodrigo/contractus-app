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

export async function post(url: string, data: object, id: number | null) {
    try {
        let response;
        if (id) {
            response = await apiClient.put(url.concat(String(id)), data);
            // O PUT do Loopback não retorna dados, então, se foi bem sucedido vamos retornar o mesmo valor enviado para manter um padrão na resposta
            if (response.status == 204) return data;
        } else {
            response = await apiClient.post(url, data);
        }
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
