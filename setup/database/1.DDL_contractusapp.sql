--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3 (Debian 11.3-1.pgdg90+1)
-- Dumped by pg_dump version 11.3 (Debian 11.3-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: contractusapp; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA contractusapp;


ALTER SCHEMA contractusapp OWNER TO contractusapp;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: TB_AREA_REQUISITANTE; Type: TABLE; Schema: contractusapp; Owner: postgres
--

CREATE TABLE contractusapp."TB_AREA_REQUISITANTE" (
    "ID_AREA_REQUISITANTE" integer NOT NULL,
    "NM_AREA_REQUISITANTE" text NOT NULL,
    "SG_AREA_REQUISITANTE" text NOT NULL,
    "NR_PROCESSO_ORDENS_SERVICO_SEI" text NOT NULL,
    "NR_BLOCO_ASSINATURAS_SEI" integer
);


ALTER TABLE contractusapp."TB_AREA_REQUISITANTE" OWNER TO contractusapp;

--
-- Name: SQ_TB_AREA_REQUISITANTE_ID_AREA_REQUISITANTE; Type: SEQUENCE; Schema: contractusapp; Owner: postgres
--

CREATE SEQUENCE contractusapp."SQ_TB_AREA_REQUISITANTE_ID_AREA_REQUISITANTE"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractusapp."SQ_TB_AREA_REQUISITANTE_ID_AREA_REQUISITANTE" OWNER TO contractusapp;

--
-- Name: SQ_TB_AREA_REQUISITANTE_ID_AREA_REQUISITANTE; Type: SEQUENCE OWNED BY; Schema: contractusapp; Owner: postgres
--

ALTER SEQUENCE contractusapp."SQ_TB_AREA_REQUISITANTE_ID_AREA_REQUISITANTE" OWNED BY contractusapp."TB_AREA_REQUISITANTE"."ID_AREA_REQUISITANTE";


--
-- Name: TB_CONTRATO; Type: TABLE; Schema: contractusapp; Owner: postgres
--

CREATE TABLE contractusapp."TB_CONTRATO" (
    "ID_CONTRATO" integer NOT NULL,
    "NR_CONTRATO" integer NOT NULL,
    "NR_ANO_CONTRATO" integer NOT NULL,
    "DT_INICIO_VIGENCIA" timestamp with time zone NOT NULL,
    "DT_FIM_VIGENCIA" timestamp with time zone,
    "DT_ASSINATURA" timestamp with time zone,
    "NR_PROCESSO_LICITACAO" text NOT NULL,
    "NR_PROCESSO_PAGAMENTOS" text,
    "NR_TERMO_REFERENCIA_SEI" integer,
    "NR_CONTRATO_SEI" integer,
    "ID_FORNECEDOR" integer NOT NULL
);


ALTER TABLE contractusapp."TB_CONTRATO" OWNER TO contractusapp;

--
-- Name: SQ_TB_CONTRATO_ID_CONTRATO; Type: SEQUENCE; Schema: contractusapp; Owner: postgres
--

CREATE SEQUENCE contractusapp."SQ_TB_CONTRATO_ID_CONTRATO"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractusapp."SQ_TB_CONTRATO_ID_CONTRATO" OWNER TO contractusapp;

--
-- Name: SQ_TB_CONTRATO_ID_CONTRATO; Type: SEQUENCE OWNED BY; Schema: contractusapp; Owner: postgres
--

ALTER SEQUENCE contractusapp."SQ_TB_CONTRATO_ID_CONTRATO" OWNED BY contractusapp."TB_CONTRATO"."ID_CONTRATO";


--
-- Name: TB_ENTREGAVEL_ORDEM_SERVICO; Type: TABLE; Schema: contractusapp; Owner: postgres
--

CREATE TABLE contractusapp."TB_ENTREGAVEL_ORDEM_SERVICO" (
    "ID_ENTREGAVEL_ORDEM_SERVICO" integer NOT NULL,
    "DE_ENTREGAVEL" text NOT NULL,
    "NR_ORDEM" integer,
    "ID_ORDEM_SERVICO" integer
);


ALTER TABLE contractusapp."TB_ENTREGAVEL_ORDEM_SERVICO" OWNER TO contractusapp;

--
-- Name: SQ_TB_ENTREGAVEL_ORDEM_SERVICOO; Type: SEQUENCE; Schema: contractusapp; Owner: postgres
--

CREATE SEQUENCE contractusapp."SQ_TB_ENTREGAVEL_ORDEM_SERVICOO"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractusapp."SQ_TB_ENTREGAVEL_ORDEM_SERVICOO" OWNER TO contractusapp;

--
-- Name: SQ_TB_ENTREGAVEL_ORDEM_SERVICOO; Type: SEQUENCE OWNED BY; Schema: contractusapp; Owner: postgres
--

ALTER SEQUENCE contractusapp."SQ_TB_ENTREGAVEL_ORDEM_SERVICOO" OWNED BY contractusapp."TB_ENTREGAVEL_ORDEM_SERVICO"."ID_ENTREGAVEL_ORDEM_SERVICO";


--
-- Name: TB_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO; Type: TABLE; Schema: contractusapp; Owner: postgres
--

CREATE TABLE contractusapp."TB_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO" (
    "ID_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO" integer NOT NULL,
    "ID_RECEBIMENTO_ORDEM_SERVICO" integer,
    "DE_ENTREGAVEL" text NOT NULL,
    "DE_LINK_EVIDENCIA" text NOT NULL,
    "NR_ORDEM" integer
);


ALTER TABLE contractusapp."TB_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO" OWNER TO contractusapp;

--
-- Name: TB_ENTREGAVEL_ORDEM_SERVICO_seq; Type: SEQUENCE; Schema: contractusapp; Owner: postgres
--

CREATE SEQUENCE contractusapp."SQ_TB_ENTREGAVEL_ORDEM_SERVICO"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractusapp."TB_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO" OWNER TO contractusapp;

--
-- Name: TB_ENTREGAVEL_ORDEM_SERVICO_seq; Type: SEQUENCE OWNED BY; Schema: contractusapp; Owner: postgres
--
ALTER SEQUENCE contractusapp."SQ_TB_ENTREGAVEL_ORDEM_SERVICO" OWNER TO contractusapp;
ALTER SEQUENCE contractusapp."SQ_TB_ENTREGAVEL_ORDEM_SERVICO" OWNED BY contractusapp."TB_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO"."ID_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO";


--
-- Name: TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO; Type: TABLE; Schema: contractusapp; Owner: postgres
--

CREATE TABLE contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO" (
    "ID_ENTREGAVEL_TIPO_ORDEM_SERVICO" integer NOT NULL,
    "ID_TIPO_ORDEM_SERVICO" integer NOT NULL,
    "DE_ENTREGAVEL" text NOT NULL,
    "NR_ORDEM" integer
);


ALTER TABLE contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO" OWNER TO contractusapp;

--
-- Name: TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO_seq; Type: SEQUENCE; Schema: contractusapp; Owner: postgres
--

CREATE SEQUENCE contractusapp."SQ_TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO" OWNER TO contractusapp;

--
-- Name: TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO_seq; Type: SEQUENCE OWNED BY; Schema: contractusapp; Owner: postgres
--

ALTER SEQUENCE contractusapp."SQ_TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO" OWNER TO contractusapp;

ALTER SEQUENCE contractusapp."SQ_TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO" OWNED BY contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"."ID_ENTREGAVEL_TIPO_ORDEM_SERVICO";


--
-- Name: TB_ETAPA_ORDEM_SERVICO; Type: TABLE; Schema: contractusapp; Owner: postgres
--

CREATE TABLE contractusapp."TB_ETAPA_ORDEM_SERVICO" (
    "ID_ETAPA_ORDEM_SERVICO" integer NOT NULL,
    "NM_ETAPA" text NOT NULL,
    "DT_INICIO_PLANEJADA" timestamp with time zone NOT NULL,
    "DT_FIM_PLANEJADA" timestamp with time zone NOT NULL,
    "VL_ADIANTAMENTO_PLANEJADO" numeric(10,2) NULL,
    "DT_INICIO_REAL" timestamp with time zone,
    "DT_FIM_REAL" timestamp with time zone,
    "VL_ADIANTAMENTO_REAL" numeric(10,2) NULL,
    "IN_RESULTADO_ETAPA" text,
    "ID_ORDEM_SERVICO" integer,
    "NR_TERMO_ACEITACAO_SEI" integer
    "DE_LINK_TERMO_ACEITACAO_SEI" text
    "DT_CANCELAMENTO" timestamp with time zone);


ALTER TABLE contractusapp."TB_ETAPA_ORDEM_SERVICO" OWNER TO contractusapp;

--
-- Name: TB_ETAPA_ORDEM_SERVICO_seq; Type: SEQUENCE; Schema: contractusapp; Owner: postgres
--

CREATE SEQUENCE contractusapp."SQ_TB_ETAPA_ORDEM_SERVICO"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractusapp."TB_ETAPA_ORDEM_SERVICO" OWNER TO contractusapp;

--
-- Name: TB_ETAPA_ORDEM_SERVICO_seq; Type: SEQUENCE OWNED BY; Schema: contractusapp; Owner: postgres
--
ALTER SEQUENCE contractusapp."SQ_TB_ETAPA_ORDEM_SERVICO" OWNER TO contractusapp;
ALTER SEQUENCE contractusapp."SQ_TB_ETAPA_ORDEM_SERVICO" OWNED BY contractusapp."TB_ETAPA_ORDEM_SERVICO"."ID_ETAPA_ORDEM_SERVICO";


--
-- Name: TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO; Type: TABLE; Schema: contractusapp; Owner: postgres
--

CREATE TABLE contractusapp."TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO" (
    "ID_ETAPA_TIPO_ORDEM_SERVICO" integer NOT NULL,
    "ID_TIPO_ORDEM_SERVICO" integer NOT NULL,
    "DE_ETAPA" text NOT NULL,
    "NR_DIAS_UTEIS_DURACAO" integer NOT NULL,
    "NR_ORDEM" integer
);


ALTER TABLE contractusapp."TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO" OWNER TO contractusapp;

--
-- Name: TB_ETAPA_TIPO_ORDEM_SERVICO_seq; Type: SEQUENCE; Schema: contractusapp; Owner: postgres
--

CREATE SEQUENCE contractusapp."SQ_TB_ETAPA_TIPO_ORDEM_SERVICO"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractusapp."TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO" OWNER TO contractusapp;

--
-- Name: TB_ETAPA_TIPO_ORDEM_SERVICO_seq; Type: SEQUENCE OWNED BY; Schema: contractusapp; Owner: postgres
--
ALTER SEQUENCE contractusapp."SQ_TB_ETAPA_TIPO_ORDEM_SERVICO" OWNER TO contractusapp;

ALTER SEQUENCE contractusapp."SQ_TB_ETAPA_TIPO_ORDEM_SERVICO" OWNED BY contractusapp."TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO"."ID_ETAPA_TIPO_ORDEM_SERVICO";


--
-- Name: TB_FORNECEDOR; Type: TABLE; Schema: contractusapp; Owner: postgres
--

CREATE TABLE contractusapp."TB_FORNECEDOR" (
    "ID_FORNECEDOR" integer NOT NULL,
    "NR_CNPJ_FORNECEDOR" bigint NOT NULL,
    "NM_RAZAO_SOCIAL" text NOT NULL,
    "NM_APELIDO" text NOT NULL,
    "TX_ENDERECO" text,
    "NM_BAIRRO" text,
    "NM_CIDADE" text,
    "SG_UF" text,
    "TX_EMAIL" text,
    "NR_TELEFONE" text
);


ALTER TABLE contractusapp."TB_FORNECEDOR" OWNER TO contractusapp;

--
-- Name: TB_FORNECEDOR_ID_FORNECEDOR_seq; Type: SEQUENCE; Schema: contractusapp; Owner: postgres
--

CREATE SEQUENCE contractusapp."SQ_TB_FORNECEDOR"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractusapp."TB_FORNECEDOR" OWNER TO contractusapp;

--
-- Name: TB_FORNECEDOR_ID_FORNECEDOR_seq; Type: SEQUENCE OWNED BY; Schema: contractusapp; Owner: postgres
--

ALTER SEQUENCE contractusapp."SQ_TB_FORNECEDOR" OWNER TO contractusapp;
ALTER SEQUENCE contractusapp."SQ_TB_FORNECEDOR" OWNED BY contractusapp."TB_FORNECEDOR"."ID_FORNECEDOR";


--
-- Name: TB_INDICADOR_ORDEM_SERVICO; Type: TABLE; Schema: contractusapp; Owner: postgres
--

CREATE TABLE contractusapp."TB_INDICADOR_ORDEM_SERVICO" (
    "ID_INDICADOR_ORDEM_SERVICO" integer NOT NULL,
    "ID_INDICADOR" integer NOT NULL,
    "VL_INDICADOR_APURADO" integer NOT NULL,
    "VL_GLOSA" integer NOT NULL,
    "ID_ORDEM_SERVICO" integer
);


ALTER TABLE contractusapp."TB_INDICADOR_ORDEM_SERVICO" OWNER TO contractusapp;

--
-- Name: TB_INDICADOR_ORDEM_SERVICO_ID_INDICADOR_ORDEM_SERVICO_seq; Type: SEQUENCE; Schema: contractusapp; Owner: postgres
--

CREATE SEQUENCE contractusapp."SQ_TB_INDICADOR_ORDEM_SERVICO"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractusapp."TB_INDICADOR_ORDEM_SERVICO" OWNER TO contractusapp;

--
-- Name: TB_INDICADOR_ORDEM_SERVICO_ID_INDICADOR_ORDEM_SERVICO_seq; Type: SEQUENCE OWNED BY; Schema: contractusapp; Owner: postgres
--
ALTER SEQUENCE contractusapp."SQ_TB_INDICADOR_ORDEM_SERVICO" OWNER TO contractusapp;
ALTER SEQUENCE contractusapp."SQ_TB_INDICADOR_ORDEM_SERVICO" OWNED BY contractusapp."TB_INDICADOR_ORDEM_SERVICO"."ID_INDICADOR_ORDEM_SERVICO";


--
-- Name: TB_INDICADOR_TIPO_ORDEM_SERVICO; Type: TABLE; Schema: contractusapp; Owner: postgres
--

CREATE TABLE contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO" (
    "ID_INDICADOR" integer NOT NULL,
    "SG_INDICADOR" text NOT NULL,
    "DE_INDICADOR" text NOT NULL,
    "DE_FORMULA_INDICADOR" text,
    "ID_TIPO_ORDEM_SERVICO" integer
);


ALTER TABLE contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO" OWNER TO contractusapp;

--
-- Name: TB_INDICADOR_TIPO_ORDEM_SERVICO_ID_INDICADOR_seq; Type: SEQUENCE; Schema: contractusapp; Owner: postgres
--

CREATE SEQUENCE contractusapp."SQ_TB_INDICADOR_TIPO_ORDEM_SERVICO"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO" OWNER TO contractusapp;

--
-- Name: TB_INDICADOR_TIPO_ORDEM_SERVICO_ID_INDICADOR_seq; Type: SEQUENCE OWNED BY; Schema: contractusapp; Owner: postgres
--
ALTER SEQUENCE contractusapp."SQ_TB_INDICADOR_TIPO_ORDEM_SERVICO" OWNER TO contractusapp;
ALTER SEQUENCE contractusapp."SQ_TB_INDICADOR_TIPO_ORDEM_SERVICO" OWNED BY contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO"."ID_INDICADOR";


--
-- Name: TB_ITEM_ORDEM_SERVICO; Type: TABLE; Schema: contractusapp; Owner: postgres
--

CREATE TABLE contractusapp."TB_ITEM_ORDEM_SERVICO" (
    "ID_ITEM_ORDEM_SERVICO" integer NOT NULL,
    "ID_ORDEM_SERVICO" integer NOT NULL,
    "DE_ITEM" text NOT NULL,
    "ID_PRODUTO" text,
    "SG_METRICA" text NOT NULL,
    "QT_ESTIMADA" numeric(10,2) NOT NULL,
    "VL_UNITARIO_ESTIMADO" numeric(10,2) NOT NULL,
    "QT_REAL" numeric(10,2),
    "VL_UNITARIO_REAL" numeric(10,2),
    "IN_CANCELADO" boolean
);


ALTER TABLE contractusapp."TB_ITEM_ORDEM_SERVICO" OWNER TO contractusapp;

--
-- Name: TB_ITEM_ORDEM_SERVICO_ID_ITEM_ORDEM_SERVICO_seq; Type: SEQUENCE; Schema: contractusapp; Owner: postgres
--

CREATE SEQUENCE contractusapp."SQ_TB_ITEM_ORDEM_SERVICO"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractusapp."TB_ITEM_ORDEM_SERVICO" OWNER TO contractusapp;

--
-- Name: TB_ITEM_ORDEM_SERVICO_ID_ITEM_ORDEM_SERVICO_seq; Type: SEQUENCE OWNED BY; Schema: contractusapp; Owner: postgres
--
ALTER SEQUENCE contractusapp."SQ_TB_ITEM_ORDEM_SERVICO" OWNER TO contractusapp;
ALTER SEQUENCE contractusapp."SQ_TB_ITEM_ORDEM_SERVICO" OWNED BY contractusapp."TB_ITEM_ORDEM_SERVICO"."ID_ITEM_ORDEM_SERVICO";


--
-- Name: TB_METRICA_CONTRATO; Type: TABLE; Schema: contractusapp; Owner: postgres
--

CREATE TABLE contractusapp."TB_METRICA_CONTRATO" (
    "ID_METRICA_CONTRATO" integer NOT NULL,
    "ID_CONTRATO" integer NOT NULL,
    "SG_METRICA" text NOT NULL,
    "DE_METRICA" text NOT NULL,
    "DT_INICIO" timestamp with time zone NOT NULL,
    "DT_FIM" timestamp with time zone,
    "VL_UNITARIO" numeric(10,2) NOT NULL
);


ALTER TABLE contractusapp."TB_METRICA_CONTRATO" OWNER TO contractusapp;

--
-- Name: TB_METRICA_CONTRATO_ID_METRICA_CONTRATO_seq; Type: SEQUENCE; Schema: contractusapp; Owner: postgres
--

CREATE SEQUENCE contractusapp."SQ_TB_METRICA_CONTRATO"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractusapp."TB_METRICA_CONTRATO" OWNER TO contractusapp;

--
-- Name: TB_METRICA_CONTRATO_ID_METRICA_CONTRATO_seq; Type: SEQUENCE OWNED BY; Schema: contractusapp; Owner: postgres
--
ALTER SEQUENCE contractusapp."SQ_TB_METRICA_CONTRATO" OWNER TO contractusapp;
ALTER SEQUENCE contractusapp."SQ_TB_METRICA_CONTRATO" OWNED BY contractusapp."TB_METRICA_CONTRATO"."ID_METRICA_CONTRATO";


--
-- Name: TB_ORDEM_SERVICO; Type: TABLE; Schema: contractusapp; Owner: postgres
--

CREATE TABLE contractusapp."TB_ORDEM_SERVICO" (
    "ID_ORDEM_SERVICO" integer NOT NULL,
    "ID_CONTRATO" integer NOT NULL,
    "NR_ORDEM_SERVICO" integer,
    "IN_EMERGENCIAL" boolean NOT NULL,
    "ID_TIPO_ORDEM_SERVICO" integer NOT NULL,
    "DT_EMISSAO" timestamp with time zone,
    "ID_PROJETO" text,
    "ID_AREA_REQUISITANTE" integer NOT NULL,
    "NR_CPF_REQUISITANTE" text,
    "NM_REQUISITANTE" text NOT NULL,
    "NR_CPF_FISCAL_TECNICO" text,
    "NM_FISCAL_TECNICO" text NOT NULL,
    "NR_ORDEM_SERVICO_SEI" integer,
    "DE_LINK_ORDEM_SERVICO_SEI" text,
    "DT_CANCELAMENTO" timestamp with time zone
);


ALTER TABLE contractusapp."TB_ORDEM_SERVICO" OWNER TO contractusapp;

--
-- Name: SQ_TB_ORDEM_SERVICO_seq; Type: SEQUENCE; Schema: contractusapp; Owner: postgres
--

CREATE SEQUENCE contractusapp."SQ_TB_ORDEM_SERVICO"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractusapp."TB_ORDEM_SERVICO" OWNER TO contractusapp;

--
-- Name: SQ_TB_ORDEM_SERVICO_seq; Type: SEQUENCE OWNED BY; Schema: contractusapp; Owner: postgres
--
ALTER SEQUENCE contractusapp."SQ_TB_ORDEM_SERVICO" OWNER TO contractusapp;
ALTER SEQUENCE contractusapp."SQ_TB_ORDEM_SERVICO" OWNED BY contractusapp."TB_ORDEM_SERVICO"."ID_ORDEM_SERVICO";


--
-- Name: TB_PAPEL; Type: TABLE; Schema: contractusapp; Owner: postgres
--

CREATE TABLE contractusapp."TB_PAPEL" (
    "ID_PAPEL" integer NOT NULL,
    "DE_PAPEL" text NOT NULL
);


ALTER TABLE contractusapp."TB_PAPEL" OWNER TO contractusapp;

--
-- Name: TB_PAPEL_CONTRATO; Type: TABLE; Schema: contractusapp; Owner: postgres
--

CREATE TABLE contractusapp."TB_PAPEL_CONTRATO" (
    "ID_PAPEL_CONTRATO" integer NOT NULL,
    "ID_CONTRATO" integer NOT NULL,
    "ID_PAPEL" integer NOT NULL,
    "DT_INICIO" timestamp with time zone NOT NULL,
    "DT_FIM" timestamp with time zone,
    "NM_DONO_PAPEL" text NOT NULL,
    "NR_CPF_DONO_PAPEL" text,
    "NR_SIAPE_DONO_PAPEL" text
);


ALTER TABLE contractusapp."TB_PAPEL_CONTRATO" OWNER TO contractusapp;

--
-- Name: TB_PAPEL_CONTRATO_seq; Type: SEQUENCE; Schema: contractusapp; Owner: postgres
--

CREATE SEQUENCE contractusapp."SQ_TB_PAPEL_CONTRATO"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractusapp."TB_PAPEL_CONTRATO" OWNER TO contractusapp;

--
-- Name: TB_PAPEL_CONTRATO_seq; Type: SEQUENCE OWNED BY; Schema: contractusapp; Owner: postgres
--
ALTER SEQUENCE contractusapp."SQ_TB_PAPEL_CONTRATO" OWNER TO contractusapp;
ALTER SEQUENCE contractusapp."SQ_TB_PAPEL_CONTRATO" OWNED BY contractusapp."TB_PAPEL_CONTRATO"."ID_PAPEL_CONTRATO";


--
-- Name: TB_PAPEL_ID_PAPEL_seq; Type: SEQUENCE; Schema: contractusapp; Owner: postgres
--

CREATE SEQUENCE contractusapp."SQ_TB_PAPEL"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractusapp."TB_PAPEL" OWNER TO contractusapp;

--
-- Name: TB_PAPEL_ID_PAPEL_seq; Type: SEQUENCE OWNED BY; Schema: contractusapp; Owner: postgres
--
ALTER SEQUENCE contractusapp."SQ_TB_PAPEL" OWNER TO contractusapp;
ALTER SEQUENCE contractusapp."SQ_TB_PAPEL" OWNED BY contractusapp."TB_PAPEL"."ID_PAPEL";

--
-- Name: TB_RECEBIMENTO_ORDEM_SERVICO; Type: TABLE; Schema: contractusapp; Owner: postgres
--

CREATE TABLE contractusapp."TB_RECEBIMENTO_ORDEM_SERVICO" (
    "ID_RECEBIMENTO_ORDEM_SERVICO" integer NOT NULL,
    "ID_ORDEM_SERVICO" integer NOT NULL,
    "IN_TIPO_RECEBIMENTO" text DEFAULT 'P'::text NOT NULL,
    "DT_RECEBIMENTO" timestamp with time zone NOT NULL,
    "NR_TERMO_RECEBIMENTO_SEI" integer,
    "DE_LINK_TERMO_RECEBIMENTO_SEI" text
);


ALTER TABLE contractusapp."TB_RECEBIMENTO_ORDEM_SERVICO" OWNER TO contractusapp;

--
-- Name: TB_RECEBIMENTO_ORDEM_SERVICO_ID_RECEBIMENTO_ORDEM_SERVICO_seq; Type: SEQUENCE; Schema: contractusapp; Owner: postgres
--

CREATE SEQUENCE contractusapp."SQ_TB_RECEBIMENTO_ORDEM_SERVICO_ID_RECEBIMENTO_ORDEM_SERVICO"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractusapp."TB_RECEBIMENTO_ORDEM_SERVICO" OWNER TO contractusapp;

--
-- Name: TB_RECEBIMENTO_ORDEM_SERVICO_ID_RECEBIMENTO_ORDEM_SERVICO_seq; Type: SEQUENCE OWNED BY; Schema: contractusapp; Owner: postgres
--

ALTER SEQUENCE contractusapp."SQ_TB_RECEBIMENTO_ORDEM_SERVICO_ID_RECEBIMENTO_ORDEM_SERVICO" OWNER TO contractusapp;
ALTER SEQUENCE contractusapp."SQ_TB_RECEBIMENTO_ORDEM_SERVICO_ID_RECEBIMENTO_ORDEM_SERVICO" OWNED BY contractusapp."TB_RECEBIMENTO_ORDEM_SERVICO"."ID_RECEBIMENTO_ORDEM_SERVICO";


--
-- Name: TB_SANCAO_INDICADOR_CONTRATO; Type: TABLE; Schema: contractusapp; Owner: postgres
--

CREATE TABLE contractusapp."TB_SANCAO_INDICADOR_CONTRATO" (
    "ID_SANCAO_INDICADOR_CONTRATO" integer NOT NULL,
    "ID_INDICADOR" integer NOT NULL,
    "VL_INDICADOR" integer NOT NULL,
    "VL_PERCENTUAL_GLOSA" integer NOT NULL,
    "ID_TIPO_ORDEM_SERVICO" integer
);


ALTER TABLE contractusapp."TB_SANCAO_INDICADOR_CONTRATO" OWNER TO contractusapp;

--
-- Name: TB_SANCAO_INDICADOR_CONTRATO_ID_SANCAO_INDICADOR_CONTRATO_seq; Type: SEQUENCE; Schema: contractusapp; Owner: postgres
--

CREATE SEQUENCE contractusapp."SQ_TB_SANCAO_INDICADOR_CONTRATO"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractusapp."TB_SANCAO_INDICADOR_CONTRATO" OWNER TO contractusapp;

--
-- Name: SQ_TB_SANCAO_INDICADOR_CONTRATO; Type: SEQUENCE OWNED BY; Schema: contractusapp; Owner: postgres
--
ALTER SEQUENCE contractusapp."SQ_TB_SANCAO_INDICADOR_CONTRATO" OWNER TO contractusapp;
ALTER SEQUENCE contractusapp."SQ_TB_SANCAO_INDICADOR_CONTRATO" OWNED BY contractusapp."TB_SANCAO_INDICADOR_CONTRATO"."ID_SANCAO_INDICADOR_CONTRATO";


--
-- Name: TB_TIPO_ORDEM_SERVICO_CONTRATO; Type: TABLE; Schema: contractusapp; Owner: postgres
--

CREATE TABLE contractusapp."TB_TIPO_ORDEM_SERVICO_CONTRATO" (
    "ID_TIPO_ORDEM_SERVICO" integer NOT NULL,
    "ID_CONTRATO" integer NOT NULL,
    "DE_TIPO_ORDEM_SERVICO" text NOT NULL,
    "IN_TERMO_ACEITACAO_EMITIDO_POR_ETAPA" boolean NOT NULL,
    "DE_TEMPLATE_ORDEM_SERVICO" text,
    "DE_TEMPLATE_TERMO_ACEITACAO" text,
    "DE_TEMPLATE_TRP" text,
    "DE_TEMPLATE_TRD" text,
    "SG_UNIDADE_GARANTIA" text NOT NULL,
    "NR_TEMPO_GARANTIA" integer NOT NULL
);


ALTER TABLE contractusapp."TB_TIPO_ORDEM_SERVICO_CONTRATO" OWNER TO contractusapp;

--
-- Name: TB_TIPO_ORDEM_SERVICO_CONTRATO_seq; Type: SEQUENCE; Schema: contractusapp; Owner: postgres
--

CREATE SEQUENCE contractusapp."SQ_TB_TIPO_ORDEM_SERVICO_CONTRATO"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractusapp."TB_TIPO_ORDEM_SERVICO_CONTRATO" OWNER TO contractusapp;

--
-- Name: TB_TIPO_ORDEM_SERVICO_CONTRATO_seq; Type: SEQUENCE OWNED BY; Schema: contractusapp; Owner: postgres
--
ALTER SEQUENCE contractusapp."SQ_TB_TIPO_ORDEM_SERVICO_CONTRATO" OWNER TO contractusapp;
ALTER SEQUENCE contractusapp."SQ_TB_TIPO_ORDEM_SERVICO_CONTRATO" OWNED BY contractusapp."TB_TIPO_ORDEM_SERVICO_CONTRATO"."ID_TIPO_ORDEM_SERVICO";


--
-- Name: TB_AREA_REQUISITANTE ID_AREA_REQUISITANTE; Type: DEFAULT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_AREA_REQUISITANTE" ALTER COLUMN "ID_AREA_REQUISITANTE" SET DEFAULT nextval('contractusapp."SQ_TB_AREA_REQUISITANTE_ID_AREA_REQUISITANTE"'::regclass);


--
-- Name: TB_CONTRATO ID_CONTRATO; Type: DEFAULT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_CONTRATO" ALTER COLUMN "ID_CONTRATO" SET DEFAULT nextval('contractusapp."SQ_TB_CONTRATO_ID_CONTRATO"'::regclass);


--
-- Name: TB_ENTREGAVEL_ORDEM_SERVICO ID_ENTREGAVEL_ORDEM_SERVICO; Type: DEFAULT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_ENTREGAVEL_ORDEM_SERVICO" ALTER COLUMN "ID_ENTREGAVEL_ORDEM_SERVICO" SET DEFAULT nextval('contractusapp."SQ_TB_ENTREGAVEL_ORDEM_SERVICOO"'::regclass);


--
-- Name: TB_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO ID_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO; Type: DEFAULT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO" ALTER COLUMN "ID_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO" SET DEFAULT nextval('contractusapp."SQ_TB_ENTREGAVEL_ORDEM_SERVICO"'::regclass);


--
-- Name: TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO ID_ENTREGAVEL_TIPO_ORDEM_SERVICO; Type: DEFAULT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO" ALTER COLUMN "ID_ENTREGAVEL_TIPO_ORDEM_SERVICO" SET DEFAULT nextval('contractusapp."SQ_TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"'::regclass);


--
-- Name: TB_ETAPA_ORDEM_SERVICO ID_ETAPA_ORDEM_SERVICO; Type: DEFAULT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_ETAPA_ORDEM_SERVICO" ALTER COLUMN "ID_ETAPA_ORDEM_SERVICO" SET DEFAULT nextval('contractusapp."SQ_TB_ETAPA_ORDEM_SERVICO"'::regclass);


--
-- Name: TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO ID_ETAPA_TIPO_ORDEM_SERVICO; Type: DEFAULT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO" ALTER COLUMN "ID_ETAPA_TIPO_ORDEM_SERVICO" SET DEFAULT nextval('contractusapp."SQ_TB_ETAPA_TIPO_ORDEM_SERVICO"'::regclass);


--
-- Name: TB_FORNECEDOR ID_FORNECEDOR; Type: DEFAULT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_FORNECEDOR" ALTER COLUMN "ID_FORNECEDOR" SET DEFAULT nextval('contractusapp."SQ_TB_FORNECEDOR"'::regclass);


--
-- Name: TB_INDICADOR_ORDEM_SERVICO ID_INDICADOR_ORDEM_SERVICO; Type: DEFAULT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_INDICADOR_ORDEM_SERVICO" ALTER COLUMN "ID_INDICADOR_ORDEM_SERVICO" SET DEFAULT nextval('contractusapp."SQ_TB_INDICADOR_ORDEM_SERVICO"'::regclass);


--
-- Name: TB_INDICADOR_TIPO_ORDEM_SERVICO ID_INDICADOR; Type: DEFAULT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO" ALTER COLUMN "ID_INDICADOR" SET DEFAULT nextval('contractusapp."SQ_TB_INDICADOR_TIPO_ORDEM_SERVICO"'::regclass);


--
-- Name: TB_ITEM_ORDEM_SERVICO ID_ITEM_ORDEM_SERVICO; Type: DEFAULT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_ITEM_ORDEM_SERVICO" ALTER COLUMN "ID_ITEM_ORDEM_SERVICO" SET DEFAULT nextval('contractusapp."SQ_TB_ITEM_ORDEM_SERVICO"'::regclass);


--
-- Name: TB_METRICA_CONTRATO ID_METRICA_CONTRATO; Type: DEFAULT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_METRICA_CONTRATO" ALTER COLUMN "ID_METRICA_CONTRATO" SET DEFAULT nextval('contractusapp."SQ_TB_METRICA_CONTRATO"'::regclass);


--
-- Name: TB_ORDEM_SERVICO ID_ORDEM_SERVICO; Type: DEFAULT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_ORDEM_SERVICO" ALTER COLUMN "ID_ORDEM_SERVICO" SET DEFAULT nextval('contractusapp."SQ_TB_ORDEM_SERVICO"'::regclass);


--
-- Name: TB_PAPEL ID_PAPEL; Type: DEFAULT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_PAPEL" ALTER COLUMN "ID_PAPEL" SET DEFAULT nextval('contractusapp."SQ_TB_PAPEL"'::regclass);


--
-- Name: TB_PAPEL_CONTRATO ID_PAPEL_CONTRATO; Type: DEFAULT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_PAPEL_CONTRATO" ALTER COLUMN "ID_PAPEL_CONTRATO" SET DEFAULT nextval('contractusapp."SQ_TB_PAPEL_CONTRATO"'::regclass);


--
-- Name: TB_RECEBIMENTO_ORDEM_SERVICO ID_RECEBIMENTO_ORDEM_SERVICO; Type: DEFAULT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_RECEBIMENTO_ORDEM_SERVICO" ALTER COLUMN "ID_RECEBIMENTO_ORDEM_SERVICO" SET DEFAULT nextval('contractusapp."SQ_TB_RECEBIMENTO_ORDEM_SERVICO_ID_RECEBIMENTO_ORDEM_SERVICO"'::regclass);


--
-- Name: TB_SANCAO_INDICADOR_CONTRATO ID_SANCAO_INDICADOR_CONTRATO; Type: DEFAULT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_SANCAO_INDICADOR_CONTRATO" ALTER COLUMN "ID_SANCAO_INDICADOR_CONTRATO" SET DEFAULT nextval('contractusapp."SQ_TB_SANCAO_INDICADOR_CONTRATO"'::regclass);


--
-- Name: TB_TIPO_ORDEM_SERVICO_CONTRATO ID_TIPO_ORDEM_SERVICO; Type: DEFAULT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_TIPO_ORDEM_SERVICO_CONTRATO" ALTER COLUMN "ID_TIPO_ORDEM_SERVICO" SET DEFAULT nextval('contractusapp."SQ_TB_TIPO_ORDEM_SERVICO_CONTRATO"'::regclass);


--
-- Data for Name: TB_AREA_REQUISITANTE; Type: TABLE DATA; Schema: contractusapp; Owner: postgres
--

COPY contractusapp."TB_AREA_REQUISITANTE" ("ID_AREA_REQUISITANTE", "NM_AREA_REQUISITANTE", "SG_AREA_REQUISITANTE", "NR_PROCESSO_ORDENS_SERVICO_SEI", "NR_BLOCO_ASSINATURAS_SEI") FROM stdin;
\.


--
-- Data for Name: TB_CONTRATO; Type: TABLE DATA; Schema: contractusapp; Owner: postgres
--

COPY contractusapp."TB_CONTRATO" ("ID_CONTRATO", "NR_CONTRATO", "NR_ANO_CONTRATO", "DT_INICIO_VIGENCIA", "DT_FIM_VIGENCIA", "DT_ASSINATURA", "NR_PROCESSO_LICITACAO", "NR_PROCESSO_PAGAMENTOS", "NR_TERMO_REFERENCIA_SEI", "NR_CONTRATO_SEI", "ID_FORNECEDOR") FROM stdin;
\.


--
-- Data for Name: TB_ENTREGAVEL_ORDEM_SERVICO; Type: TABLE DATA; Schema: contractusapp; Owner: postgres
--

COPY contractusapp."TB_ENTREGAVEL_ORDEM_SERVICO" ("ID_ENTREGAVEL_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM", "ID_ORDEM_SERVICO") FROM stdin;
\.


--
-- Data for Name: TB_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO; Type: TABLE DATA; Schema: contractusapp; Owner: postgres
--

COPY contractusapp."TB_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO" ("ID_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO", "ID_RECEBIMENTO_ORDEM_SERVICO", "DE_ENTREGAVEL", "DE_LINK_EVIDENCIA", "NR_ORDEM") FROM stdin;
\.


--
-- Data for Name: TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO; Type: TABLE DATA; Schema: contractusapp; Owner: postgres
--

COPY contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO" ("ID_ENTREGAVEL_TIPO_ORDEM_SERVICO", "ID_TIPO_ORDEM_SERVICO", "DE_ENTREGAVEL", "NR_ORDEM") FROM stdin;
\.


--
-- Data for Name: TB_ETAPA_ORDEM_SERVICO; Type: TABLE DATA; Schema: contractusapp; Owner: postgres
--

COPY contractusapp."TB_ETAPA_ORDEM_SERVICO" ("ID_ETAPA_ORDEM_SERVICO", "NM_ETAPA", "DT_INICIO_PLANEJADA", "DT_FIM_PLANEJADA", "VL_ADIANTAMENTO_PLANEJADO", "DT_INICIO_REAL", "DT_FIM_REAL", "VL_ADIANTAMENTO_REAL", "IN_RESULTADO_ETAPA", "ID_ORDEM_SERVICO", "DT_CANCELAMENTO") FROM stdin;
\.


--
-- Data for Name: TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO; Type: TABLE DATA; Schema: contractusapp; Owner: postgres
--

COPY contractusapp."TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO" ("ID_ETAPA_TIPO_ORDEM_SERVICO", "ID_TIPO_ORDEM_SERVICO", "DE_ETAPA", "NR_DIAS_UTEIS_DURACAO", "NR_ORDEM") FROM stdin;
\.


--
-- Data for Name: TB_FORNECEDOR; Type: TABLE DATA; Schema: contractusapp; Owner: postgres
--

COPY contractusapp."TB_FORNECEDOR" ("ID_FORNECEDOR", "NR_CNPJ_FORNECEDOR", "NM_RAZAO_SOCIAL", "NM_APELIDO", "TX_ENDERECO", "NM_BAIRRO", "NM_CIDADE", "SG_UF", "TX_EMAIL", "NR_TELEFONE") FROM stdin;
\.


--
-- Data for Name: TB_INDICADOR_ORDEM_SERVICO; Type: TABLE DATA; Schema: contractusapp; Owner: postgres
--

COPY contractusapp."TB_INDICADOR_ORDEM_SERVICO" ("ID_INDICADOR_ORDEM_SERVICO", "ID_INDICADOR", "VL_INDICADOR_APURADO", "VL_GLOSA", "ID_ORDEM_SERVICO") FROM stdin;
\.


--
-- Data for Name: TB_INDICADOR_TIPO_ORDEM_SERVICO; Type: TABLE DATA; Schema: contractusapp; Owner: postgres
--

COPY contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO" ("ID_INDICADOR", "SG_INDICADOR", "DE_INDICADOR", "DE_FORMULA_INDICADOR", "ID_TIPO_ORDEM_SERVICO") FROM stdin;
\.


--
-- Data for Name: TB_ITEM_ORDEM_SERVICO; Type: TABLE DATA; Schema: contractusapp; Owner: postgres
--

COPY contractusapp."TB_ITEM_ORDEM_SERVICO" ("ID_ITEM_ORDEM_SERVICO", "ID_ORDEM_SERVICO", "DE_ITEM", "ID_PRODUTO", "SG_METRICA", "QT_ESTIMADA", "VL_UNITARIO_ESTIMADO", "QT_REAL", "VL_UNITARIO_REAL", "IN_CANCELADO") FROM stdin;
\.


--
-- Data for Name: TB_METRICA_CONTRATO; Type: TABLE DATA; Schema: contractusapp; Owner: postgres
--

COPY contractusapp."TB_METRICA_CONTRATO" ("ID_METRICA_CONTRATO", "ID_CONTRATO", "SG_METRICA", "DE_METRICA", "DT_INICIO", "DT_FIM", "VL_UNITARIO") FROM stdin;
\.


--
-- Data for Name: TB_ORDEM_SERVICO; Type: TABLE DATA; Schema: contractusapp; Owner: postgres
--

COPY contractusapp."TB_ORDEM_SERVICO" ("ID_ORDEM_SERVICO", "ID_CONTRATO", "NR_ORDEM_SERVICO", "IN_EMERGENCIAL", "ID_TIPO_ORDEM_SERVICO", "DT_EMISSAO", "ID_PROJETO", "ID_AREA_REQUISITANTE", "NR_CPF_REQUISITANTE", "NM_REQUISITANTE", "NR_CPF_FISCAL_TECNICO", "NM_FISCAL_TECNICO", "NR_ORDEM_SERVICO_SEI", "DE_LINK_ORDEM_SERVICO_SEI", "DT_CANCELAMENTO") FROM stdin;
\.


--
-- Data for Name: TB_PAPEL; Type: TABLE DATA; Schema: contractusapp; Owner: postgres
--

COPY contractusapp."TB_PAPEL" ("ID_PAPEL", "DE_PAPEL") FROM stdin;
\.


--
-- Data for Name: TB_PAPEL_CONTRATO; Type: TABLE DATA; Schema: contractusapp; Owner: postgres
--

COPY contractusapp."TB_PAPEL_CONTRATO" ("ID_PAPEL_CONTRATO", "ID_CONTRATO", "ID_PAPEL", "DT_INICIO", "DT_FIM", "NM_DONO_PAPEL", "NR_CPF_DONO_PAPEL", "NR_SIAPE_DONO_PAPEL") FROM stdin;
\.


--
-- Data for Name: TB_RECEBIMENTO_ORDEM_SERVICO; Type: TABLE DATA; Schema: contractusapp; Owner: postgres
--

COPY contractusapp."TB_RECEBIMENTO_ORDEM_SERVICO" ("ID_RECEBIMENTO_ORDEM_SERVICO", "ID_ORDEM_SERVICO", "IN_TIPO_RECEBIMENTO", "DT_RECEBIMENTO", "NR_TERMO_RECEBIMENTO_SEI", "DE_LINK_TERMO_RECEBIMENTO_SEI") FROM stdin;
\.


--
-- Data for Name: TB_SANCAO_INDICADOR_CONTRATO; Type: TABLE DATA; Schema: contractusapp; Owner: postgres
--

COPY contractusapp."TB_SANCAO_INDICADOR_CONTRATO" ("ID_SANCAO_INDICADOR_CONTRATO", "ID_INDICADOR", "VL_INDICADOR", "VL_PERCENTUAL_GLOSA", "ID_TIPO_ORDEM_SERVICO") FROM stdin;
\.


--
-- Data for Name: TB_TIPO_ORDEM_SERVICO_CONTRATO; Type: TABLE DATA; Schema: contractusapp; Owner: postgres
--

COPY contractusapp."TB_TIPO_ORDEM_SERVICO_CONTRATO" ("ID_TIPO_ORDEM_SERVICO", "ID_CONTRATO", "DE_TIPO_ORDEM_SERVICO", "IN_TERMO_ACEITACAO_EMITIDO_POR_ETAPA", "DE_TEMPLATE_ORDEM_SERVICO", "DE_TEMPLATE_TERMO_ACEITACAO", "DE_TEMPLATE_TRP", "DE_TEMPLATE_TRD", "SG_UNIDADE_GARANTIA", "NR_TEMPO_GARANTIA") FROM stdin;
\.


--
-- Name: SQ_TB_AREA_REQUISITANTE_ID_AREA_REQUISITANTE; Type: SEQUENCE SET; Schema: contractusapp; Owner: postgres
--

SELECT pg_catalog.setval('contractusapp."SQ_TB_AREA_REQUISITANTE_ID_AREA_REQUISITANTE"', 1, false);


--
-- Name: SQ_TB_CONTRATO_ID_CONTRATO; Type: SEQUENCE SET; Schema: contractusapp; Owner: postgres
--

SELECT pg_catalog.setval('contractusapp."SQ_TB_CONTRATO_ID_CONTRATO"', 1, false);


--
-- Name: SQ_TB_ENTREGAVEL_ORDEM_SERVICOO; Type: SEQUENCE SET; Schema: contractusapp; Owner: postgres
--

SELECT pg_catalog.setval('contractusapp."SQ_TB_ENTREGAVEL_ORDEM_SERVICOO"', 1, false);


--
-- Name: TB_ENTREGAVEL_ORDEM_SERVICO_seq; Type: SEQUENCE SET; Schema: contractusapp; Owner: postgres
--

SELECT pg_catalog.setval('contractusapp."SQ_TB_ENTREGAVEL_ORDEM_SERVICO"', 1, false);


--
-- Name: TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO_seq; Type: SEQUENCE SET; Schema: contractusapp; Owner: postgres
--

SELECT pg_catalog.setval('contractusapp."SQ_TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"', 1, false);


--
-- Name: TB_ETAPA_ORDEM_SERVICO_seq; Type: SEQUENCE SET; Schema: contractusapp; Owner: postgres
--

SELECT pg_catalog.setval('contractusapp."SQ_TB_ETAPA_ORDEM_SERVICO"', 1, false);


--
-- Name: TB_ETAPA_TIPO_ORDEM_SERVICO_seq; Type: SEQUENCE SET; Schema: contractusapp; Owner: postgres
--

SELECT pg_catalog.setval('contractusapp."SQ_TB_ETAPA_TIPO_ORDEM_SERVICO"', 1, false);


--
-- Name: TB_FORNECEDOR_ID_FORNECEDOR_seq; Type: SEQUENCE SET; Schema: contractusapp; Owner: postgres
--

SELECT pg_catalog.setval('contractusapp."SQ_TB_FORNECEDOR"', 1, false);


--
-- Name: TB_INDICADOR_ORDEM_SERVICO_ID_INDICADOR_ORDEM_SERVICO_seq; Type: SEQUENCE SET; Schema: contractusapp; Owner: postgres
--

SELECT pg_catalog.setval('contractusapp."SQ_TB_INDICADOR_ORDEM_SERVICO"', 1, false);


--
-- Name: TB_INDICADOR_TIPO_ORDEM_SERVICO_ID_INDICADOR_seq; Type: SEQUENCE SET; Schema: contractusapp; Owner: postgres
--

SELECT pg_catalog.setval('contractusapp."SQ_TB_INDICADOR_TIPO_ORDEM_SERVICO"', 1, false);


--
-- Name: TB_ITEM_ORDEM_SERVICO_ID_ITEM_ORDEM_SERVICO_seq; Type: SEQUENCE SET; Schema: contractusapp; Owner: postgres
--

SELECT pg_catalog.setval('contractusapp."SQ_TB_ITEM_ORDEM_SERVICO"', 1, false);


--
-- Name: TB_METRICA_CONTRATO_ID_METRICA_CONTRATO_seq; Type: SEQUENCE SET; Schema: contractusapp; Owner: postgres
--

SELECT pg_catalog.setval('contractusapp."SQ_TB_METRICA_CONTRATO"', 1, false);


--
-- Name: SQ_TB_ORDEM_SERVICO_seq; Type: SEQUENCE SET; Schema: contractusapp; Owner: postgres
--

SELECT pg_catalog.setval('contractusapp."SQ_TB_ORDEM_SERVICO"', 1, false);


--
-- Name: TB_PAPEL_CONTRATO_seq; Type: SEQUENCE SET; Schema: contractusapp; Owner: postgres
--

SELECT pg_catalog.setval('contractusapp."SQ_TB_PAPEL_CONTRATO"', 1, false);


--
-- Name: TB_PAPEL_ID_PAPEL_seq; Type: SEQUENCE SET; Schema: contractusapp; Owner: postgres
--

SELECT pg_catalog.setval('contractusapp."SQ_TB_PAPEL"', 1, false);


--
-- Name: TB_RECEBIMENTO_ORDEM_SERVICO_ID_RECEBIMENTO_ORDEM_SERVICO_seq; Type: SEQUENCE SET; Schema: contractusapp; Owner: postgres
--

SELECT pg_catalog.setval('contractusapp."SQ_TB_RECEBIMENTO_ORDEM_SERVICO_ID_RECEBIMENTO_ORDEM_SERVICO"', 1, false);


--
-- Name: TB_SANCAO_INDICADOR_CONTRATO_ID_SANCAO_INDICADOR_CONTRATO_seq; Type: SEQUENCE SET; Schema: contractusapp; Owner: postgres
--

SELECT pg_catalog.setval('contractusapp."SQ_TB_SANCAO_INDICADOR_CONTRATO"', 1, false);


--
-- Name: TB_TIPO_ORDEM_SERVICO_CONTRATO_seq; Type: SEQUENCE SET; Schema: contractusapp; Owner: postgres
--

SELECT pg_catalog.setval('contractusapp."SQ_TB_TIPO_ORDEM_SERVICO_CONTRATO"', 1, false);


--
-- Name: TB_AREA_REQUISITANTE TB_AREA_REQUISITANTE; Type: CONSTRAINT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_AREA_REQUISITANTE"
    ADD CONSTRAINT "PK_TB_AREA_REQUISITANTE" PRIMARY KEY ("ID_AREA_REQUISITANTE");


--
-- Name: TB_CONTRATO TB_CONTRATO; Type: CONSTRAINT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_CONTRATO"
    ADD CONSTRAINT "PK_TB_CONTRATO" PRIMARY KEY ("ID_CONTRATO");


--
-- Name: TB_ENTREGAVEL_ORDEM_SERVICO TB_ENTREGAVEL_ORDEM_SERVICO; Type: CONSTRAINT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_ENTREGAVEL_ORDEM_SERVICO"
    ADD CONSTRAINT "PK_TB_ENTREGAVEL_ORDEM_SERVICO" PRIMARY KEY ("ID_ENTREGAVEL_ORDEM_SERVICO");


--
-- Name: TB_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO TB_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO; Type: CONSTRAINT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO"
    ADD CONSTRAINT "PK_TB_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO" PRIMARY KEY ("ID_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO");


--
-- Name: TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO; Type: CONSTRAINT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO"
    ADD CONSTRAINT "PK_TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO" PRIMARY KEY ("ID_ENTREGAVEL_TIPO_ORDEM_SERVICO");


--
-- Name: TB_ETAPA_ORDEM_SERVICO TB_ETAPA_ORDEM_SERVICO; Type: CONSTRAINT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_ETAPA_ORDEM_SERVICO"
    ADD CONSTRAINT "PK_TB_ETAPA_ORDEM_SERVICO" PRIMARY KEY ("ID_ETAPA_ORDEM_SERVICO");


--
-- Name: TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO; Type: CONSTRAINT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO"
    ADD CONSTRAINT "PK_TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO" PRIMARY KEY ("ID_ETAPA_TIPO_ORDEM_SERVICO");


--
-- Name: TB_FORNECEDOR TB_FORNECEDOR; Type: CONSTRAINT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_FORNECEDOR"
    ADD CONSTRAINT "PK_TB_FORNECEDOR" PRIMARY KEY ("ID_FORNECEDOR");


--
-- Name: TB_INDICADOR_ORDEM_SERVICO TB_INDICADOR_ORDEM_SERVICO; Type: CONSTRAINT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_INDICADOR_ORDEM_SERVICO"
    ADD CONSTRAINT "PK_TB_INDICADOR_ORDEM_SERVICO" PRIMARY KEY ("ID_INDICADOR_ORDEM_SERVICO");


--
-- Name: TB_INDICADOR_TIPO_ORDEM_SERVICO TB_INDICADOR_TIPO_ORDEM_SERVICO; Type: CONSTRAINT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_INDICADOR_TIPO_ORDEM_SERVICO"
    ADD CONSTRAINT "PK_TB_INDICADOR_TIPO_ORDEM_SERVICO" PRIMARY KEY ("ID_INDICADOR");


--
-- Name: TB_ITEM_ORDEM_SERVICO TB_ITEM_ORDEM_SERVICO; Type: CONSTRAINT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_ITEM_ORDEM_SERVICO"
    ADD CONSTRAINT "PK_TB_ITEM_ORDEM_SERVICO" PRIMARY KEY ("ID_ITEM_ORDEM_SERVICO");


--
-- Name: TB_METRICA_CONTRATO TB_METRICA_CONTRATO; Type: CONSTRAINT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_METRICA_CONTRATO"
    ADD CONSTRAINT "PK_TB_METRICA_CONTRATO" PRIMARY KEY ("ID_METRICA_CONTRATO");


--
-- Name: TB_ORDEM_SERVICO TB_ORDEM_SERVICO; Type: CONSTRAINT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_ORDEM_SERVICO"
    ADD CONSTRAINT "PK_TB_ORDEM_SERVICO" PRIMARY KEY ("ID_ORDEM_SERVICO");


--
-- Name: TB_PAPEL_CONTRATO TB_PAPEL_CONTRATO; Type: CONSTRAINT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_PAPEL_CONTRATO"
    ADD CONSTRAINT "PK_TB_PAPEL_CONTRATO" PRIMARY KEY ("ID_PAPEL_CONTRATO");


--
-- Name: TB_PAPEL TB_PAPEL; Type: CONSTRAINT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_PAPEL"
    ADD CONSTRAINT "PK_TB_PAPEL" PRIMARY KEY ("ID_PAPEL");


--
-- Name: TB_RECEBIMENTO_ORDEM_SERVICO TB_RECEBIMENTO_ORDEM_SERVICO; Type: CONSTRAINT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_RECEBIMENTO_ORDEM_SERVICO"
    ADD CONSTRAINT "PK_TB_RECEBIMENTO_ORDEM_SERVICO" PRIMARY KEY ("ID_RECEBIMENTO_ORDEM_SERVICO");


--
-- Name: TB_SANCAO_INDICADOR_CONTRATO TB_SANCAO_INDICADOR_CONTRATO; Type: CONSTRAINT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_SANCAO_INDICADOR_CONTRATO"
    ADD CONSTRAINT "PK_TB_SANCAO_INDICADOR_CONTRATO" PRIMARY KEY ("ID_SANCAO_INDICADOR_CONTRATO");


--
-- Name: TB_TIPO_ORDEM_SERVICO_CONTRATO TB_TIPO_ORDEM_SERVICO_CONTRATO; Type: CONSTRAINT; Schema: contractusapp; Owner: postgres
--

ALTER TABLE ONLY contractusapp."TB_TIPO_ORDEM_SERVICO_CONTRATO"
    ADD CONSTRAINT "PK_TB_TIPO_ORDEM_SERVICO_CONTRATO" PRIMARY KEY ("ID_TIPO_ORDEM_SERVICO");


--
-- PostgreSQL database dump complete
--

