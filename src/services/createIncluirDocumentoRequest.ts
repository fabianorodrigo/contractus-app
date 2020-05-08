import {Documento} from '.';

export const CDS = '110000072';
export function createIncluirDocumentoRequest(documento: Documento) {
    return {
        SiglaSistema: 'cadastro_documento_contrato',
        IdentificacaoServico: 'cadastro_documento',
        IdUnidade: CDS,
        Documento: documento,
    };
}
