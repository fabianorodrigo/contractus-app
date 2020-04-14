import {OrdemServico} from '../../models';

export type Type_Void = () => void;
export type TypeString_Void = (param: string) => void;
export type TypeBoolean_Void = (param: boolean) => void;
export type TypeOnChangeHTMLInput = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type TypeOnClickHTMLInput = (event: React.MouseEvent<HTMLAnchorElement>) => void;
export type TypeOnClickIconButton = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
export type TypeOrdemServico_Void = (param: OrdemServico) => void;
