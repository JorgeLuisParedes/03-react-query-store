# Guía de Commits y Pull Requests

Esta guía define cómo estructurar y documentar **commits** y **pull requests** en este repositorio.

Su objetivo es mejorar la trazabilidad del historial, la consistencia del trabajo en equipo y la claridad técnica durante la revisión de cambios.

Cuando existan varias opciones válidas, debe priorizarse la que comunique con mayor claridad el objetivo e impacto del cambio.

Estas reglas son convenciones de colaboración: ayudan a comunicar mejor los cambios, pero no reemplazan la documentación de arquitectura o producto.

---

## 1. Convención de Commits

### 1.1 Formato base

Todo commit debe seguir esta estructura:

```text
<type>(<scope>): descripción breve y clara en español
```

Reglas base:

- `type` y `scope` se escriben siempre en minúsculas
- la descripción debe comunicar el objetivo del cambio, no el detalle de implementación
- el mensaje debe ser claro y específico por sí mismo

### Ejemplos válidos

```text
feat(requests): agregar reordenamiento de documentos
fix(auth): corregir expiración de sesión
```

### Ejemplos inválidos

```text
fix(auth): ajustar lógica
update
cambios varios
```

### 1.2 Types permitidos

Los `types` son obligatorios, se escriben en inglés y no deben inventarse nuevos.

| Type     | Cuándo usarlo                                               |
| -------- | ----------------------------------------------------------- |
| feat     | Nueva funcionalidad visible                                 |
| fix      | Corrección de bug o comportamiento incorrecto               |
| refactor | Reestructuración sin cambio funcional observable            |
| perf     | Mejora de rendimiento                                       |
| style    | Cambios de formato sin impacto funcional                    |
| test     | Creación o ajuste de pruebas                                |
| docs     | Documentación                                               |
| chore    | Mantenimiento técnico (scripts, dependencias, housekeeping) |
| ci       | Cambios de CI/CD                                            |
| build    | Cambios de build o toolchain                                |

Reglas:

- no usar `type` genéricos para agrupar cambios no relacionados
- el `type` debe describir el resultado del cambio, no el esfuerzo realizado
- si un cambio parece encajar en varios `types`, debe elegirse el impacto principal

### 1.3 Cómo elegir el type

Cuando un cambio pueda encajar en más de un `type`, debe elegirse el impacto principal del resultado final.

Criterios prácticos:

- `docs`: si solo cambian archivos de documentación o textos de ayuda sin impacto funcional
- `chore`: mantenimiento técnico sin impacto funcional ni documental principal
- `refactor`: mejora de estructura interna sin alterar comportamiento observable
- `fix`: corrección de comportamiento incorrecto
- `feat`: incorporación de una nueva capacidad visible
- `test`: creación o ajuste de pruebas
- `style`: formato o estilo sin impacto funcional
- `perf`: mejora de rendimiento
- `ci`: ajustes de integración o despliegue
- `build`: cambios de compilación o toolchain

Reglas de desempate:

- si solo cambia documentación, priorizar `docs` sobre `chore`
- no usar `chore` como comodín si existe un `type` más específico
- si el diff mezcla varios tipos, elegir el impacto principal y reflejar el resto en el PR

### 1.4 Scope

El `scope` es obligatorio y debe representar la responsabilidad principal del cambio.

Reglas:

- escribir siempre en minúsculas
- usar un scope relacionado con dominio, módulo o capa técnica
- evitar scopes genéricos o ambiguos
- si el cambio afecta varias áreas, elegir el scope de mayor impacto y explicar el resto en el PR
- si no existe un scope claro, dividir el cambio antes de commitear; no usar scopes comodín
- usar nombres ya existentes en módulos o capas del proyecto para evitar sinónimos innecesarios

Scopes comunes:

```text
auth
requests
files
ui
api
db
emails
```

Scopes a evitar:

```text
misc
general
temp
several
```

### Ejemplo válido

```text
feat(files): permitir descarga con URL firmada
```

### Ejemplo inválido

```text
feat(misc): varios ajustes
```

### Ejemplo de multi-área

```text
feat(api): agregar endpoint de carga masiva
```

Aunque también afecte `db`, se elige `api` por impacto principal y el resto se explica en el PR.

### 1.5 Reglas de redacción

El mensaje del commit debe ser breve, claro y orientado al objetivo del cambio.

Reglas:

- redactar en español técnico claro
- usar infinitivo con intención imperativa
- evitar punto final
- mantener una longitud aproximada de hasta 72 caracteres
- expresar un único cambio conceptual por commit
- evitar descripciones genéricas o ambiguas
- describir la intención del cambio, no el detalle de implementación
- evitar abreviaciones no estándar

### Ejemplos válidos

```text
feat(requests): permitir reordenamiento de documentos
fix(auth): corregir cálculo de expiración de sesión
```

### Ejemplos inválidos

```text
feat(requests): agregando reordenamiento
fix(auth): se corrigió expiración
refactor(ui): agregar useMemo al listado
chore(files): cambios varios
```

`refactor(ui): agregar useMemo al listado` es inválido porque describe implementación, no resultado.

### 1.6 Body y footer (cuándo usarlos)

El `body` y el `footer` son opcionales.
Solo deben usarse cuando agregan contexto que no cabe en el header.

#### Body del commit

Usar `body` cuando sea necesario explicar motivación, impacto o decisión técnica relevante.

Formato:

```text
refactor(auth): separar lógica de sesión

Se movió la validación a un helper compartido
para evitar duplicación entre middleware y API.
```

Reglas:

- dejar una línea en blanco entre header y body
- mantener el body breve (máx. 3-4 líneas)
- no describir el código línea por línea
- complementar el header, no repetirlo
- si casi todos los commits requieren body, probablemente el header está siendo demasiado genérico

### Ejemplo inválido de body

```text
fix(auth): corregir sesión

Se cambió authService.ts
Se cambió session.ts
Se cambió middleware.ts
```

Este ejemplo es inválido porque lista archivos, pero no explica contexto ni impacto.

#### Footer del commit

Usar `footer` en casos excepcionales:

- `BREAKING CHANGE`
- notas de migración relevantes
- referencias técnicas necesarias para entender impacto

Ejemplo:

```text
refactor(db): ajustar estructura de request_items

BREAKING CHANGE: requiere recrear la tabla
```

Reglas:

- usar `BREAKING CHANGE:` en mayúsculas al inicio de línea
- mantener el footer breve y orientado al impacto
- no usar footer para reemplazar documentación técnica del proyecto

### 1.7 Qué evitar

Evitar commits que:

- usen mensajes genéricos o ambiguos
- agrupen cambios no relacionados en una sola unidad
- reflejen estado temporal de trabajo en lugar de resultado técnico
- oculten el impacto real del cambio

### Ejemplos a evitar

```text
fix stuff
update
wip
changes
misc
temp
quick fix
varios ajustes
cambios menores
chore(misc): varios ajustes
fix(general): update auth
feat(temp): pruebas
```

### Señales de que el commit está mal definido

- no puede explicarse claramente en una sola frase
- combina varias responsabilidades técnicas sin relación directa
- el `type` o el `scope` se eligieron como comodín
- el mensaje describe esfuerzo en lugar de resultado concreto

Checklist rápido antes de integrar:

- ¿el mensaje describe un resultado concreto?
- ¿el `type` y el `scope` reflejan el impacto principal?
- ¿el commit mantiene una sola responsabilidad?

Si no puedes describir el cambio con claridad, probablemente el commit deba dividirse antes de integrarse.

---

## 2. Convención de Pull Requests

### 2.1 Cuándo crear un PR

Un pull request debe abrirse cuando el cambio requiere revisión técnica y trazabilidad compartida.

Casos comunes:

- nuevas funcionalidades
- correcciones de bugs
- refactors relevantes
- cambios de arquitectura o de comportamiento observable
- ajustes no triviales en seguridad, rendimiento o datos
- cambios que afecten más de un módulo o capa, aunque sean pequeños

Un PR debe:

- agrupar cambios relacionados entre sí
- tener un objetivo técnico claro
- poder revisarse de forma independiente

En general, no suele ser necesario para:

- cambios triviales de formato
- ajustes menores de documentación sin impacto técnico
- cambios automáticos sin decisión técnica relevante

Si hay duda sobre si el cambio es trivial, abrir PR.

### 2.2 Título del PR

El título del PR debe seguir la misma convención definida para commits.

Formato:

```text
<type>(<scope>): descripción breve y clara en español
```

Ejemplo válido:

```text
feat(requests): incorporar flujo de carga de documentos
```

Reglas:

- el título debe representar el objetivo principal del PR
- si el PR incluye varios commits, el título debe reflejar el resultado final
- evitar títulos genéricos, temporales o de estado de trabajo
- no usar prefijos como `WIP`, `draft` o equivalentes en el título
- mantener coherencia entre título del PR y mensaje final de merge por squash

### Ejemplos inválidos

```text
ajustes varios
update branch
cambios pendientes
WIP: flujo de autenticación
draft: nueva tabla de documentos
pruebas de refactor
fix(api): mejoras
```

### 2.3 Descripción del PR (obligatoria)

La descripción del PR es obligatoria.
Debe aportar contexto que no sea evidente en el diff.

Template recomendado:

```md
## Qué

Qué cambia y cuál es el objetivo del PR.

## Cambios principales

- Cambio 1
- Cambio 2

## Fuera de alcance

Qué NO incluye este PR.

## Notas

Riesgos, decisiones técnicas, limitaciones o deuda técnica.
```

Reglas:

- redactar todo el contenido en español técnico claro
- enfocar la descripción en intención, impacto y decisiones relevantes
- evitar listar archivos o cambios triviales sin contexto
- usar “Fuera de alcance” para delimitar explícitamente qué no se resuelve aquí
- documentar deuda técnica o riesgos relevantes en “Notas”
- mantener “Cambios principales” acotado (idealmente 3-5 bullets)

### Ejemplo inválido

```md
## Qué

Se hicieron varios ajustes.

## Cambios principales

- cambios en auth
- cambios en api
```

Este ejemplo es inválido porque no define objetivo, no delimita alcance y no comunica impacto técnico.

### 2.4 Tamaño del PR

Como referencia general, se recomienda que un PR no supere **400 líneas modificadas** (`added + removed`).

Este valor no es una regla rígida:
el criterio principal es que el PR pueda revisarse con claridad y bajo riesgo.

Si el PR supera ese tamaño, se debe:

- dividir por corte vertical (`vertical slice`)
- dividir por responsabilidad técnica
- o justificar explícitamente en la descripción por qué no se dividió

Si no se divide, la justificación debe incluir: motivo, riesgo y plan de revisión recomendado.

Reglas adicionales:

- evitar PRs que mezclen features, fixes y refactors no relacionados
- priorizar PRs pequeños y revisables sobre PRs extensos y difíciles de validar
- evaluar tamaño por complejidad e impacto, no solo por número de líneas

### Señales de que debe dividirse

- cuesta explicar el objetivo en una sola frase
- incluye cambios en múltiples dominios sin relación directa
- requiere revisores distintos para partes independientes
- mezcla cambios funcionales con limpieza técnica no esencial

### 2.5 Reglas de merge

Todo merge debe realizarse mediante **merge por squash**.

Reglas:

- el mensaje final del merge debe cumplir completamente la convención de commits
- el PR debe estar en estado estable y revisable antes de mergear
- resolver observaciones relevantes antes del merge
- si una observación relevante no se implementa, la decisión debe quedar justificada explícitamente en la conversación del PR
- antes de mergear, deben estar en verde las validaciones automáticas requeridas por el repositorio
- el historial final debe reflejar cambios coherentes y mantenibles

No mergear PRs con:

- código comentado sin justificación
- `TODO` o `FIXME` sin contexto suficiente
- código experimental no utilizado
- logs de depuración o artefactos temporales

### Verificación mínima antes de mergear

- el objetivo del PR está claramente descrito
- el alcance está delimitado y consistente con el diff
- los riesgos o limitaciones relevantes están documentados
- el título final de squash representa el resultado principal

### 2.6 Qué evitar en un PR

Evitar PRs que:

- mezclen cambios no relacionados en una sola entrega
- no definan claramente objetivo, alcance o resultado esperado
- usen títulos genéricos o temporales
- omitan contexto técnico relevante en la descripción
- incluyan deuda técnica, riesgos o decisiones importantes sin documentarlas
- lleguen a merge sin responder observaciones relevantes
- se apoyen en “se entiende en el diff” como única explicación

### Señales de que el PR está mal definido

- no puede resumirse en una sola frase clara
- el título no representa el resultado principal
- la sección “Fuera de alcance” está ausente en cambios complejos
- el review requiere reconstruir intención desde archivos en vez de desde la descripción
- diferentes partes del PR podrían revisarse y mergearse por separado

Si se detecta una o más señales, revisar alcance, título y descripción antes de solicitar merge.

---

## 3. Relación con la arquitectura

Cada PR debe mantener una responsabilidad técnica clara.

Reglas:

- evitar mezclar dominios, capas o decisiones no relacionadas
- si un cambio afecta varias capas, justificarlo explícitamente en la descripción
- documentar en “Notas” las decisiones arquitectónicas relevantes
- evitar introducir múltiples decisiones arquitectónicas independientes en un mismo PR

---

## 4. Alcance de esta guía

Esta guía define convenciones de colaboración para commits y pull requests.

Su objetivo es mejorar claridad, trazabilidad y mantenibilidad del historial del repositorio.

No reemplaza documentación de arquitectura, producto o decisiones técnicas de largo plazo.
