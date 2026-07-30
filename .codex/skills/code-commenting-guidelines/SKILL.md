---
name: code-commenting-guidelines
description: Agregar, actualizar, conservar o eliminar comentarios y JSDoc en código TypeScript/React para documentar responsabilidades, contratos, decisiones, reglas de negocio y contexto de mantenimiento; usar sobre el diff actual o sobre archivos, carpetas o módulos indicados explícitamente aunque no tengan cambios, sin narrar mecánicamente la implementación, y no usar para proponer commits/PR.
metadata:
    version: '2.0.0'
---

# Code Commenting Guidelines

## Flujo de trabajo

1. Determinar el modo de revisión:
    - usar **modo diff** cuando el usuario no indique otro alcance;
    - usar **modo alcance explícito** cuando el usuario nombre archivos, carpetas o módulos, aunque no tengan cambios en Git.
2. En modo diff, inspeccionar `git status --short`, `git diff` y `git diff --staged`, e incluir archivos nuevos sin seguimiento mediante lectura directa o `git diff --no-index -- /dev/null <archivo>`.
3. En modo alcance explícito, verificar y leer directamente todos los objetivos indicados sin exigir un diff previo ni ampliar la revisión fuera de ellos.
4. Identificar en el alcance seleccionado los símbolos relevantes: funciones, hooks, componentes, servicios, acciones, reducers, utilidades, estructuras de datos y módulos.
5. Leer [references/commenting_guidelines.md](references/commenting_guidelines.md) antes de redactar, modificar o eliminar comentarios.
6. Evaluar obligatoriamente cada símbolo relevante desde dos perspectivas:
    - si su implementación se entiende localmente;
    - si un comentario reduciría el esfuerzo futuro para comprender su propósito, contrato, contexto o relación con el sistema.
7. Decidir por símbolo entre agregar, modificar, conservar o eliminar documentación, sin asumir que un código legible vuelve innecesario todo comentario.
8. Usar JSDoc cuando aporte propósito, contrato, restricciones, reglas de negocio, efectos secundarios o contexto reutilizable; no exigirlo automáticamente a toda función exportada.
9. Usar comentarios inline para intención, decisiones o restricciones locales que no convenga expresar mediante nombres, tipos o estructura.
10. Escribir TODO/FIXME en español, con etiqueta en mayúsculas al inicio (`TODO:`, `FIXME:`), contenido accionable y motivo.
11. Manejar bloques de código comentado así:
    - inferir primero su contexto desde el código activo y la evidencia disponible;
    - conservar una alternativa técnica vigente solo con `Decisión:` y `Alternativa:`, incluyendo cuándo reevaluarla o eliminarla;
    - si no se puede inferir su propósito con confianza, preguntar al usuario antes de conservarla o eliminarla.

## Regla obligatoria de contexto

- En modo diff, no asumir ausencia de cambios hasta comprobar archivos tracked, staged y untracked.
- En modo diff, si no existe ningún cambio, indicarlo explícitamente y no proponer reescrituras fuera del alcance.
- En modo alcance explícito, revisar los objetivos indicados aunque Git no muestre cambios y no usar la ausencia de diff como motivo para omitir la documentación.
- No ampliar silenciosamente el modo alcance explícito a archivos, carpetas o módulos que el usuario no haya indicado.

## Regla de consistencia con referencia

- Aplicar los criterios normativos y ejemplos de [references/commenting_guidelines.md](references/commenting_guidelines.md).
- Mantener este archivo como contrato operativo y la referencia como fuente de criterios documentales detallados.
- Si aparece una contradicción, detener la decisión afectada y señalarla en lugar de elegir silenciosamente una regla.

## Formato de salida obligatorio

- Mostrar primero `Diff analizado:` en modo diff o `Alcance analizado:` en modo alcance explícito, con los archivos y símbolos relevantes revisados.
- Mostrar después `Decisiones de documentación:`, agrupando acciones en `Agregados`, `Modificados`, `Conservados` y `Eliminados`; omitir únicamente los grupos vacíos.
- Ubicar cada acción por archivo y símbolo, explicando qué valor documental aporta o qué problema justifica su eliminación.
- Si no se requieren acciones, indicar `Sin cambios de comentarios` y justificar por qué la documentación existente o el propio código cubren el propósito, contrato y contexto de los símbolos evaluados.
- Distinguir entre recomendaciones y ediciones realizadas según lo pedido por el usuario.

## Checklist de salida

- Todos los símbolos relevantes del diff o del alcance explícito fueron evaluados, no solo los comentarios existentes.
- La evaluación consideró al consumidor del símbolo, a otro programador y al autor futuro, no únicamente al lector de la implementación completa.
- Los comentarios agregados o conservados reducen esfuerzo de comprensión y están escritos en español consistente.
- No se narran instrucciones, sintaxis ni tipos evidentes línea por línea.
- JSDoc aporta propósito, contrato o contexto útil sin ser obligatorio por exportación.
- Un comentario no se elimina solo porque su información pueda reconstruirse leyendo toda la implementación.
- Toda eliminación se justifica por obsolescencia, incorrección, ambigüedad, engaño o repetición mecánica.
- TODO/FIXME son claros, accionables y explican su impacto.
- Los comentarios están preparados para conservar valor ante refactors.
- La evidencia del diff o del alcance explícito aparece antes de las decisiones documentales.
