import axios, {AxiosInstance} from 'axios';

export interface RespostaServico<T> {
    sucesso: boolean;
    dados: T;
}

const apiClient: AxiosInstance = axios.create({
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function get<T>(url: string): Promise<RespostaServico<T>> {
    try {
        const response = await apiClient.get(url);
        return {sucesso: true, dados: response.data};
    } catch (e) {
        if (e && e.response) {
            return {sucesso: false, dados: e.response.data};
        }
        throw e;
    }
}

export async function post<T>(url: string, dados: T, id: number | null): Promise<RespostaServico<T>> {
    try {
        let response;
        if (id) {
            response = await apiClient.put(url.concat(String(id)), dados);
            // O PUT do Loopback não retorna dados, então, se foi bem sucedido vamos retornar o mesmo valor enviado para manter um padrão na resposta
            if (response.status == 204) return {sucesso: true, dados: dados};
        } else {
            response = await apiClient.post(url, dados);
        }
        return {sucesso: true, dados: response.data};
    } catch (e) {
        if (e && e.response) {
            return {sucesso: false, dados: e.response.data};
        }
        throw e;
    }
}

export async function postAcao<T>(url: string, dados: any): Promise<RespostaServico<T>> {
    try {
        let response = await apiClient.post(url, dados);
        return {sucesso: true, dados: response.data};
    } catch (e) {
        if (e && e.response) {
            return {sucesso: false, dados: e.response.data};
        }
        throw e;
    }
}

export async function del(url: string): Promise<RespostaServico<void>> {
    try {
        const response = await apiClient.delete(url);
        return {sucesso: true, dados: response.data};
    } catch (e) {
        if (e && e.response) {
            return {sucesso: false, dados: e.response.data};
        }
        throw e;
    }
}
