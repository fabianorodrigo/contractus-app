import {Documento} from './IncluirDocumento';

enum TipoDocumento {
    Gerado = 'G',
    Externo = 'R',
}

enum NivelAcesso {
    Publico = '0',
    Restrito = '1',
    Sigiloso = '2',
}

export const TIPO_DOCUMENTO_ORDEM_SERVICO = '222';
export const TIPO_DOCUMENTO_TERMO_ACEITACAO = '555';

export function criarDocumento(
    numeroProcesso: string,
    idTipoDocumento: string,
    numeroDocumento: string,
    descricao: string,
    conteudo: string,
): Documento {
    return {
        Tipo: TipoDocumento.Gerado,
        IdProcedimento: undefined, //dentificador do processo onde o documento deve ser inserido, passar null quando na mesma operação estiver sendo gerado o processo. Opcional se ProtocoloProcedimento informado
        ProtocoloProcedimento: numeroProcesso,
        IdSerie: idTipoDocumento,
        Numero: numeroDocumento,
        Data: undefined, //Data do documento, obrigatório para documentos externos. Passar null para documentos gerados
        Descricao: descricao,
        IdTipoConferencia: undefined, //Identificador do tipo de conferência associada com o documento externo
        Remetente: undefined, //Obrigatório para documentos externos, passar null para documentos gerados
        Interessados: [], //TODO: Incluir CDS, Requisitante e Fornecedor Informar um conjunto com os dados de interessados (ver estrutura Interessado). Se não existirem interessados deve ser informado um conjunto vazio
        Destinatarios: [], //Informar um conjunto com os dados de destinatários (ver estrutura Destinatario). Se não existirem destinatários deve ser informado um conjunto vazio.
        Observacao: `Versão original do documento gerada automaticamente através do sistema contractus-app`,
        NomeArquivo: undefined, //Nome do arquivo, obrigatório para documentos externos. Passar null para documentos gerados.
        NivelAcesso: NivelAcesso.Publico,
        IdHipoteseLegal: undefined,
        Conteudo: conteudo,
        //ConteudoMTOM: undefined, //Conteúdo textual ou binário do documento. Este campo somente poderá ser utilizado para documentos externos. O sistema somente aceitará requisições com um dos atributos preenchidos: Conteudo ou ConteudoMTOM,
        IdArquivo: undefined,
        Campos: [],
        SinBloqueado: 'N',
    };
}
