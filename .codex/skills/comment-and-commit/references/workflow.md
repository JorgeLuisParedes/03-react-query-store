# Workflow de Comment and Commit

Esta referencia define cómo ejecutar, en una sola invocación, el flujo secuencial de la skill `comment-and-commit`.

Su objetivo es asegurar que, sobre un diff real, primero se evalúen los símbolos relevantes y se apliquen decisiones documentales consistentes y trazables (agregar, modificar, conservar o eliminar comentarios), y después se proponga el título final de commit.

Cuando exista ambigüedad entre opciones válidas, debe priorizarse la que comunique mejor el impacto técnico del cambio y mantenga alineación con las guías base.

Esta referencia de orquestación complementa, pero no reemplaza, las reglas específicas de:

- `code-commenting-guidelines`
- `commit-pr-guidelines`

---

## 1. Criterios

- Basarse siempre en el diff actual del repositorio (`git diff`, `git diff --staged`, `git status --short`).
- Ejecutar el flujo en orden obligatorio: primero comentarios, después propuesta de commit.
- Limitar la fase documental a archivos del diff, incluidos los nuevos sin seguimiento, y evaluar sus símbolos relevantes según `code-commenting-guidelines`.
- No descartar documentación útil solo porque la implementación sea legible; considerar propósito, contrato, contexto y mantenimiento futuro.
- Evitar recomendaciones genéricas sin archivo objetivo ni motivo técnico verificable.
- Mantener consistencia entre las decisiones documentales aplicadas y el commit propuesto: el commit debe reflejar el estado final del diff.
- Priorizar trazabilidad: cada recomendación debe poder justificarse con evidencia del diff.

## 2. Casos Sin Cambios

Si no existe ningún cambio en el repositorio (tracked, staged ni untracked):

- Indicar explícitamente que no se detectaron cambios en el diff actual.
- No proponer agregar, modificar, conservar ni eliminar comentarios.
- No ejecutar la fase de commit ni presentar alternativas de `type` o `scope`.
- No proponer título de commit final como recomendación definitiva.

## 3. Alcance

Esta skill no ejecuta commits, no stagea archivos y no abre pull requests automáticamente.

Su responsabilidad es:

- aplicar primero la fase de comentarios sobre el diff actual
- proponer después un único título de commit final, para que el usuario decida cuándo y cómo commitear

Toda acción fuera de ese alcance debe considerarse externa a esta skill.
