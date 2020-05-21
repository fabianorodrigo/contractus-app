export enum TipoUsoPermissoes {
    HABILITAR_UI, //No primeiro FALSE deve parar as validações para evitar mais processamentos desnecessários
    VALIDAR_UI, //Faz todas as validações sem emitir exceção
    VALIDAR_SERVIDOR, //Lança exceção com statusCode 422 assim que encontra uma inconformidade
}
