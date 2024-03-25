import { dataToPdf } from "../component/pdf/gerarPDF";
import {getData} from "../request/get-data";   
export let catalogos_servicos = [
    {
    "descricao": "ANA - Agência Nacional de Águas e Saneamento Básico",
    "url": "https://www.snirh.gov.br/arcgis/services/INDE/Camadas/MapServer/WMSServer",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": false,
    "wcsAvailable": false,
    "wmsGetCapabilities": "https://www.snirh.gov.br/arcgis/services/INDE/Camadas/MapServer/WMSServer?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": null,
    "wcsGetCapabilities": null
    },
    {
    "descricao": "ANATEL - Agência Nacional de Telecomunicações ",
    "url": "http://sistemas.anatel.gov.br:80/geoserver/ANATEL/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "http://sistemas.anatel.gov.br:80/geoserver/ANATEL/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "http://sistemas.anatel.gov.br:80/geoserver/ANATEL/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "http://sistemas.anatel.gov.br:80/geoserver/ANATEL/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "ANM - Agência Nacional de Mineração",
    "url": "https://geoservicos.inde.gov.br/geoserver/ANM/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": false,
    "wcsAvailable": false,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/ANM/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": null,
    "wcsGetCapabilities": null
    },
    {
    "descricao": "ANP - Agência Nacional do Petróleo, Gás Natural e Biocombustíveis",
    "url": "https://gishub.anp.gov.br/geoserver/ows",
    "nivel_no": "Governo local",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://gishub.anp.gov.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://gishub.anp.gov.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://gishub.anp.gov.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "BNDES - Banco Nacional de Desenvolvimento Econômico e Social ",
    "url": "https://geoservicos.inde.gov.br/geoserver/BNDES/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/BNDES/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/BNDES/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/BNDES/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "CENSIPAM - Centro Gestor e Operacional do Sistema de Proteção da Amazônia",
    "url": "http://panorama.sipam.gov.br/geoserver/publico/ows/",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "http://panorama.sipam.gov.br/geoserver/publico/ows/?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "http://panorama.sipam.gov.br/geoserver/publico/ows/?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "http://panorama.sipam.gov.br/geoserver/publico/ows/?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "CMR/Funai - Centro de Monitoramento Remoto ",
    "url": "https://cmr.funai.gov.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://cmr.funai.gov.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://cmr.funai.gov.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://cmr.funai.gov.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "CPRM -  Serviço Geológico do Brasil",
    "url": "https://geoservicos.sgb.gov.br/geoserver/geologia/ows/",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": false,
    "wmsGetCapabilities": "https://geoservicos.sgb.gov.br/geoserver/geologia/ows/?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.sgb.gov.br/geoserver/geologia/ows/?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": null
    },
    {
    "descricao": "DNIT - Departamento Nacional de Infraestrutura de Transportes",
    "url": "https://geoservicos.inde.gov.br/geoserver/DNIT/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/DNIT/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/DNIT/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/DNIT/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EB/DSG - Diretoria de Serviço Geográfico do  Exército Brasileiro ",
    "url": "https://bdgex.eb.mil.br/mapcache3857",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": false,
    "wcsAvailable": false,
    "wmsGetCapabilities": "https://bdgex.eb.mil.br/mapcache3857?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": null,
    "wcsGetCapabilities": null
    },
    {
    "descricao": "EMBRAPA - Empresa Brasileira de Pesquisa Agropecuária ",
    "url": "https://atlas.geoinfo.cnpm.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://atlas.geoinfo.cnpm.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://atlas.geoinfo.cnpm.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://atlas.geoinfo.cnpm.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Acre - Empresa Brasileira de Pesquisa Agropecuária",
    "url": "https://geoinfo.cpafac.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoinfo.cpafac.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoinfo.cpafac.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoinfo.cpafac.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Agricultura Digital - Empresa Brasileira de Pesquisa Agropecuária ",
    "url": "https://geoinfo.cnptia.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoinfo.cnptia.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoinfo.cnptia.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoinfo.cnptia.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Agrossilvipastoril - Empresa Brasileira de Pesquisa Agropecuária",
    "url": "https://geoinfo.cpamt.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoinfo.cpamt.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoinfo.cpamt.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoinfo.cpamt.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Algodão - Empresa Brasileira de Pesquisa Agropecuária ",
    "url": "https://geoinfo.cnpa.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoinfo.cnpa.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoinfo.cnpa.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoinfo.cnpa.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Amazônia Oriental - Empresa Brasileira de Pesquisa Agropecuária",
    "url": "https://geoinfo.cpatu.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoinfo.cpatu.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoinfo.cpatu.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoinfo.cpatu.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Clima Temperado - Empresa Brasileira de Pesquisa Agropecuária ",
    "url": "https://geoinfo.cpact.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoinfo.cpact.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoinfo.cpact.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoinfo.cpact.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Florestas - Empresa Brasileira de Pesquisa Agropecuária ",
    "url": "https://geoinfo.cnpf.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoinfo.cnpf.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoinfo.cnpf.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoinfo.cnpf.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Gado de Leite - Empresa Brasileira de Pesquisa Agropecuária ",
    "url": "https://geoinfo.cnpgl.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoinfo.cnpgl.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoinfo.cnpgl.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoinfo.cnpgl.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Meio Ambiente - Empresa Brasileira de Pesquisa Agropecuária ",
    "url": "https://geoinfo.cnpma.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoinfo.cnpma.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoinfo.cnpma.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoinfo.cnpma.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Milho e Sorgo – Empresa Brasileira de Pesquisa Agropecuária",
    "url": "https://geoinfo.cnpms.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoinfo.cnpms.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoinfo.cnpms.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoinfo.cnpms.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Pantanal  - Empresa Brasileira de Pesquisa Agropecuária ",
    "url": "https://geoinfo.cpap.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoinfo.cpap.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoinfo.cpap.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoinfo.cpap.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Pecuária Sudeste  - Empresa Brasileira de Pesquisa Agropecuária ",
    "url": "https://geoinfo.cppse.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoinfo.cppse.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoinfo.cppse.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoinfo.cppse.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Pecuária Sul – Empresa Brasileira de Pesquisa Agropecuária",
    "url": "https://geoinfo.cppsul.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoinfo.cppsul.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoinfo.cppsul.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoinfo.cppsul.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Pesca e Aquicultura - Empresa Brasileira de Pesquisa Agropecuária",
    "url": "https://geoinfo.cnpasa.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoinfo.cnpasa.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoinfo.cnpasa.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoinfo.cnpasa.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Roraima - Empresa Brasileira de Pesquisa Agropecuária ",
    "url": "https://geoinfo.cpafrr.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoinfo.cpafrr.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoinfo.cpafrr.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoinfo.cpafrr.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Solos - Empresa Brasileira de Pesquisa Agropecuária ",
    "url": "http://geoinfo.cnps.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "http://geoinfo.cnps.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "http://geoinfo.cnps.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "http://geoinfo.cnps.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Suínos e Aves - Empresa Brasileira de Pesquisa Agropecuária ",
    "url": "https://geoinfo.cnpsa.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoinfo.cnpsa.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoinfo.cnpsa.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoinfo.cnpsa.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Territorial  - Empresa Brasileira de Pesquisa Agropecuária ",
    "url": "https://geoinfo.cnpm.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoinfo.cnpm.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoinfo.cnpm.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoinfo.cnpm.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EMBRAPA Uva e Vinho - Empresa Brasileira de Pesquisa Agropecuária ",
    "url": "https://geoinfo.cnpuv.embrapa.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoinfo.cnpuv.embrapa.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoinfo.cnpuv.embrapa.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoinfo.cnpuv.embrapa.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "EPE - Empresa de Pesquisa Energética",
    "url": "https://geoservicos.inde.gov.br/geoserver/EPE/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/EPE/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/EPE/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/EPE/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "IBAMA - Instituto Brasileiro do Meio Ambiente e dos Recursos Naturais Renováveis ",
    "url": "https://siscom.ibama.gov.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://siscom.ibama.gov.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://siscom.ibama.gov.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://siscom.ibama.gov.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "IBGE - Instituto Brasileiro de Geografia e Estatística ",
    "url": "https://geoservicos.ibge.gov.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "ICA - Instituto de Cartografia Aeronáutica ",
    "url": "https://geoaisweb.decea.gov.br/geoserver/ICA/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoaisweb.decea.gov.br/geoserver/ICA/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoaisweb.decea.gov.br/geoserver/ICA/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoaisweb.decea.gov.br/geoserver/ICA/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "ICMBIO - Instituto Chico Mendes de Conservação da Biodiversidade",
    "url": "https://geoservicos.inde.gov.br/geoserver/ICMBio/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/ICMBio/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/ICMBio/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/ICMBio/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "INPE - Instituto Nacional de Pesquisas Espaciais ",
    "url": "http://terrabrasilis.dpi.inpe.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "http://terrabrasilis.dpi.inpe.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "http://terrabrasilis.dpi.inpe.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "http://terrabrasilis.dpi.inpe.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "IPHAN - Instituto do Patrimônio Histórico e Artístico Nacional ",
    "url": "http://portal.iphan.gov.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "http://portal.iphan.gov.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "http://portal.iphan.gov.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "http://portal.iphan.gov.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "MAPA - Ministério da Agricultura, Pecuária e Abastecimento",
    "url": "https://geoservicos.inde.gov.br/geoserver/MAPA/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/MAPA/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/MAPA/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/MAPA/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "MB/COMPAAZ - Comando de Operações Marítimas e Proteção da Amazônia Azul ",
    "url": "https://geoservicos.inde.gov.br/geoserver/COMPAAz/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/COMPAAz/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/COMPAAz/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/COMPAAz/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "MB/DHN - Diretoria de Hidrografia e Navegação",
    "url": "https://idem.dhn.mar.mil.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": false,
    "wmsGetCapabilities": "https://idem.dhn.mar.mil.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://idem.dhn.mar.mil.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": null
    },
    {
    "descricao": "MB/DPC- Diretoria de Portos e Costas",
    "url": "https://geoservicos.inde.gov.br/geoserver/DPC/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/DPC/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/DPC/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/DPC/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "MB/DPHDM - Diretoria do Patrimônio Histórico e Documentação da Marinha",
    "url": "https://geoservicos.inde.gov.br/geoserver/DPHDM/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/DPHDM/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/DPHDM/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/DPHDM/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "MB/PEM - Planejamento Espacial Marinho",
    "url": "https://geoservicos.inde.gov.br/geoserver/PEM/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": false,
    "wcsAvailable": false,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/PEM/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": null,
    "wcsGetCapabilities": null
    },
    {
    "descricao": "MDIC - Ministério do Desenvolvimento da Indústria e do Comércio ",
    "url": "https://geoservicos.inde.gov.br/geoserver/MDIC/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/MDIC/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/MDIC/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/MDIC/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "MDR/SEDEC - Secretaria Nacional de Proteção e Defesa Civil ",
    "url": "http://geoserver.mdr.gov.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "http://geoserver.mdr.gov.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "http://geoserver.mdr.gov.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "http://geoserver.mdr.gov.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "MINFRA - Ministério da Infraestrutura",
    "url": "https://geoservicos.inde.gov.br/geoserver/MInfra/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/MInfra/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/MInfra/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/MInfra/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "MP - Ministério de Planejamento, Desenvolvimento e Gestão ",
    "url": "https://geoservicos.inde.gov.br/geoserver/MPOG/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/MPOG/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/MPOG/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/MPOG/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "MTUR - Ministério do Turismo",
    "url": "https://geoservicos.inde.gov.br/geoserver/MTU/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/MTU/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/MTU/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/MTU/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "IBGE/ODS - Objetivos de Desenvolvimento Sustentável ",
    "url": "https://geoservicos.ibge.gov.br/geoserver/ODS/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/ODS/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/ODS/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/ODS/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "PGGM - Programa de Geologia e Geofísica Marinha",
    "url": "https://geoservicos.inde.gov.br/geoserver/PGGM/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/PGGM/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/PGGM/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/PGGM/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "SFB - Serviço Florestal do Brasil ",
    "url": "http://sistemas.florestal.gov.br/geoserver/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "http://sistemas.florestal.gov.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "http://sistemas.florestal.gov.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "http://sistemas.florestal.gov.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "SPM - Secretaria Nacional de Políticas para as Mulheres ",
    "url": "https://geoservicos.inde.gov.br/geoserver/SPM/ows",
    "nivel_no": "Nacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/SPM/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/SPM/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/SPM/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "IEDE/FJP (MG) - Infraestrutura Estadual de Dados Espaciais -  Fundação João Pinheiro",
    "url": "https://geoserver.fjp.mg.gov.br/ows",
    "nivel_no": "Universidade/Academia",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoserver.fjp.mg.gov.br/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoserver.fjp.mg.gov.br/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoserver.fjp.mg.gov.br/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "IDE (DF) - Infraestrutura de Dados Espaciais do Distrito Federal",
    "url": "https://www.geoservicos.ide.df.gov.br/arcgis/services/Publico/IDEDF/MapServer/WmsServer",
    "nivel_no": "Subnacional",
    "wmsAvailable": true,
    "wfsAvailable": false,
    "wcsAvailable": false,
    "wmsGetCapabilities": "https://www.geoservicos.ide.df.gov.br/arcgis/services/Publico/IDEDF/MapServer/WmsServer?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": null,
    "wcsGetCapabilities": null
    },
    {
    "descricao": "IDE-GEOBASES  (ES) - Sistema Integrado de Bases Geoespaciais do Estado do Espírito Santo ",
    "url": "https://ide.geobases.es.gov.br/geoserver/ows",
    "nivel_no": "Subnacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://ide.geobases.es.gov.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://ide.geobases.es.gov.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://ide.geobases.es.gov.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "IDE/Sisema (MG) - IDE - Sistema Estadual de Meio Ambiente e Recursos Hídricos",
    "url": "https://geoserver.meioambiente.mg.gov.br/ows/",
    "nivel_no": "Subnacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoserver.meioambiente.mg.gov.br/ows/?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoserver.meioambiente.mg.gov.br/ows/?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoserver.meioambiente.mg.gov.br/ows/?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "IDEA (SP) - Infraestrutura de Dados Espaciais Ambientais do Estado de São Paulo ",
    "url": "http://datageo.ambiente.sp.gov.br/geoserver/ows",
    "nivel_no": "Subnacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "http://datageo.ambiente.sp.gov.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "http://datageo.ambiente.sp.gov.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "http://datageo.ambiente.sp.gov.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "IDE (SP) - Infraestrutura de Dados Espaciais de São Paulo ",
    "url": "http://ide.emplasa.sp.gov.br/geoserver/ows",
    "nivel_no": "Subnacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "http://ide.emplasa.sp.gov.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "http://ide.emplasa.sp.gov.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "http://ide.emplasa.sp.gov.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "IEDE (RS) - Infraestrutura Estadual de Dados Espaciais do Rio Grande do Sul",
    "url": "https://iede.rs.gov.br/server/services/INDE/IEDE_RS/MapServer/WMSServer",
    "nivel_no": "Subnacional",
    "wmsAvailable": true,
    "wfsAvailable": false,
    "wcsAvailable": false,
    "wmsGetCapabilities": "https://iede.rs.gov.br/server/services/INDE/IEDE_RS/MapServer/WMSServer?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": null,
    "wcsGetCapabilities": null
    },
    {
    "descricao": "INEA (RJ) - Instituto Estadual do Ambiente ",
    "url": "https://geoservicos.inde.gov.br/geoserver/INEA/ows",
    "nivel_no": "Subnacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/INEA/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/INEA/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/INEA/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "PRODEMG (MG) - Companhia de Tecnologia da Informação do Estado de Minas Gerais",
    "url": "http://geoserver.prodemge.gov.br/geoserver/ows",
    "nivel_no": "Subnacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "http://geoserver.prodemge.gov.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "http://geoserver.prodemge.gov.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "http://geoserver.prodemge.gov.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "SEMA (CE) - Secretaria do Meio Ambiente e Mudança do Clima do Estado do Ceará",
    "url": "https://pedea.sema.ce.gov.br/geoserver/inde/wms",
    "nivel_no": "Subnacional",
    "wmsAvailable": true,
    "wfsAvailable": false,
    "wcsAvailable": false,
    "wmsGetCapabilities": "https://pedea.sema.ce.gov.br/geoserver/inde/wms?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": null,
    "wcsGetCapabilities": null
    },
    {
    "descricao": "SEMACE (CE) - Superintendência Estadual do Meio Ambiente do Ceará",
    "url": "https://geoservicos.inde.gov.br/geoserver/SEMACECE/ows",
    "nivel_no": "Subnacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/SEMACECE/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/SEMACECE/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/SEMACECE/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "SEPLAG (AL) - Secretaria de Estado do Planejamento, Gestão  e Patrimônio de Alagoas ",
    "url": "http://geo.seplande.al.gov.br/teogc/terraogcwms.cgi",
    "nivel_no": "Subnacional",
    "wmsAvailable": true,
    "wfsAvailable": false,
    "wcsAvailable": false,
    "wmsGetCapabilities": "http://geo.seplande.al.gov.br/teogc/terraogcwms.cgi?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": null,
    "wcsGetCapabilities": null
    },
    {
    "descricao": "TCE-RO - Tribunal de Contas do Estado de Rondônia",
    "url": "https://geoserver.tcero.tc.br/geoserver/ows",
    "nivel_no": "Subnacional",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoserver.tcero.tc.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoserver.tcero.tc.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoserver.tcero.tc.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "FMADS - Fundação Municipal do Meio Ambiente e Desenvolvimento Sustentável de São José (SC)",
    "url": "https://geoservicos.inde.gov.br/geoserver/SCSJFMADS/ows",
    "nivel_no": "Governo local",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/SCSJFMADS/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/SCSJFMADS/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/SCSJFMADS/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "IPLANFOR (CE) - Instituto de Planejamento de Fortaleza",
    "url": "https://mapas.fortaleza.ce.gov.br/api/geoserver/ows",
    "nivel_no": "Governo local",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://mapas.fortaleza.ce.gov.br/api/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://mapas.fortaleza.ce.gov.br/api/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://mapas.fortaleza.ce.gov.br/api/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "SEFAZ - Secretaria Municipal da Fazenda de Salvador (BA)",
    "url": "https://geoservicos.inde.gov.br/geoserver/BAPSalvador/ows",
    "nivel_no": "Governo local",
    "wmsAvailable": true,
    "wfsAvailable": false,
    "wcsAvailable": false,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/BAPSalvador/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": null,
    "wcsGetCapabilities": null
    },
    {
    "descricao": "SEFIN - Secretaria Municipal das Finanças de Fortaleza (CE)",
    "url": "https://geoserver.sefin.fortaleza.ce.gov.br/geoserver/ows",
    "nivel_no": "Governo local",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoserver.sefin.fortaleza.ce.gov.br/geoserver/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoserver.sefin.fortaleza.ce.gov.br/geoserver/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoserver.sefin.fortaleza.ce.gov.br/geoserver/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "Prefeitura de Belo Horizonte (MG)",
    "url": "http://bhmap.pbh.gov.br/v2/api/idebhgeo/ows",
    "nivel_no": "Governo local",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "http://bhmap.pbh.gov.br/v2/api/idebhgeo/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "http://bhmap.pbh.gov.br/v2/api/idebhgeo/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "http://bhmap.pbh.gov.br/v2/api/idebhgeo/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "Prefeitura de Cabo Frio (RJ)",
    "url": "https://geoservicos.inde.gov.br/geoserver/RJPCaboFrio/ows",
    "nivel_no": "Governo local",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/RJPCaboFrio/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/RJPCaboFrio/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/RJPCaboFrio/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "Prefeitura de Juazeiro do Norte (CE)",
    "url": "https://geoservicos.inde.gov.br/geoserver/CEPJuazeiroNorte/ows",
    "nivel_no": "Governo local",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/CEPJuazeiroNorte/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/CEPJuazeiroNorte/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/CEPJuazeiroNorte/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "Prefeitura do Município de São Paulo (SP) - vetor",
    "url": "http://wms.geosampa.prefeitura.sp.gov.br/geoserver/geoportal/ows",
    "nivel_no": "Governo local",
    "wmsAvailable": true,
    "wfsAvailable": false,
    "wcsAvailable": false,
    "wmsGetCapabilities": "http://wms.geosampa.prefeitura.sp.gov.br/geoserver/geoportal/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": null,
    "wcsGetCapabilities": null
    },
    {
    "descricao": "Prefeitura do Município de São Paulo (SP) - raster",
    "url": "http://raster.geosampa.prefeitura.sp.gov.br/geoserver/geoportal/ows",
    "nivel_no": "Governo local",
    "wmsAvailable": true,
    "wfsAvailable": false,
    "wcsAvailable": false,
    "wmsGetCapabilities": "http://raster.geosampa.prefeitura.sp.gov.br/geoserver/geoportal/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": null,
    "wcsGetCapabilities": null
    },
    {
    "descricao": "Prefeitura Municipal de Santo André",
    "url": "https://sigamapa.santoandre.sp.gov.br/geoserver/siga/ows",
    "nivel_no": "Governo local",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://sigamapa.santoandre.sp.gov.br/geoserver/siga/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://sigamapa.santoandre.sp.gov.br/geoserver/siga/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://sigamapa.santoandre.sp.gov.br/geoserver/siga/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "IFPI - Instituto Federal do Piauí - Campus Teresina",
    "url": "https://geoservicos.inde.gov.br/geoserver/IFPI/ows",
    "nivel_no": "Universidade/Academia",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/IFPI/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/IFPI/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/IFPI/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    },
    {
    "descricao": "UFABC (SP) - Universidade Federal do ABC ",
    "url": "https://geoservicos.inde.gov.br/geoserver/UFABC/ows",
    "nivel_no": "Universidade/Academia",
    "wmsAvailable": true,
    "wfsAvailable": true,
    "wcsAvailable": true,
    "wmsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/UFABC/ows?service=wms&request=GetCapabilities&version=1.3.0",
    "wfsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/UFABC/ows?service=wfs&request=GetCapabilities&version=1.3.0",
    "wcsGetCapabilities": "https://geoservicos.inde.gov.br/geoserver/UFABC/ows?service=wcs&request=GetCapabilities&version=1.3.0"
    }
    ]
    
let catalogos_ibge = 
    [{
            "descricao": "IBGE - Instituto Brasileiro de Geografia e Estatística - CGMAT",
            "sigla": "IBGE",
            "url": "https://geoservicos.ibge.gov.br/geoserver/ows",
            "wmsAvailable": true,
            "wfsAvailable": true,
            "wcsAvailable": true,
            "wmsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/CGMAT/ows?service=WMS&request=GetCapabilities",
            "wfsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/CGMAT/ows?service=wfs&request=GetCapabilities&version=1.3.0",
            "wcsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/CGMAT/ows?service=wcs&request=GetCapabilities&version=1.3.0",
            "url_metadados": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge",
            "cswGetCapabilities": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities"
            },
            {
                "descricao": "IBGE - Instituto Brasileiro de Geografia e Estatística - CCAR",
                "sigla": "IBGE",
                "url": "https://geoservicos.ibge.gov.br/geoserver/ows",
                "wmsAvailable": true,
                "wfsAvailable": true,
                "wcsAvailable": true,
                "wmsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/CCAR/ows?service=WMS&request=GetCapabilities",
                "wfsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/CCAR/ows?service=wfs&request=GetCapabilities&version=1.3.0",
                "wcsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/CCAR/ows?service=wcs&request=GetCapabilities&version=1.3.0",
                "url_metadados": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge",
                "cswGetCapabilities": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities"
            },
            {
                "descricao": "IBGE - Instituto Brasileiro de Geografia e Estatística - CGED",
                "sigla": "IBGE",
                "url": "https://geoservicos.ibge.gov.br/geoserver/ows",
                "wmsAvailable": true,
                "wfsAvailable": true,
                "wcsAvailable": true,
                "wmsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/CGED/ows?service=WMS&request=GetCapabilities",
                "wfsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/CGED/ows?service=wfs&request=GetCapabilities&version=1.3.0",
                "wcsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/CGED/ows?service=wcs&request=GetCapabilities&version=1.3.0",
                "url_metadados": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge",
                "cswGetCapabilities": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities"
            },
            {
                "descricao": "IBGE - Instituto Brasileiro de Geografia e Estatística - CGEO",
                "sigla": "IBGE",
                "url": "https://geoservicos.ibge.gov.br/geoserver/ows",
                "wmsAvailable": true,
                "wfsAvailable": true,
                "wcsAvailable": true,
                "wmsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/CGEO/ows?service=WMS&request=GetCapabilities",
                "wfsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/CGEO/ows?service=wfs&request=GetCapabilities&version=1.3.0",
                "wcsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/CGEO/ows?service=wcs&request=GetCapabilities&version=1.3.0",
                "url_metadados": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge",
                "cswGetCapabilities": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities"
            },
            {
                "descricao": "IBGE - Instituto Brasileiro de Geografia e Estatística  - CETE",
                "sigla": "IBGE",
                "url": "https://geoservicos.ibge.gov.br/geoserver/ows",
                "wmsAvailable": true,
                "wfsAvailable": true,
                "wcsAvailable": true,
                "wmsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/CETE/ows?service=WMS&request=GetCapabilities",
                "wfsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/CETE/ows?service=wfs&request=GetCapabilities&version=1.3.0",
                "wcsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/CETE/ows?service=wcs&request=GetCapabilities&version=1.3.0",
                "url_metadados": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge",
                "cswGetCapabilities": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities"
            },
            {
                "descricao": "IBGE - Instituto Brasileiro de Geografia e Estatística - CMA",
                "sigla": "IBGE",
                "url": "https://geoservicos.ibge.gov.br/geoserver/ows",
                "wmsAvailable": true,
                "wfsAvailable": true,
                "wcsAvailable": true,
                "wmsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/CREN/ows?service=WMS&request=GetCapabilities",
                "wfsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/CREN/ows?service=wfs&request=GetCapabilities&version=1.3.0",
                "wcsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/CREN/ows?service=wcs&request=GetCapabilities&version=1.3.0",
                "url_metadados": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge",
                "cswGetCapabilities": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities"
            },
            {
                "descricao": "IBGE - Instituto Brasileiro de Geografia e Estatística - BDIA",
                "sigla": "IBGE",
                "url": "https://geoservicos.ibge.gov.br/geoserver/ows",
                "wmsAvailable": true,
                "wfsAvailable": true,
                "wcsAvailable": true,
                "wmsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/BDIA/ows?service=WMS&request=GetCapabilities",
                "wfsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/BDIA/ows?service=wfs&request=GetCapabilities&version=1.3.0",
                "wcsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/BDIA/ows?service=wcs&request=GetCapabilities&version=1.3.0",
                "url_metadados": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge",
                "cswGetCapabilities": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities"
            },
            {
                "descricao": "IBGE - Instituto Brasileiro de Geografia e Estatística - PNADC",
                "sigla": "IBGE",
                "url": "https://geoservicos.ibge.gov.br/geoserver/ows",
                "wmsAvailable": true,
                "wfsAvailable": true,
                "wcsAvailable": true,
                "wmsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/PNADC/ows?service=WMS&request=GetCapabilities",
                "wfsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/PNADC/ows?service=wfs&request=GetCapabilities&version=1.3.0",
                "wcsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/PNADC/ows?service=wcs&request=GetCapabilities&version=1.3.0",
                "url_metadados": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge",
                "cswGetCapabilities": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities"
            },
            
            {
                "descricao": "IBGE - Objetivos de Desenvolvimento Sustentável - ODS",
                "sigla": "IBGE/ODS",
                "url": "https://geoservicos.ibge.gov.br/geoserver/ODS/ows",
                "wmsAvailable": true,
                "wfsAvailable": true,
                "wcsAvailable": true,
                "wmsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/ODS/ows?service=wms&request=GetCapabilities&version=1.3.0",
                "wfsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/ODS/ows?service=wfs&request=GetCapabilities&version=1.3.0",
                "wcsGetCapabilities": "https://geoservicos.ibge.gov.br/geoserver/ODS/ows?service=wcs&request=GetCapabilities&version=1.3.0",
                "url_metadados": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge",
                "cswGetCapabilities": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities"
                }
    ]
    let catalogos = []
    catalogos_servicos.forEach(cat => {
        if (cat.descricao.startsWith('IBGE -')) {
            catalogos_ibge.forEach(cat_ibge => {
                catalogos.push(cat_ibge) 
            })        
        } else {
            catalogos.push(cat)
        }
    })
    catalogos_servicos = catalogos
    export const catalogosWMSCapabilities =  catalogos_servicos.map((catalogo) => { return catalogo.wmsGetCapabilities});

    export const catalogos_csw = [
        {
            "descricao": "ANA - Agência Nacional de Águas e Saneamento Básico",
            "sigla": "ANA",
            "url": "https://metadados.snirh.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.snirh.gov.br/geonetwork/srv/eng/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "ANATEL - Agência Nacional de Telecomunicações",
            "sigla": "ANATEL",
            "url": "https://sistemas.anatel.gov.br/geonetwork",
            "cswGetCapabilities": "https://sistemas.anatel.gov.br/geonetwork/srv/eng/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "ANM - Agência Nacional de Mineração",
            "sigla": "ANM",
            "url": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/eng/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "ANM"
        },
        {
            "descricao": "ANP - Agência Nacional de Petróleo",
            "sigla": "ANP",
            "url": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/eng/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "ANP"
        },
        {
            "descricao": "BNDES - Banco Nacional de Desenvolvimento Econômico e Social ",
            "sigla": "BNDES",
            "url": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/eng/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "BNDES"
        },
        {
            "descricao": "CENSIPAM - Centro Gestor e Operacional do Sistema de Proteção da Amazônia",  
            "sigla": "CENSIPAM",
            "url": "https://panorama.sipam.gov.br/geonetwork/",
            "cswGetCapabilities": "https://panorama.sipam.gov.br/geonetwork/srv/eng/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "CPRM - Serviço Geológico do Brasil",
            "sigla": "CPRM",
            "url": "https://geoservicos.sgb.gov.br/geonetwork",
            "cswGetCapabilities": "https://geoservicos.sgb.gov.br/geonetwork/srv/eng/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "DNIT - Departamento Nacional de Infraestrutura de Transportes",
            "sigla": "DNIT",
            "url": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/eng/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "DNIT"
        },
        {
            "descricao": "DHN - Diretoria de Hidrografia e Navegação da Marinha do Brasil",  
            "sigla": "MB/DHN",
            "url": "https://idem.dhn.mar.mil.br/geonetwork",
            "cswGetCapabilities": "https://idem.dhn.mar.mil.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "DPC- Diretoria de Portos e Costas da Marinha",
            "sigla": "MB/DPC",
            "url": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "DPC"
        },
        {
            "descricao": "DPHDM - Diretoria do Patrimônio Histórico e Documentação da Marinha",
            "sigla": "MB/DPHDM",
            "url": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/eng/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "DPHDM"
        },
        {
            "descricao": "EB/DSG - Diretoria de Serviço Geográfico do Exército Brasileiro",  
            "sigla": "EBDSG",
            "url": "https://bdgex.eb.mil.br/bdgexapp",
            "cswGetCapabilities": "https://bdgex.eb.mil.br/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "EMBRAPA - Empresa Brasileira de Pesquisa Agropecuária",  
            "sigla": "EMBRAPA",
            "url": "http://inde.geoinfo.cnpm.embrapa.br/geonetwork_inde",
            "cswGetCapabilities": "http://inde.geoinfo.cnpm.embrapa.br/geonetwork_inde/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "Engenharia, Construções e Ferrovias S.A",
            "sigla": "VALEC",
            "url": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "VALEC"
        },
        {
            "descricao": "IBAMA - Instituto Brasileiro do Meio Ambiente e dos Recursos Naturais Renováveis ",
            "sigla": "IBAMA",
            "url": "http://siscom.ibama.gov.br/geonetwork/",
            "cswGetCapabilities": "http://siscom.ibama.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "IBGE - Instituto Brasileiro de Geografia e Estatística ",
            "sigla": "IBGE",
            "url": "https://metadadosgeo.ibge.gov.br",
            "cswGetCapabilities": "https://metadadosgeo.ibge.gov.br/geonetwork_ibge/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "ICA - Instituto de Cartografia Aeronáutica ",
            "sigla": "ICA",
            "url": "https://metadados.inde.gov.br/geonetwork/srv/por/q?category=ICA",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "ICA"
        },
        {
            "descricao": "ICMBIO - Instituto Chico Mendes de Conservação da Biodiversidade",
            "sigla": "ICMBio",
            "url": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "ICMBio"
        },
        {
            "descricao": "INPE - Instituto Nacional de Pesquisas Espaciais",  
            "sigla": "INPE",
            "url": "http://terrabrasilis.dpi.inpe.br/geonetwork/",
            "cswGetCapabilities": "http://terrabrasilis.dpi.inpe.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "MDA - Ministério do Desenvolvimento Agrário",  
            "sigla": "MDA",
            "url": "http://mapas.mda.gov.br/geonetwork",
            "cswGetCapabilities": "http://mapas.mda.gov.br/geonetwork/srv/pt/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "MDS - Ministério do Desenvolvimento Social e Combate à Fome",  
            "sigla": "MDS",
            "url": "http://mapas.mma.gov.br/geonetwork",
            "cswGetCapabilities": "http://mapas.mma.gov.br/geonetwork/srv/br/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "MDS"
        },
        {
            "descricao": "MINFRA - Ministério da Infraestrutura",
            "sigla": "MINFRA",
            "url": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "MInfra"
        },
        {
            "descricao": "MS - Ministério da Saúde",  
            "sigla": "MS",
            "url": "http://mapas.sage.saude.gov.br/geonetwork",
            "cswGetCapabilities": "http://mapas.sage.saude.gov.br/geonetwork/srv/br/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "MMA - Minstério do Meio Ambiente",  
            "sigla": "MMA",
            "url": "http://mapas.mma.gov.br/geonetwork",
            "cswGetCapabilities": "http://mapas.mma.gov.br/geonetwork/srv/br/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "MP - Ministério de Planejamento, Desenvolvimento e Gestão ",
            "sigla": "MP",
            "url": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "MPOG"
        },
        {
            "descricao": "PGGM - Programa de Geologia e Geofísica Marinha",
            "sigla": "PGGM",
            "url_metadados": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "PGGM"
        },
        {
            "descricao": "SPM - Secretaria Nacional de Políticas para as Mulheres",
            "sigla": "SPM",
            "url": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "SPM"
        },
        {
            "descricao": "UFABC/SP - Universidade Federal do ABC",
            "sigla": "UFABC",            
            "url_metadados": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "UFABC"
        },
        {
            "descricao": "UNB - Fundação Universidade de Brasília / Instituto de Geociências",
            "sigla": "UNB",            
            "url_metadados": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "CEAGUNB"
        },
        {
            "descricao": "UNILA - Universidade Federal da Integração Latino-Americana",
            "sigla": "UNILA",            
            "url_metadados": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "UNILA"
        },
        {
            "descricao": "Fundação João Pinheiro (MG)",
            "sigla": "FJP",
            "url": "https://geonetwork.fjp.mg.gov.br",
            "cswGetCapabilities": "https://geonetwork.fjp.mg.gov.br/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "SEMA/DF - Secretaria de Estado do Meio Ambiente do Distrito Federal",
            "sigla": "SEMADF",
            "url": "https://metadados.sisdia.df.gov.br/geonetwork/",
            "cswGetCapabilities": "https://metadados.sisdia.df.gov.br/geonetwork/srv/eng/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "IDE/DF - Infraestrutura de Dados Espaciais do Distrito Federal",
            "sigla": "IDE/DF",
            "url": "https://www.metadados.seduh.df.gov.br/geonetwork",
            "cswGetCapabilities": "https://www.metadados.seduh.df.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        
        {
            "descricao": "IDE/BA - Infraestrutura de Dados Espaciais da Bahia",  
            "sigla": "IDEBA",
            "url": "https://metadados.ide.ba.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.ide.ba.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "IDE/ES-GEOBASES - Sistema Integrado de Bases Geoespaciais do Estado do Espírito Santo",  
            "sigla": "IDEES",
            "url": "https://ide.geobases.es.gov.br/",
            "cswGetCapabilities": "https://ide.geobases.es.gov.br/catalogue/csw?service=CSW&request=GetCapabilities&version=2.0.2",
            "noCentralCategoria": null
        },
        {
            "descricao": "IEDE/RS - Infraestrutura Estadual de Dados Espaciais do Rio Grande do Sul",
            "sigla": "IEDERS",
            "url": "https://iede.rs.gov.br/geoportal",
            "cswGetCapabilities": "https://iede.rs.gov.br/geoportal/csw?service=CSW&version=2.0.2&request=GetCapabilities"
        },
        {
            "descricao": "IDE/Sisema - Sistema Estadual de Meio Ambiente e Recursos Hídricos (MG)",  
            "sigla": "IDESisema",
            "url": "https://idesisema.meioambiente.mg.gov.br/geonetwork",
            "cswGetCapabilities": "https://idesisema.meioambiente.mg.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "IDE/SP - Infraestrutura de Dados Espaciais de São Paulo",  
            "sigla": "IDESP",
            "url": "http://www.metadados.idesp.sp.gov.br/",
            "cswGetCapabilities": "http://www.metadados.idesp.sp.gov.br/catalogo/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "INEA/RJ - Instituto Estadual do Ambiente",
            "sigla": "INEA",
            "url_metadados": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "INEA"
        },
        
        {
            "descricao": "PRODEMG - Companhia de Tecnologia da Informação do Estado de Minas Gerais",
            "sigla": "PRODEMG",
            "url": "https://www.geoservicos.prodemge.gov.br/geonetwork",
            "cswGetCapabilities": "https://www.geoservicos.prodemge.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "SEMACE/CE - Superintendência Estadual do Meio Ambiente do Ceará",
            "sigla": "SEMACECE",
            "url": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "SEMACECE"
        },
        {
            "descricao": "SEPLAG/AL - Secretaria de Estado do Planejamento, Gestão e Patrimônio de Alagoas",  
            "sigla": "SEPLAGAL",
            "url": "http://inde.dados.al.gov.br:8080/geonetwork",
            "cswGetCapabilities": "http://inde.dados.al.gov.br:8080/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "TCERO - Tribunal de Contas do Estado de Rondônia",  
            "sigla": "TCERO",
            "url": "https://geonetwork.tcero.tc.br",
            "cswGetCapabilities": "https://geonetwork.tcero.tc.br/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "Prefeitura de Belo Horizante",  
            "sigla": "PrefeituraBH",
            "url": "http://geonetwork.pbh.gov.br/geonetwork/",
            "cswGetCapabilities": "http://geonetwork.pbh.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "Prefeitura de Juazeiro do Norte (CE)",
            "sigla": "PJN",
            "url": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "CEPJuazeiroNorte"
        },  
        {
            "descricao": "Prefeitura do Município de São Paulo (SP)",
            "sigla": "PSP",
            "url": "https://metadados.geosampa.prefeitura.sp.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.geosampa.prefeitura.sp.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },

        {
            "descricao": "SEFIN - Secretaria Municipal das Finanças de Fortaleza",  
            "sigla": "SEFIN",
            "url": "https://geonetwork.sefin.fortaleza.ce.gov.br/geonetwork/",
            "cswGetCapabilities": "https://geonetwork.sefin.fortaleza.ce.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": null
        },
        {
            "descricao": "SEFAZ - Secretaria Municipal da Fazenda de Salvador",
            "sigla": "SEFAZ",
            "url": "https://metadados.inde.gov.br/geonetwork",
            "cswGetCapabilities": "https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetCapabilities",
            "noCentralCategoria": "BAPSalvador"
        },
    ]