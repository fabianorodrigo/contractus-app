import {Campo} from './Campo';

export interface incluirDocumentoRequest {
    SiglaSistema: string;
    IdentificacaoServico: string;
    IdUnidade: string;
    Documento: Documento;
}

export interface incluirDocumentoResponse {
    parametros: RetornoInclusaoDocumento;
}

export interface RetornoInclusaoDocumento {
    IdDocumento: string;
    DocumentoFormatado: string;
    LinkAcesso: string;
}

export interface Documento {
    Tipo: string;
    IdProcedimento?: string;
    ProtocoloProcedimento: string;
    IdSerie: string;
    Numero: string;
    Data?: string;
    Descricao: string;
    IdTipoConferencia?: string;
    Remetente?: Remetente;
    Interessados: Interessado[];
    Destinatarios: Destinatario[];
    Observacao: string;
    NomeArquivo?: string;
    NivelAcesso: string;
    IdHipoteseLegal?: string;
    Conteudo: string;
    ConteudoMTOM?: any;
    IdArquivo?: string;
    Campos: Campo[];
    SinBloqueado: string;
}

export interface Remetente {
    Sigla: string;
    Nome: string;
}

export interface Interessado {
    Sigla: string;
    Nome: string;
}

export interface Destinatario {
    Sigla: string;
    Nome: string;
}
