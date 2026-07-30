---
name: commit-pr-guidelines
description: Aplicar y revisar la convencion de commits y pull requests del proyecto basada en diff real para redactar mensajes de commit y propuestas de PR con type/scope correctos; no usar para tareas de solo comentarios de codigo ni para proponer commits/PR sin evidencia de diff.
metadata:
    version: '1.0.0'
---

# Commit and PR Guidelines

## Flujo de trabajo

1. Inspeccionar siempre el diff actual del repositorio antes de proponer commits o PRs.
2. Leer [references/commit_and_pr_guidelines.md](references/commit_and_pr_guidelines.md) antes de redactar recomendaciones.
3. Seleccionar `type` usando la guía, según impacto principal del cambio, y justificar la elección en una línea breve.
4. Redactar commits con formato obligatorio `<type>(<scope>): descripción breve y clara en español`.
5. Usar solo `types` permitidos y un `scope` en minúsculas que refleje la responsabilidad principal.
6. Asegurar que el mensaje de commit describa resultado e impacto, no detalle de implementación.
7. Para PRs, usar el mismo formato en el título y una descripción obligatoria con: Qué, Cambios principales, Fuera de alcance y Notas.
8. Validar coherencia de alcance, tamaño del PR y criterios de merge antes de cerrar la propuesta.

## Regla obligatoria de contexto

- Nunca proponer mensaje de commit o título de PR sin basarse en el diff real (`git diff`, `git diff --staged`, y si aplica `git diff --name-only`).
- Si no hay cambios, indicar explícitamente que no hay diff para redactar un commit/PR preciso.
- Si no hay diff, no proponer commit ni PR como recomendación definitiva.

## Regla de consistencia con referencia

- Todas las recomendaciones deben alinearse con [references/commit_and_pr_guidelines.md](references/commit_and_pr_guidelines.md).
- Si existe conflicto entre esta skill y la referencia, prevalece la referencia.

## Formato de salida obligatorio

- Antes de proponer commit o PR, mostrar una sección `Diff analizado:`.
- En `Diff analizado:`, listar cada archivo relevante y un resumen concreto de qué cambió.
- Luego mostrar `Type elegido:` con una justificación breve basada en la guía de selección.
- Evitar frases genéricas como "se actualizan archivos" sin detalle.
- Si el diff es grande, priorizar los cambios que justifican el `type` y el `scope`.
- Luego mostrar la sección `Commit propuesto:` con una única opción principal.
- Si hay ambigüedad real de `type` o `scope`, añadir una sección `Alternativa:` con solo 1 opción y una justificación breve.
- Si no hay ambigüedad, no incluir sección de alternativa.
- Si se solicita PR, incluir `Título del PR:` y `Descripción del PR:` con la plantilla obligatoria (Qué, Cambios principales, Fuera de alcance, Notas).
- Si no hay diff, indicar explícitamente que no hay base para proponer commit o PR definitivo.

## Checklist de salida

- Commit/PR en español claro y técnico.
- Formato de commit estricto con `type` y `scope` en minúsculas.
- Sin mensajes ambiguos o temporales (`wip`, `update`, `misc`, etc.).
- PR con objetivo claro, límites explícitos y notas de riesgo/deuda cuando aplique.
- Recomendaciones alineadas con merge por squash e historial mantenible.
- Evidencia del diff incluida antes del commit propuesto.
- Si no hay diff, indicar explícitamente que no hay base para propuesta definitiva.
- Incluir `Alternativa:` solo cuando exista ambigüedad real de `type` o `scope`.
- Validar que la descripción de PR incluya `Qué`, `Cambios principales`, `Fuera de alcance` y `Notas`.
