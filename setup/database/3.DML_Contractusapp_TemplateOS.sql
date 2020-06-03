\c contractusapp
-- TEMPLATE OS
update contractusapp."TB_TIPO_ORDEM_SERVICO_CONTRATO"
set "DE_TEMPLATE_ORDEM_SERVICO" = '<p class="Item_Nivel1">IDENTIFICA&Ccedil;&Atilde;O</p>

<table align="center" border="1" cellpadding="0" cellspacing="0" style="margin-left: auto; margin-right: auto; table-layout: fixed; width: 98%;">
	<tbody>
		<tr>
			<th scope="row" style="width: 20%; border: 1pt solid rgb(0, 0, 0); border-image-source: none; text-align: left; background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda" style="word-wrap: break-word;"><b>N&ordm; da OS / OFB: </b></p>
			</th>
			<td style="width: 20%; border: 1pt solid rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Esquerda">###os.numero###</p>
			</td>
			<th scope="row" style="width: 20%; border: 1pt solid rgb(0, 0, 0); border-image-source: none; text-align: left; background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda" style="word-wrap: break-word;"><b>Data de Emiss&atilde;o:</b></p>
			</th>
			<td style="border: 1pt solid rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Esquerda" style="word-wrap: break-word;">###os.dtEmissao###</p>
			</td>
		</tr>
		<tr>
			<th scope="row" style="width: 20%; border: 1pt solid rgb(0, 0, 0); border-image-source: none; text-align: left; background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda" style="word-wrap: break-word;"><b>Emergencial:</b></p>
			</th>
			<td style="width: 20%; border: 1pt solid rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Esquerda">(&nbsp;###os.emergencialSim### ) SIM&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(&nbsp;###os.emergencialNao### ) NÃO</p>
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

<p class="Item_Nivel1">especifica&ccedil;&atilde;o dos produtos / Servi&ccedil;os e volumes</p>

<table border="1" cellpadding="0" cellspacing="0" style="margin-left: auto; margin-right: auto; width: 98%;" width="556">
	<thead>
		<tr>
			<th scope="col" style="width: 33px; height: 19px; border-color: rgb(0, 0, 0); background-color: rgb(204, 204, 204);">
			<p align="center" class="Tabela_Texto_Centralizado"><strong>Id</strong></p>
			</th>
			<th scope="col" style="width: 453px; height: 19px; border-color: rgb(0, 0, 0); background-color: rgb(204, 204, 204);">
			<p align="center" class="Tabela_Texto_Centralizado"><strong>PRODUTO / SERVI&Ccedil;O</strong></p>
			</th>
			<th scope="col" style="width: 98px; height: 19px; border-color: rgb(0, 0, 0); background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Centralizado">M&Eacute;TRICA</p>
			</th>
			<th scope="col" style="width: 113px; height: 19px; border-color: rgb(0, 0, 0); background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Centralizado">QUANTIDADE</p>
			</th>
			<th scope="col" style="width: 114px; height: 19px; border-color: rgb(0, 0, 0); background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Centralizado">PRE&Ccedil;O</p>
			</th>
		</tr>
	</thead>
	<tbody>
        ###os.itens.forEach(
		<tr>
			<td rowspan="1" style="width: 33px; height: 19px; border-color: rgb(0, 0, 0);">
			<p align="center" class="Tabela_Texto_Centralizado">##?seq##</p>
			</td>
			<td rowspan="1" style="width: 453px; height: 19px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Esquerda">##descricao##</p>
			</td>
			<td style="width: 98px; height: 19px; border-color: rgb(0, 0, 0);">
			<p align="center" class="Tabela_Texto_Centralizado">##siglaMetrica##</p>
			</td>
			<td style="width: 113px; height: 19px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Centralizado">##quantidadeEstimada##</p>
			</td>
			<td style="width: 114px; height: 19px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Centralizado">##valorEstimado##</p>
			</td>
		</tr>)###
		<tr>
			<td colspan="2" rowspan="1" style="width: 488px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Direita"><strong>TOTAL:</strong></p>
			</td>
			<td style="width: 98px; height: 19px; border-color: rgb(0, 0, 0);">
			<p align="center" class="Tabela_Texto_Centralizado">###os.totalMetrica###</p>
			</td>
			<td style="width: 113px; height: 19px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Centralizado">###os.totalQuantidadeEstimada###</p>
			</td>
			<td style="width: 114px; height: 19px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Centralizado">###os.totalValorEstimado###</p>
			</td>
		</tr>
	</tbody>
</table>

<p class="Item_Nivel1">INSTRU&Ccedil;&Otilde;ES COMPLEMENTARES</p>

<p class="Item_Nivel2">Digite aqui o texto... .... .</p>

<p class="Item_Nivel2"><span>Digite aqui o texto... .... .</span></p>

<p class="Texto_Alinhado_Esquerda_Espacamento_Simples">&nbsp;</p>

<p class="Item_Nivel1">CRONOGRAMA</p>

<table border="1" cellpadding="0" cellspacing="0" style="margin-left: auto; margin-right: auto; width: 98%;" width="556">
	<thead>
		<tr>
			<th scope="col" style="width: 33px; height: 19px; border-color: rgb(0, 0, 0); background-color: rgb(204, 204, 204);">
			<p align="center" class="Tabela_Texto_Centralizado"><strong>Id</strong></p>
			</th>
			<th scope="col" style="width: 453px; height: 19px; border-color: rgb(0, 0, 0); background-color: rgb(204, 204, 204);">
			<p align="center" class="Tabela_Texto_Centralizado"><strong>ETAPA</strong></p>
			</th>
			<th scope="col" style="width: 98px; height: 19px; border-color: rgb(0, 0, 0); background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Centralizado">IN&Iacute;CIO</p>
			</th>
			<th scope="col" style="width: 113px; height: 19px; border-color: rgb(0, 0, 0); background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Centralizado">FIM</p>
			</th>
		</tr>
	</thead>
	<tbody>
        ###os.etapas.forEach(
		<tr>
			<td rowspan="1" style="width: 33px; height: 19px; border-color: rgb(0, 0, 0);">
			<p align="center" class="Tabela_Texto_Centralizado">##?seq##</p>
			</td>
			<td rowspan="1" style="width: 453px; height: 19px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Alinhado_Esquerda">##descricao##</p>
			</td>
			<td style="width: 98px; height: 19px; border-color: rgb(0, 0, 0);">
			<p align="center" class="Tabela_Texto_Centralizado">##dtInicioPlanejada##</p>
			</td>
			<td style="width: 113px; height: 19px; border-color: rgb(0, 0, 0);">
			<p class="Tabela_Texto_Centralizado">##dtFimPlanejada##</p>
			</td>
		</tr>)###
	</tbody>
</table>

<p class="Texto_Alinhado_Esquerda_Espacamento_Simples">&nbsp;</p>

<p class="Item_Nivel1">ARTEFATOS PREVISTOS</p>

###os.entregaveis.forEach(
    <p class="Item_Nivel2">##descricao##</p>
)###

<p class="Item_Nivel1">DATAS E PRAZOS</p>

<table border="1" cellpadding="0" cellspacing="0" style="margin-left: auto; margin-right: auto; width: 80%;">
	<tbody>
		<tr>
			<th scope="row" style="width: 70%; background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda"><b>Data Prevista para In&iacute;cio dos Produtos/Servi&ccedil;os: </b></p>
			</th>
			<td>
			<p class="Tabela_Texto_Centralizado">###os.dtInicioPlanejada###</p>
			</td>
		</tr>
		<tr>
			<th scope="row" style="width: 70%; background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda"><b>Data Prevista para Entrega dos Produtos/Servi&ccedil;os:</b></p>
			</th>
			<td>
			<p class="Tabela_Texto_Centralizado">###os.dtFimPlanejada###</p>
			</td>
		</tr>
		<tr>
			<th scope="row" style="width: 70%; background-color: rgb(204, 204, 204);">
			<p class="Tabela_Texto_Alinhado_Esquerda"><b>Prazo Total do Contrato (com a garantia):</b></p>
			</th>
			<td>
			<p class="Tabela_Texto_Centralizado">###os.dtFimGarantia###</p>
			</td>
		</tr>
	</tbody>
</table>

<p class="Texto_Justificado">&nbsp;</p>

<p class="Texto_Justificado">O presente documento segue assinado pelo Fiscal Requisitante da Solu&ccedil;&atilde;o, Gestor do Contrato e Preposto&nbsp;da Contratada.</p>'




