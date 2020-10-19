import axios, {AxiosInstance} from 'axios';
import {Credentials} from '../../commonLib/interface-models/';

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

function genTokenHeader(token: string | undefined) {
    if (token) {
        return {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
    }
    return {};
}

export async function login<T>(url: string, credentials: Credentials): Promise<RespostaServico<T>> {
    try {
        let response = await apiClient.post(url, credentials);
        return {sucesso: true, dados: response.data};
    } catch (e) {
        if (e && e.response) {
            return {sucesso: false, dados: e.response.data};
        }
        throw e;
    }
}

export async function get<T>(token: string | undefined, url: string): Promise<RespostaServico<T>> {
    try {
        const response = await apiClient.get(url, genTokenHeader(token));
        return {sucesso: true, dados: response.data};
    } catch (e) {
        if (e && e.response) {
            return {sucesso: false, dados: e.response.data};
        }
        throw e;
    }
}

export async function post<T>(
    token: string | undefined,
    url: string,
    dados: T,
    id: number | undefined,
): Promise<RespostaServico<T>> {
    try {
        let response;
        if (id) {
            response = await apiClient.put(url.concat(String(id)), dados, genTokenHeader(token));
            // O PUT do Loopback não retorna dados, então, se foi bem sucedido vamos retornar o mesmo valor enviado para manter um padrão na resposta
            if (response.status == 204) return {sucesso: true, dados: dados};
        } else {
            response = await apiClient.post(url, dados, genTokenHeader(token));
        }
        return {sucesso: true, dados: response.data};
    } catch (e) {
        if (e && e.response) {
            return {sucesso: false, dados: e.response.data};
        }
        throw e;
    }
}

export async function postAcao<T>(token: string | undefined, url: string, dados: any): Promise<RespostaServico<T>> {
    try {
        let response = await apiClient.post(url, dados, genTokenHeader(token));
        return {sucesso: true, dados: response.data};
    } catch (e) {
        if (e && e.response) {
            return {sucesso: false, dados: e.response.data};
        }
        throw e;
    }
}

export async function del(token: string | undefined, url: string): Promise<RespostaServico<void>> {
    try {
        console.log(token, url);
        const response = await apiClient.delete(url, genTokenHeader(token));
        return {sucesso: true, dados: response.data};
    } catch (e) {
        if (e && e.response) {
            return {sucesso: false, dados: e.response.data};
        }
        throw e;
    }
}
