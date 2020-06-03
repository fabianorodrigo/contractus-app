\c contractusapp
-- TEMPLATE TERMO ACEITAÇÃO
update contractusapp."TB_TIPO_ORDEM_SERVICO_CONTRATO"
set "DE_TEMPLATE_TERMO_ACEITACAO" = '<p class="Item_Nivel1">IDENTIFICA&Ccedil;&Atilde;O</p>

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
			<p class="Tabela_Texto_Alinhado_Esquerda">###etapa.numeroOS###</p>
			</td>
			<th scope="row" style="width: 20%; border: 1pt solid rgb(0, 0, 0); border-image-source: none; text-align: left; background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda" style="word-wrap: break-word;"><b>Sprint/Objeto:</b></p>
			</th>
			<td style="border: 1pt solid rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Esquerda" style="word-wrap: break-word;">###etapa.descricao###</p>
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

<p class="Item_Nivel1">TERMOS DE ACEITA&#199;&#195;O</p>

<p class="Texto_Justificado">Por este instrumento, os servidores neste termo identificados atestam, para fins de cumprimento do disposto no art. 34,&nbsp;da Instru&ccedil;&atilde;o Normativa n&ordm; 4/2014 SLTI/MP, que a situa&ccedil;&atilde;o dos produtos planejados para a Sprint acima referenciada &eacute;:&nbsp;<strong>###etapa.idResultadoEtapa###</strong></p>

<p class="Texto_Justificado">Valor planejado:&nbsp;<strong>###etapa.valorAdiantamentoPlanejado###</strong></p>
<p class="Texto_Justificado">Valor a ser pago:&nbsp;<strong>###etapa.valorAdiantamentoReal###</strong></p>

<p>&nbsp;</p>

<table border="1" cellpadding="0" cellspacing="0" style="margin-left: auto; margin-right: auto; width: 98%;" width="556">
	<thead>
		<tr>
			<th scope="col" style="width: 33px; height: 19px; border-color: rgb(0, 0, 0); background-color: rgb(204, 204, 204);">
			<p align="center" class="Tabela_Texto_Centralizado"><strong>Id</strong></p>
			</th>
			<th scope="col" style="width: 453px; height: 19px; border-color: rgb(0, 0, 0); background-color: rgb(204, 204, 204);">
			<p align="center" class="Tabela_Texto_Centralizado"><strong>PRODUTO DA SPRINT</strong></p>
			</th>
			<th scope="col" style="width: 98px; height: 19px; border-color: rgb(0, 0, 0); background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Centralizado">VALOR PLANEJADO <sup>(1)</sup></p>
			</th>
			<th scope="col" style="width: 113px; height: 19px; border-color: rgb(0, 0, 0); background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Centralizado">SITUA&#199;&#195;O <sup>(2)</sup></p>
			</th>
			<th scope="col" style="width: 114px; height: 19px; border-color: rgb(0, 0, 0); background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Centralizado">VALOR ACEITO <sup>(3)</sup></p>
			</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="1" style="width: 33px; height: 19px; border-color: rgb(0, 0, 0);">
			<p align="center" class="Tabela_Texto_Centralizado">1</p>
			</td>
			<td rowspan="1" style="width: 453px; height: 19px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Esquerda"></p>
			</td>
			<td style="width: 98px; height: 19px; border-color: rgb(0, 0, 0);">
			<p align="center" class="Tabela_Texto_Centralizado"></p>
			</td>
			<td style="width: 113px; height: 19px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Centralizado"></p>
			</td>
			<td style="width: 114px; height: 19px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Centralizado"></p>
			</td>
		</tr>
		<tr>
			<td rowspan="1" style="width: 33px; height: 19px; border-color: rgb(0, 0, 0);">
			<p align="center" class="Tabela_Texto_Centralizado">2</p>
			</td>
			<td rowspan="1" style="width: 453px; height: 19px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Esquerda"></p>
			</td>
			<td style="width: 98px; height: 19px; border-color: rgb(0, 0, 0);">
			<p align="center" class="Tabela_Texto_Centralizado"></p>
			</td>
			<td style="width: 113px; height: 19px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Centralizado"></p>
			</td>
			<td style="width: 114px; height: 19px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Centralizado"></p>
			</td>
		</tr>
		<tr>
			<td rowspan="1" style="width: 33px; height: 19px; border-color: rgb(0, 0, 0);">
			<p align="center" class="Tabela_Texto_Centralizado">3</p>
			</td>
			<td rowspan="1" style="width: 453px; height: 19px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Esquerda"></p>
			</td>
			<td style="width: 98px; height: 19px; border-color: rgb(0, 0, 0);">
			<p align="center" class="Tabela_Texto_Centralizado"></p>
			</td>
			<td style="width: 113px; height: 19px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Centralizado"></p>
			</td>
			<td style="width: 114px; height: 19px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Centralizado"></p>
			</td>
		</tr>
		<tr>
			<td colspan="2" rowspan="1" style="width: 488px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Direita"><strong>TOTAL:</strong></p>
			</td>
			<td style="width: 98px; height: 19px; border-color: rgb(0, 0, 0);">
			<p align="center" class="Tabela_Texto_Centralizado">###etapa.valorAdiantamentoPlanejado###</p>
			</td>
			<td style="width: 113px; height: 19px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Centralizado"></p>
			</td>
			<td style="width: 114px; height: 19px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Centralizado">###etapa.valorAdiantamentoReal###</p>
			</td>
		</tr>
	</tbody>
</table>

<p class="Texto_Justificado">
 <sup>(1)</sup>  Valor do produto para a Sprint, sob a ótica do negócio (em pontos de função ou em termos percentuais do total de pontos previstos para pagamento da Sprint).
</p>
<p class="Texto_Justificado">
 <sup>(2)</sup>  Situações possíveis:
    <ul>
	    <li>aceito</li>
	    <li>aceito com restri&ccedil;&atilde;o (especificar)</li>
	    <li>recusado</li>
    </ul>
</p>
<p class="Texto_Justificado">
 <sup>(3)</sup>  Valor do produto aceito (igual ao planejado, se o produto foi aceito sem restrição; zero, se rejeitado; e, a uma parte do planejado, se aceito com restrição).
</p>

<p class="Texto_Justificado">
 De acordo,
</p>'
WHERE "DE_TIPO_ORDEM_SERVICO" not like 'Diagnóstico'


--- #LIG@LIG@tcnbma#

