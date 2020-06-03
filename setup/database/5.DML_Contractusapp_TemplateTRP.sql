\c contractusapp
-- TEMPLATE TERMO RECIBIMENTO PROVISORIO
update contractusapp."TB_TIPO_ORDEM_SERVICO_CONTRATO"
set "DE_TEMPLATE_TRP" = '<p class="Item_Nivel1">IDENTIFICA&Ccedil;&Atilde;O</p>

<table align="center" border="1" cellpadding="0" cellspacing="0" style="margin-left: auto; margin-right: auto; table-layout: fixed; width: 98%;">
	<tbody>
        <tr>
			<th scope="row" style="width: 20%; border: 1pt solid rgb(0, 0, 0); border-image-source: none; text-align: left; background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda"><b>Contrato n&ordm;:</b></p>
			</th>
			<td style="width: 20%; border: 1pt solid rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Esquerda" style="word-wrap: break-word;">###contrato.numeroContrato###/###contrato.anoContrato###</p>
			</td>
			<th scope="row" style="width: 20%; border: 1pt solid rgb(0, 0, 0); border-image-source: none; text-align: left; background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda"><b>Contratada:</b></p>
			</th>
			<td style="border: 1pt solid rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Esquerda" style="word-wrap: break-word;">###fornecedor.razaoSocial###</p>
			</td>
		</tr>
		<tr>
			<th scope="row" style="width: 20%; border: 1pt solid rgb(0, 0, 0); border-image-source: none; text-align: left; background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda" style="word-wrap: break-word;"><b>N&ordm; da OS / OFB: </b></p>
			</th>
			<td style="width: 20%; border: 1pt solid rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Esquerda">###recebimento.numeroOS###</p>
			</td>
			<th scope="row" style="width: 20%; border: 1pt solid rgb(0, 0, 0); border-image-source: none; text-align: left; background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda"><b>Tipo da OS / OFB:</b></p>
			</th>
			<td style="border: 1pt solid rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Esquerda" style="word-wrap: break-word;">###tipoOrdemServico.descricao###</p>
			</td>
		</tr>
		<tr>
			<th scope="row" style="width: 20%; border: 1pt solid rgb(0, 0, 0); border-image-source: none; text-align: left; background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda" style="word-wrap: break-word;"><b>Projeto:</b></p>
			</th>
			<td colspan="3" style="width: 80%; border: 1pt solid rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Esquerda">###projeto.nome###</p>
			</td>
		</tr>
		<tr>
			<th scope="row" style="width: 20%; border: 1pt solid rgb(0, 0, 0); border-image-source: none; text-align: left; background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda" style="word-wrap: break-word;"><b>&Aacute;rea Requisitante da Solu&ccedil;&atilde;o:</b></p>
			</th>
			<td colspan="3" style="width: 80%; border: 1pt solid rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Esquerda" style="word-wrap: break-word;">###areaRequisitante.nomeArea###</p>
			</td>
		</tr>
		<tr>
			<th scope="row" style="width: 20%; border: 1pt solid rgb(0, 0, 0); border-image-source: none; text-align: left; background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda"><b>Dono do Produto:</b></p>
			</th>
			<td colspan="3" style="width: 80%; border: 1pt solid rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Esquerda" style="word-wrap: break-word;">###os.nomeRequisitante###</p>
			</td>
		</tr>
		<tr>
			<th scope="row" style="width: 20%; border: 1pt solid rgb(0, 0, 0); border-image-source: none; text-align: left; background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda"><b>L&#237;der do Projeto:</b></p>
			</th>
			<td colspan="3" style="width: 80%; border: 1pt solid rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Esquerda" style="word-wrap: break-word;">###os.nomeFiscalTecnico###</p>
			</td>
		</tr>
	</tbody>
</table>

<p class="Texto_Alinhado_Esquerda_Espacamento_Simples">&nbsp;</p>

<p class="Item_Nivel1">TERMOS</p>

<p class="Texto_Justificado">
Por este instrumento, em consonância ao disposto nos artigos 73 a 76, da Lei nº 8.666/93, na Subseção III do Capítulo V da Instrução Normativa SEGES/MPDG nº 05/2017, e no artigo 34, I, da Instrução Normativa MP/SLTI nº 4/2014, atestamos, em caráter provisório, que os serviços (ou bens) relacionados na identificação acima foram recebidos em <b>###recebimento.dtRecebimento###</b> e serão objeto de avaliação quanto aos critérios de qualidade e padrão de desempenho definidos no respectivo Edital, Termo de Referência e/ou Contrato.</p>

<p class="Texto_Justificado">
Ressalvamos que o recebimento definitivo deste objeto ocorrerá em até ###tipoOrdemServico.numeroDiasEmissaoTRD### dias, desde que não haja problemas de ordem técnica ou divergências que impeçam o aceite definitivo dos serviços (ou bens) pela Contratante.</p>

<p class="Texto_Justificado">
Informamos que o recebimento provisório ou definitivo do presente objeto não exclui a responsabilidade civil pela solidez e segurança da obra ou do serviço, nem ético-profissional pela perfeita execução do contrato, dentro dos limites estabelecidos pela lei ou pelo contrato (§ 2º do artigo 73, da Lei nº 8.666/93).
</p>

<p class="Texto_Alinhado_Esquerda_Espacamento_Simples">&nbsp;</p>

<p class="Item_Nivel1">ARTEFATOS ENTREGUES</p>

###recebimento.entregaveis.forEach(
<p class="Item_Nivel2">##descricao##:<br> <a href="##linkEvidencia##" target="_blank">##linkEvidencia##</a></p>)###

<p class="Texto_Justificado">&nbsp;</p>'

