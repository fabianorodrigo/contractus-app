\c contractusapp

-- ÁREAS
INSERT INTO contractusapp."TB_AREA_REQUISITANTE"(
	"NM_AREA_REQUISITANTE", "SG_AREA_REQUISITANTE", "NR_PROCESSO_ORDENS_SERVICO_SEI", "NR_BLOCO_ASSINATURAS_SEI")
	VALUES ('Superintendência de Registro', 'SRE','01416.022861/2017-86', 4279);
INSERT INTO contractusapp."TB_AREA_REQUISITANTE"(
	"NM_AREA_REQUISITANTE", "SG_AREA_REQUISITANTE", "NR_PROCESSO_ORDENS_SERVICO_SEI", "NR_BLOCO_ASSINATURAS_SEI")
	VALUES ('Superintendência de Fiscalização', 'SFI','01416.022861/2017-86', 4279);
INSERT INTO contractusapp."TB_AREA_REQUISITANTE"(
	"NM_AREA_REQUISITANTE", "SG_AREA_REQUISITANTE", "NR_PROCESSO_ORDENS_SERVICO_SEI", "NR_BLOCO_ASSINATURAS_SEI")
	VALUES ('Superintendência de Fomento', 'SFO','01416.022861/2017-86', 4279);
INSERT INTO contractusapp."TB_AREA_REQUISITANTE"(
	"NM_AREA_REQUISITANTE", "SG_AREA_REQUISITANTE", "NR_PROCESSO_ORDENS_SERVICO_SEI", "NR_BLOCO_ASSINATURAS_SEI")
	VALUES ('Superintendência de Desenvolvimento Econômico','SDE','01416.022861/2017-86', 4279);
INSERT INTO contractusapp."TB_AREA_REQUISITANTE"(
	"NM_AREA_REQUISITANTE", "SG_AREA_REQUISITANTE", "NR_PROCESSO_ORDENS_SERVICO_SEI", "NR_BLOCO_ASSINATURAS_SEI")
	VALUES ('Superintendência de Prestação de Contas' ,'SPR','01416.022861/2017-86', null);
INSERT INTO contractusapp."TB_AREA_REQUISITANTE"(
	"NM_AREA_REQUISITANTE", "SG_AREA_REQUISITANTE", "NR_PROCESSO_ORDENS_SERVICO_SEI", "NR_BLOCO_ASSINATURAS_SEI")
	VALUES ('Secretaria de Gestão Interna' ,'SGI','01416.008023/2019-61', null);

-- FORNECEDOR
INSERT INTO contractusapp."TB_FORNECEDOR"(
	"NR_CNPJ_FORNECEDOR", "NM_RAZAO_SOCIAL", "NM_APELIDO", "TX_ENDERECO", "NM_BAIRRO", "NM_CIDADE", "SG_UF", "TX_EMAIL", "NR_TELEFONE")
	VALUES ('11777162000157', 'BASIS TECNOLOGIA DA INFORMACAO S/A', 'BASIS', 'SCS Quadra 08, Venâncio Shopping Bloco B-50, 8° andar, Salas 824 a 842 (pares)', 'ASA SUL', 'BRASÍLIA', 'DF', 'comercial@basis.com.br', '+55 61 3224-1661');

-- PAPEL
INSERT INTO contractusapp."TB_PAPEL"("DE_PAPEL")
	VALUES ('Fiscal Requisitante');
	INSERT INTO contractusapp."TB_PAPEL"("DE_PAPEL")
	VALUES ('Fiscal Administrativo');
	INSERT INTO contractusapp."TB_PAPEL"("DE_PAPEL")
	VALUES ('Fiscal Técnico');
INSERT INTO contractusapp."TB_PAPEL"("DE_PAPEL")
	VALUES ('Preposto');

-- CONTRATO
INSERT INTO contractusapp."TB_CONTRATO"(
	 "NR_CONTRATO", "NR_ANO_CONTRATO", "DT_INICIO_VIGENCIA", "DT_FIM_VIGENCIA", "DT_ASSINATURA", "NR_PROCESSO_LICITACAO", "NR_PROCESSO_PAGAMENTOS", "NR_TERMO_REFERENCIA_SEI", "NR_CONTRATO_SEI","ID_FORNECEDOR")
	VALUES ( 11, 2019, '06/06/2019', '06/06/2019', '06/06/2019', '01416.000531/2019-00', '01416.011089/2019-39', 1264426, 1332402, 1);

INSERT INTO contractusapp."TB_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_CONTRATO", "DE_TIPO_ORDEM_SERVICO", "IN_TERMO_ACEITACAO_EMITIDO_POR_ETAPA", "DE_TEMPLATE_ORDEM_SERVICO", "DE_TEMPLATE_TERMO_ACEITACAO", "DE_TEMPLATE_TRP", "DE_TEMPLATE_TRD", "SG_UNIDADE_GARANTIA", "NR_TEMPO_GARANTIA", "NR_DIAS_EMISSAO_TRD")
	VALUES ( 1, 'Diagnóstico', false, '', '', '', '', 'M', 12, 15);

	INSERT INTO contractusapp."TB_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_CONTRATO", "DE_TIPO_ORDEM_SERVICO", "IN_TERMO_ACEITACAO_EMITIDO_POR_ETAPA", "DE_TEMPLATE_ORDEM_SERVICO", "DE_TEMPLATE_TERMO_ACEITACAO", "DE_TEMPLATE_TRP", "DE_TEMPLATE_TRD", "SG_UNIDADE_GARANTIA", "NR_TEMPO_GARANTIA", "NR_DIAS_EMISSAO_TRD")
	VALUES ( 1, 'Desenvolvimento', true, '', '', '', '', 'M', 12, 45);
	INSERT INTO contractusapp."TB_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_CONTRATO", "DE_TIPO_ORDEM_SERVICO", "IN_TERMO_ACEITACAO_EMITIDO_POR_ETAPA", "DE_TEMPLATE_ORDEM_SERVICO", "DE_TEMPLATE_TERMO_ACEITACAO", "DE_TEMPLATE_TRP", "DE_TEMPLATE_TRD", "SG_UNIDADE_GARANTIA", "NR_TEMPO_GARANTIA", "NR_DIAS_EMISSAO_TRD")
	VALUES ( 1, 'Manutenção', true, '', '', '', '', 'M', 12, 45);

INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (1, 'Documento de Visão', 1);
	INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (1, 'Documento de Arquitetura', 2);
	INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (1, 'Contagem Estimativa de Pontos de Função', 3);

	INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (2, 'Código-fonte final da release', 1);
	INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (2, 'Dockerfile, Docker Compose, scripts de build, deploy e banco de dados', 2);
	INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (2, 'Testes unitários automatizados e suas evidências', 3);
	INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (2, 'Testes de integração automatizados e suas evidências', 4);
		INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (2, 'Testes de interface automatizados e suas evidências', 5);
			INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (2, 'Smoke tests para as funcionalidades priorizadas pelo Dono do Produto', 6);
			INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (2, 'Modelo de dados', 7);
	INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (2, 'Contagem FInal de Pontos de Função', 8);



		INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (3, 'Código-fonte final da release', 1);
	INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (3, 'Dockerfile, Docker Compose, scripts de build, deploy e banco de dados', 2);
	INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (3, 'Testes unitários automatizados e suas evidências', 3);
	INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (3, 'Testes de integração automatizados e suas evidências', 4);
		INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (3, 'Testes de interface automatizados e suas evidências', 5);
			INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (3, 'Smoke tests para as funcionalidades priorizadas pelo Dono do Produto', 6);
			INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (3, 'Modelo de dados', 7);
	INSERT INTO contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"(
	 "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM")
	VALUES (3, 'Contagem FInal de Pontos de Função', 8);

-- Métricas contrato

INSERT INTO contractusapp."TB_METRICA_CONTRATO"(
	"ID_CONTRATO", "SG_METRICA", "DE_METRICA", "DT_INICIO", "DT_FIM", "VL_UNITARIO")
	VALUES (1, 'PF', 'Pontos de Função', '06/06/2019', '29/02/2020',510.42);
	INSERT INTO contractusapp."TB_METRICA_CONTRATO"(
	"ID_CONTRATO", "SG_METRICA", "DE_METRICA", "DT_INICIO", "DT_FIM", "VL_UNITARIO")
	VALUES (1, 'PF', 'Pontos de Função', '01/03/2020', null,527.28);

-- Etapas dos tipos de ordem de serviço
INSERT INTO contractusapp."TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO"(
	"ID_TIPO_ORDEM_SERVICO", "DE_ETAPA", "NR_DIAS_UTEIS_DURACAO", "NR_ORDEM")
	VALUES (1, 'Única', 10, 1);

	INSERT INTO contractusapp."TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO"(
	"ID_TIPO_ORDEM_SERVICO", "DE_ETAPA", "NR_DIAS_UTEIS_DURACAO", "NR_ORDEM")
	VALUES (2, 'Sprint 0 - Iniciação', 10, 1);
	INSERT INTO contractusapp."TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO"(
	"ID_TIPO_ORDEM_SERVICO", "DE_ETAPA", "NR_DIAS_UTEIS_DURACAO", "NR_ORDEM")
	VALUES (2, 'Sprint 1', 10, 2);
	INSERT INTO contractusapp."TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO"(
	"ID_TIPO_ORDEM_SERVICO", "DE_ETAPA", "NR_DIAS_UTEIS_DURACAO", "NR_ORDEM")
	VALUES (2, 'Sprint 2', 10, 3);
	INSERT INTO contractusapp."TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO"(
	"ID_TIPO_ORDEM_SERVICO", "DE_ETAPA", "NR_DIAS_UTEIS_DURACAO", "NR_ORDEM")
	VALUES (2, 'Sprint 3', 10, 4);
	INSERT INTO contractusapp."TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO"(
	"ID_TIPO_ORDEM_SERVICO", "DE_ETAPA", "NR_DIAS_UTEIS_DURACAO", "NR_ORDEM")
	VALUES (2, 'Sprint 4', 10, 5);
	INSERT INTO contractusapp."TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO"(
	"ID_TIPO_ORDEM_SERVICO", "DE_ETAPA", "NR_DIAS_UTEIS_DURACAO", "NR_ORDEM")
	VALUES (2, 'Sprint 5', 10, 6);


	INSERT INTO contractusapp."TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO"(
	"ID_TIPO_ORDEM_SERVICO", "DE_ETAPA", "NR_DIAS_UTEIS_DURACAO", "NR_ORDEM")
	VALUES (3, 'Sprint 0 - Iniciação', 5, 1);
	INSERT INTO contractusapp."TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO"(
	"ID_TIPO_ORDEM_SERVICO", "DE_ETAPA", "NR_DIAS_UTEIS_DURACAO", "NR_ORDEM")
	VALUES (3, 'Sprint 1', 5, 2);
	INSERT INTO contractusapp."TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO"(
	"ID_TIPO_ORDEM_SERVICO", "DE_ETAPA", "NR_DIAS_UTEIS_DURACAO", "NR_ORDEM")
	VALUES (3, 'Sprint 2', 5, 3);
	INSERT INTO contractusapp."TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO"(
	"ID_TIPO_ORDEM_SERVICO", "DE_ETAPA", "NR_DIAS_UTEIS_DURACAO", "NR_ORDEM")
	VALUES (3, 'Sprint 3', 5, 4);


-- Indicadores dos tipos de ordem de serviço
--1
INSERT INTO contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO"(
	"ID_TIPO_ORDEM_SERVICO","SG_INDICADOR", "DE_INDICADOR", "DE_FORMULA_INDICADOR")
	VALUES (2, 'IPMEPE', 'Indicador de Produtividade Média Executada em Relação à Produtividade Especificada na Ordem de Serviço', '[(PF_Final / NºSprints_Realizadas) / (PF_Estimado / NºSprints_Estimadas)] x 100');
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (1,90,0.05);


--2
INSERT INTO contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO"(
	"ID_TIPO_ORDEM_SERVICO","SG_INDICADOR", "DE_INDICADOR", "DE_FORMULA_INDICADOR")
	VALUES (3, 'IPMEPE', 'Indicador de Produtividade Média Executada em Relação à Produtividade Especificada na Ordem de Serviço', '[(PF_Final / NºSprints_Realizadas) / (PF_Estimado / NºSprints_Estimadas)] x 100');
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (2,90,0.05);

--3
INSERT INTO contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO"(
	"ID_TIPO_ORDEM_SERVICO","SG_INDICADOR", "DE_INDICADOR", "DE_FORMULA_INDICADOR")
	VALUES (1, 'IAT', 'Indicador de Atendimento Tempestivo de Ordem de Serviço', '[Prazo_Realizado / Prazo Máximo] x 100');
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (3,90,0.05);

	--4
INSERT INTO contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO"(
	"ID_TIPO_ORDEM_SERVICO","SG_INDICADOR", "DE_INDICADOR", "DE_FORMULA_INDICADOR")
	VALUES (3, 'IAT', 'Indicador de Atendimento Tempestivo de Ordem de Serviço', '[Prazo_Realizado / Prazo Máximo] x 100');
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (4,90,0.05);

	--5
INSERT INTO contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO"(
	"ID_TIPO_ORDEM_SERVICO","SG_INDICADOR", "DE_INDICADOR", "DE_FORMULA_INDICADOR")
	VALUES (2, 'ICQ', 'Indicador de Qualidade de Código', '100-[∑(Pesos Tabela 3)]/10');
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (5,99,0.01);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (5,98,0.02);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (5,97,0.03);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (5,96,0.04);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (5,95,0.05);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (5,94,0.06);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (5,93,0.07);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (5,92,0.08);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (5,91,0.09);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (5,90,0.10);


--6
INSERT INTO contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO"(
	"ID_TIPO_ORDEM_SERVICO","SG_INDICADOR", "DE_INDICADOR", "DE_FORMULA_INDICADOR")
	VALUES (3, 'ICQ', 'Indicador de Qualidade de Código', '100-[∑(Pesos Tabela 3)]/10');
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (6,99,0.01);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (6,98,0.02);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (6,97,0.03);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (6,96,0.04);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (6,95,0.05);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (6,94,0.06);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (6,93,0.07);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (6,92,0.08);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (6,91,0.09);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (6,90,0.10);


	--7
INSERT INTO contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO"(
	"ID_TIPO_ORDEM_SERVICO","SG_INDICADOR", "DE_INDICADOR", "DE_FORMULA_INDICADOR")
	VALUES (2, 'IQE', 'Indicador de Qualidade das Entregas', '[ (2 × Sprints Rejeitadas + Sprints Aceitas Parcialmente) / Total de Sprints Realizadas ] × 10');


--8
INSERT INTO contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO"(
	"ID_TIPO_ORDEM_SERVICO","SG_INDICADOR", "DE_INDICADOR", "DE_FORMULA_INDICADOR")
	VALUES (3, 'IQE', 'Indicador de Qualidade das Entregas', '[ (2 × Sprints Rejeitadas + Sprints Aceitas Parcialmente) / Total de Sprints Realizadas ] × 10');


--9
INSERT INTO contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO"(
	"ID_TIPO_ORDEM_SERVICO","SG_INDICADOR", "DE_INDICADOR", "DE_FORMULA_INDICADOR")
	VALUES (1, 'IAEPE', 'Indicador de Atraso na Entrega dos Produtos de Encerramento da Ordem de Serviço', 'Número de dias de atraso da data de conclusão planejada para a Ordem de Serviço');
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (9,99,0.01);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (9,98,0.02);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (9,97,0.03);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (9,96,0.04);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (9,95,0.05);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (9,94,0.06);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (9,93,0.07);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (9,92,0.08);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (9,91,0.09);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (9,90,0.10);

--10
INSERT INTO contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO"(
	"ID_TIPO_ORDEM_SERVICO","SG_INDICADOR", "DE_INDICADOR", "DE_FORMULA_INDICADOR")
	VALUES (2, 'IAEPE', 'Indicador de Qualidade das Entregas', '[ (2 × Sprints Rejeitadas + Sprints Aceitas Parcialmente) / Total de Sprints Realizadas ] × 10');
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (10,99,0.01);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (10,98,0.02);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (10,97,0.03);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (10,96,0.04);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (10,95,0.05);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (10,94,0.06);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (10,93,0.07);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (10,92,0.08);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (10,91,0.09);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (10,90,0.10);


-- 11
INSERT INTO contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO"(
	"ID_TIPO_ORDEM_SERVICO","SG_INDICADOR", "DE_INDICADOR", "DE_FORMULA_INDICADOR")
	VALUES (3, 'IAEPE', 'Indicador de Qualidade das Entregas', '[ (2 × Sprints Rejeitadas + Sprints Aceitas Parcialmente) / Total de Sprints Realizadas ] × 10');
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (11,99,0.01);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (11,98,0.02);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (11,97,0.03);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (11,96,0.04);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (11,95,0.05);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (11,94,0.06);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (11,93,0.07);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (11,92,0.08);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (11,91,0.09);
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (11,90,0.10);

--12
INSERT INTO contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO"(
	"ID_TIPO_ORDEM_SERVICO","SG_INDICADOR", "DE_INDICADOR", "DE_FORMULA_INDICADOR")
	VALUES (2, 'IACT', 'Indicador de Atendimento da Cobertura de Testes', '(∑ Cobertura Apurada / ∑ Cobertura Esperada) x 100');
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (12,99,0.05);
	INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (12,89,0.10);

--13
INSERT INTO contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO"(
	"ID_TIPO_ORDEM_SERVICO","SG_INDICADOR", "DE_INDICADOR", "DE_FORMULA_INDICADOR")
	VALUES (3, 'IACT', 'Indicador de Atendimento da Cobertura de Testes', '(∑ Cobertura Apurada / ∑ Cobertura Esperada) x 100');
INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (13,99,0.05);
	INSERT INTO contractusapp."TB_SANCAO_INDICADOR_CONTRATO"(
	"ID_INDICADOR","VL_INDICADOR", "VL_PERCENTUAL_GLOSA")
	VALUES (13,89,0.10);
