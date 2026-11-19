# Official Views & Reporting Articles

Curated from the Spanish KB (`support.invgate.com`) on 2026-11-18. Full index: `invgate-basics/references/kb-index.md`.

| Article | ID | Answers |
|---|---|---|
| Vistas de solicitudes | [1102](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1102) | Creating views, quick vs advanced filters, columns, rows per page, export to CSV/XLSX/JSON, sorting |
| Compartir vistas personalizadas | [1259](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1259) | Share targets, restrictions, what the recipient can do |
| Filtros de fechas | [1455](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1455) | Time operators (`es`, `es (rango)`, relative ranges) and undefined-field operators |
| Obtener solicitudes de una vista vía API | [1275](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1275) | `view_id` only required parameter, `page_key`, `metadata` hydration |
| Exportar grandes volúmenes | [1723](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1723) | Data export sources (requests, intervals, tasks, SLAs, OLAs, KB, VSA), UUID and BI URL, daily minimum frequency |
| Reporte de Intervalos | [2201](https://support.invgate.com/knowledgebase_articles/show/index/article_id/2201) | Measuring the request journey interval by interval |
| Métricas y dimensiones | [197](https://support.invgate.com/knowledgebase_articles/show/index/article_id/197) | Metric definitions used by reports and dashboards |
| Cálculo de tiempos | [17](https://support.invgate.com/knowledgebase_articles/show/index/article_id/17) | How average first-response and resolution time are computed |
| Guía básica de reportes | [1004](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1004) | Report types and basic configuration |
| Reportes para KPIs | [1972](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1972) | KPI-oriented report design |
| Tableros personalizados | [1479](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1479) | Building Service Management dashboards |
| Compartir tableros | [771](https://support.invgate.com/knowledgebase_articles/show/index/article_id/771) | Dashboard visibility |
| API OLAP | [1108](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1108) | **Deprecated from v8.22**; migrate to data export |
| Power BI con OLAP | [1111](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1111) | Legacy BI connection; use the export report URL instead |

## Migration Note

OLAP support ends with v8.22. Replace OLAP extraction with:

1. `Config > Reportes > Nuevo > Exportación de datos`, selecting the source and columns.
2. The generated **UUID** for `POST /data.export` or the **unique URL** for BI tools.
3. Scheduled generation (daily minimum) or on-demand retrieval.
