import {Campo} from './Campo';

export interface consultarDocumentoRequest {
    SiglaSistema: string;
    IdentificacaoServico: string;
    IdUnidade: string;
    ProtocoloDocumento: string;
    SinRetornarAndamentoGeracao: string;
    SinRetornarAssinaturas: string;
    SinRetornarPublicacao: string;
    SinRetornarCampos: string;
}

export interface consultarDocumentoResponse {
    parametros: RetornoConsultaDocumento;
}

export interface RetornoConsultaDocumento {
    IdProcedimento: string;
    ProcedimentoFormatado: string;
    IdDocumento: string;
    DocumentoFormatado: string;
    LinkAcesso: string;
    Serie: Serie;
    Numero: string;
    Descricao: string;
    Data: string;
    UnidadeElaboradora: Unidade;
    AndamentoGeracao: Andamento;
    Assinaturas: Assinatura[];
    Publicacao: Publicacao;
    Campos: Campo[];
}

export interface Assinatura {
    Nome: string;
    CargoFuncao: string;
    DataHora: string;
    IdUsuario: string;
    IdOrigem: string;
    IdOrgao: string;
    Sigla: string;
}

export interface Publicacao {
    NomeVeiculo: string;
    Numero: string;
    DataDisponibilizacao: string;
    DataPublicacao: string;
    Estado: string;
    ImprensaNacional: PublicacaoImprensaNacional;
}

export interface PublicacaoImprensaNacional {
    SiglaVeiculo: string;
    DescricaoVeiculo: string;
    Pagina: string;
    Secao: string;
    Data: string;
}

export interface Serie {
    IdSerie: string;
    Nome: string;
    Aplicabilidade: string;
}

export interface Unidade {
    IdUnidade: string;
    Sigla: string;
    Descricao: string;
    SinProtocolo: string;
    SinArquivamento: string;
    SinOuvidoria: string;
}

export interface Andamento {
    IdAndamento: string;
    IdTarefa: string;
    IdTarefaModulo: string;
    Descricao: string;
    DataHora: string;
    Unidade: Unidade;
    Usuario: Usuario;
    Atributos: AtributoAndamento[];
}

export interface AtributoAndamento {
    Nome: string;
    Valor: string;
    IdOrigem: string;
}

export interface Usuario {
    IdUsuario: string;
    Sigla: string;
    Nome: string;
}
