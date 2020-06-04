\c contractusapp
-- TEMPLATE TERMO RECIBIMENTO DEFINITIVO
update contractusapp."TB_TIPO_ORDEM_SERVICO_CONTRATO"
set "DE_TEMPLATE_TRD" = '<p class="Item_Nivel1">IDENTIFICA&Ccedil;&Atilde;O</p>

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
Por este instrumento, em consonância ao disposto nos artigos 73 a 76, da Lei nº 8.666/93, na Subseção III do Capítulo V da Instrução Normativa SEGES/MPDG nº 05/2017, e no artigo 34, I, da Instrução Normativa MP/SLTI nº 4/2014, atestamos, em <b>caráter definitivo</b>, que os serviços (ou bens) relacionados na identificação acima foram executados e recebidos nesta data. Atestamos, ainda, que eles atendem aos critérios de qualidade e padrão de desempenho definidos no respectivo Edital, Termo de Referência e/ou Contrato.</p>

<p class="Texto_Justificado">
Tais serviços foram mensurados em ###os.totalQuantidadeReal### (###os.totalQuantidadeRealExtenso###) ###os.totalMetrica### (###os.descricaoMetrica###), conforme estabelecido no item 7.2.1 do Termo de Referência nº SEI ###contrato.numeroDocumentoSEITermoReferencia### e mediante planilha de contagem nº SEI ###recebimento.documentoSEI###, equivalente ao valor total de ###os.totalValorReal### (###os.totalValorRealExtenso###), o que corresponde à quantidade de pontos de função multiplicada pelo valor individual de ###os.valorUnitarioMetrica### (###os.valorUnitarioMetricaExtenso###).
</p>

<p class="Texto_Justificado">
Durante a execução da Ordem de Serviço já foi pago o valor de ###os.totalValorAdiantamentoReal### (###os.totalValorAdiantamentoRealExtenso###).
</p>

<p class="Texto_Justificado">
Desconto conforme Indicadores de Nível Mínimo de Serviço (tabela abaixo): <b>###os.totalGlosaINMS###</b> (###os.totalGlosaINMSExtenso###).
</p>

<table border="1" cellpadding="0" cellspacing="0" style="margin-left: auto; margin-right: auto; width: 80%;">
	<thead>
		<tr>
			<th scope="row" style="background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda"><b>Indicador</b></p>
			</th>
			<th scope="row" style="background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda"><b>Resultado Apurado</b></p>
			</th>
			<th scope="row" style="background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda"><b>San&#231;&#227;o</b></p>
			</th>
			<th scope="row" style="background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda"><b>Valor San&#231;&#227;o</b></p>
			</th>
		</tr>
		</thead>
	  </tbody>
		###os.indicadores.forEach(
		<tr>
			<td scope="row">
			<p class="Tabela_Texto_Alinhado_Esquerda">##sigla##</p>
			</th>
			<td>
			<p class="Tabela_Texto_Centralizado">##valorIndicadorApurado##</p>
			</td>
			<td scope="row">
			<p class="Tabela_Texto_Alinhado_Esquerda">##descricaoSancao##</p>
			</th>
			<td>
			<p class="Tabela_Texto_Alinhado_Direita">##valorGlosa##</p>
			</td>
		</tr>)###
	</tbody>
</table>

<p class="Texto_Alinhado_Esquerda_Espacamento_Simples">&nbsp;</p>

<p class="Texto_Justificado">
Portanto, o saldo final a ser pago corresponde a <b>###os.totalSaldoFinal###</b> (###os.totalSaldoFinalExtenso###).
</p>

<p class="Texto_Justificado">
Face ao exposto, concluímos que a Contratada está liberada de todas as obrigações do correspondente ajuste, exceto as salvaguardas legais, normativas e contratuais, estando a mesma autorizada a restituir todas as garantias que por ventura existam.
</p>

<p class="Item_Nivel1">ARTEFATOS COMPROBATÓRIOS</p>

###recebimento.entregaveis.forEach(
<p class="Item_Nivel2">##descricao##:<br> <a href="##linkEvidencia##" target="_blank">##linkEvidencia##</a></p>)###

<p class="Texto_Justificado">&nbsp;</p>'
WHERE "DE_TIPO_ORDEM_SERVICO" not like 'Diagnóstico';

update contractusapp."TB_TIPO_ORDEM_SERVICO_CONTRATO"
set "DE_TEMPLATE_TRD" = '<p class="Item_Nivel1">IDENTIFICA&Ccedil;&Atilde;O</p>

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
Por este instrumento, em consonância ao disposto nos artigos 73 a 76, da Lei nº 8.666/93, na Subseção III do Capítulo V da Instrução Normativa SEGES/MPDG nº 05/2017, e no artigo 34, I, da Instrução Normativa MP/SLTI nº 4/2014, atestamos, em <b>caráter definitivo</b>, que os serviços (ou bens) relacionados na identificação acima foram executados e recebidos nesta data. Atestamos, ainda, que eles atendem aos critérios de qualidade e padrão de desempenho definidos no respectivo Edital, Termo de Referência e/ou Contrato.</p>

<p class="Texto_Justificado">
Tais serviços foram mensurados em ###os.totalQuantidadeReal### (###os.totalQuantidadeRealExtenso###) ###os.totalMetrica### (###os.descricaoMetrica###), conforme estabelecido no item 7.2.1 do Termo de Referência nº SEI ###contrato.numeroDocumentoSEITermoReferencia### e mediante planilha de contagem nº SEI ###recebimento.documentoSEI###, equivalente ao valor total de ###os.totalValorReal### (###os.totalValorRealExtenso###), o que corresponde à quantidade de pontos de função multiplicada pelo valor individual de ###os.valorUnitarioMetrica### (###os.valorUnitarioMetricaExtenso###).
</p>

<p class="Texto_Justificado">
Desconto conforme Indicadores de Nível Mínimo de Serviço (tabela abaixo): <b>###os.totalGlosaINMS###</b> (###os.totalGlosaINMSExtenso###).
</p>

<table border="1" cellpadding="0" cellspacing="0" style="margin-left: auto; margin-right: auto; width: 80%;">
	<thead>
		<tr>
			<th scope="row" style="background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda"><b>Indicador</b></p>
			</th>
			<th scope="row" style="background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda"><b>Resultado Apurado</b></p>
			</th>
			<th scope="row" style="background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda"><b>San&#231;&#227;o</b></p>
			</th>
			<th scope="row" style="background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda"><b>Valor San&#231;&#227;o</b></p>
			</th>
		</tr>
		</thead>
	  </tbody>
		###os.indicadores.forEach(
		<tr>
			<td scope="row">
			<p class="Tabela_Texto_Alinhado_Esquerda">##sigla##</p>
			</th>
			<td>
			<p class="Tabela_Texto_Centralizado">##valorIndicadorApurado##</p>
			</td>
			<td scope="row">
			<p class="Tabela_Texto_Alinhado_Esquerda">##descricaoSancao##</p>
			</th>
			<td>
			<p class="Tabela_Texto_Alinhado_Direita">##valorGlosa##</p>
			</td>
		</tr>)###
	</tbody>
</table>

<p class="Texto_Alinhado_Esquerda_Espacamento_Simples">&nbsp;</p>

<p class="Texto_Justificado">
Portanto, o saldo final a ser pago corresponde a <b>###os.totalSaldoFinal###</b> (###os.totalSaldoFinalExtenso###).
</p>

<p class="Texto_Justificado">
Face ao exposto, concluímos que a Contratada está liberada de todas as obrigações do correspondente ajuste, exceto as salvaguardas legais, normativas e contratuais, estando a mesma autorizada a restituir todas as garantias que por ventura existam.
</p>

<p class="Item_Nivel1">ARTEFATOS COMPROBATÓRIOS</p>

###recebimento.entregaveis.forEach(
<p class="Item_Nivel2">##descricao##:<br> <a href="##linkEvidencia##" target="_blank">##linkEvidencia##</a></p>)###

<p class="Texto_Justificado">&nbsp;</p>'
WHERE "DE_TIPO_ORDEM_SERVICO" like 'Diagnóstico'
