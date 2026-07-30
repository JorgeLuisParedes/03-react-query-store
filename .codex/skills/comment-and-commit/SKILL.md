---
name: comment-and-commit
description: Orquestar un flujo completo sobre el diff actual del repositorio para primero evaluar y aplicar decisiones de documentación en el código y después proponer el título final de commit; usar cuando se requieran ambas fases en orden obligatorio y no usar para tareas aisladas de solo comentarios o solo commits/PR.
metadata:
    version: '2.0.0'
---

# Comment and Commit

## Flujo de trabajo

1. Inspeccionar siempre el diff actual del repositorio (`git diff`, `git diff --staged`, `git status --short`).
2. Identificar los archivos objetivo a partir del diff actual, incluidos archivos nuevos sin seguimiento.
3. Aplicar la guía de comentarios usando [../code-commenting-guidelines/SKILL.md](../code-commenting-guidelines/SKILL.md) y su referencia.
4. Evaluar los símbolos relevantes y aplicar las decisiones documentales que correspondan (agregar, modificar, conservar o eliminar comentarios) antes de volver a inspeccionar el diff resultante.
5. Aplicar la guía de commits usando [../commit-pr-guidelines/SKILL.md](../commit-pr-guidelines/SKILL.md) y su referencia.
6. Proponer un único título de commit basado en el estado final del diff.

## Regla obligatoria de contexto

- No proponer commit antes de terminar la fase de comentarios.
- No incluir archivos fuera del diff actual del repositorio, salvo instrucción explícita del usuario.
- Si no hay diff, indicarlo explícitamente y no proponer comentarios ni commit como recomendación definitiva.

## Regla de consistencia con referencia

- Todas las recomendaciones deben alinearse con [references/workflow.md](references/workflow.md).
- Para la fase de comentarios, aplicar [../code-commenting-guidelines/references/commenting_guidelines.md](../code-commenting-guidelines/references/commenting_guidelines.md).
- Para la fase de commit, aplicar [../commit-pr-guidelines/references/commit_and_pr_guidelines.md](../commit-pr-guidelines/references/commit_and_pr_guidelines.md).
- Si existe conflicto entre esta skill y las referencias, prevalece `references/workflow.md` para el orden del flujo y las referencias específicas para reglas de cada fase.

## Formato de salida obligatorio

- Antes de proponer comentarios o commit, mostrar una sección `Diff analizado:`.
- En `Diff analizado:`, listar archivos objetivo y estado (`modified`, `added`, `deleted`, `renamed`, `untracked`), con resumen breve de cambios relevantes.
- Luego mostrar `Decisiones de documentación:` con acciones por archivo y símbolo agrupadas en `Agregados`, `Modificados`, `Conservados` y `Eliminados`, omitiendo los grupos vacíos; si no corresponde ninguna acción, indicar `Sin cambios de comentarios` con justificación basada en los símbolos evaluados.
- Después mostrar `Type elegido:` con `type` y motivo breve según la guía de commits.
- Luego mostrar `Commit propuesto:` con una única opción principal en formato `<type>(<scope>): descripción breve y clara en español`.
- Incluir `Alternativa:` solo si hay ambigüedad real de `type` o `scope`; si no hay ambigüedad, no incluirla.
- Si no hay diff, indicarlo explícitamente y no proponer comentarios ni commit como recomendación definitiva.

## Checklist de salida

- Evidencia del diff incluida antes de cualquier recomendación.
- Orden del flujo respetado: primero comentarios, después commit.
- `Decisiones de documentación:` con acciones justificadas por archivo y símbolo o `Sin cambios de comentarios` con justificación.
- `Type elegido:` justificado según guía de commits.
- `Commit propuesto:` en formato `<type>(<scope>): descripción breve y clara en español`.
- `Alternativa:` solo cuando exista ambigüedad real de `type` o `scope`.
- Si no hay diff, indicado explícitamente y sin propuesta definitiva de comentarios ni commit.
- La salida respeta el orden y secciones obligatorias definidas en esta skill.
