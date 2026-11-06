-- Consultas para o console da Neon. A tabela analytics_events
-- é criada na primeira escrita do app. Não há tela de admin.

-- Contagem por humor pedido
SELECT props->'mood'->>'label' AS humor, count(*)
FROM analytics_events
WHERE name = 'recommendation'
GROUP BY 1
ORDER BY 2 DESC;

-- Manter o clima vs mudar
SELECT props->>'mode' AS clima, count(*)
FROM analytics_events
WHERE name = 'recommendation'
GROUP BY 1
ORDER BY 2 DESC;

-- Filmes que apareceram na tela
SELECT props->'movie'->>'title' AS filme,
       props->'movie'->>'year' AS ano,
       count(*)
FROM analytics_events
WHERE name = 'movie_shown'
GROUP BY 1, 2
ORDER BY 3 DESC
LIMIT 30;

-- Gêneros dos filmes mostrados
SELECT genre, count(*)
FROM analytics_events,
     LATERAL jsonb_array_elements_text(props->'movie'->'genres') AS genre
WHERE name = 'movie_shown'
GROUP BY 1
ORDER BY 2 DESC;

-- Textos livres que passaram na heurística e no Jev
SELECT created_at, visit_id, props->>'text' AS texto
FROM analytics_events
WHERE name = 'recommendation'
  AND coalesce(props->>'text', '') <> ''
ORDER BY created_at DESC
LIMIT 50;

-- Abuso: a linha existe, o texto não
SELECT created_at, visit_id, props->'mood'->>'label' AS humor
FROM analytics_events
WHERE name = 'recommendation'
  AND props->>'omitReason' = 'abuse'
ORDER BY created_at DESC;

-- Onde a sentada parou: último passo continuado, sem recomendação
SELECT props->>'step' AS etapa, count(*)
FROM analytics_events e
WHERE name = 'step_continue'
  AND NOT EXISTS (
    SELECT 1
    FROM analytics_events r
    WHERE r.visit_id = e.visit_id
      AND r.name = 'recommendation'
  )
GROUP BY 1
ORDER BY 2 DESC;
