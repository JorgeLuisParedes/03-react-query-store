# Guía de Comentarios de Código

Esta guía explica **cuándo comentar y cuándo no comentar el código**.

Su propósito es mejorar la claridad y mantenibilidad del código,
**sin sobrecargarlo con comentarios que no aportan contexto útil**.

Referencias base:

- Google TypeScript Style Guide (sección de comentarios)
- JSDoc como formato de documentación cuando realmente aporta valor

---

## Contenido

1. Principio rector
2. Idioma de los comentarios
3. JSDoc: documentación de contratos y contexto
4. Comentarios inline: implementación y decisiones
5. Encabezados de archivo
6. Estructuras de datos y constantes
7. TODO y FIXME
8. Qué se debe evitar
9. Los comentarios deben envejecer bien
10. Guía práctica para decidir si comentar
11. Regla final

---

## 1. Principio rector

> **Los comentarios deben reducir el esfuerzo necesario para comprender, utilizar o mantener el código.**

El código debe expresar con claridad su implementación inmediata.
Los comentarios deben preservar propósito, responsabilidad, contratos,
decisiones o contexto que un lector tendría que reconstruir leyendo una porción mayor del sistema.

Que una implementación sea legible no implica que su función dentro del sistema
esté suficientemente documentada.

No considerar redundante un comentario únicamente porque su contenido pueda inferirse
después de analizar toda la implementación. Evaluar si permite a otro programador,
al consumidor del símbolo o al autor futuro comprender el código con menos esfuerzo.

### Dos niveles de documentación

- **Documentación de abstracción:** resume propósito, responsabilidad, contrato o relación con el sistema. Puede aportar valor aunque la implementación sea clara.
- **Narración mecánica:** repite instrucciones, sintaxis o tipos evidentes. Debe evitarse.

### Ejemplo útil

```ts
// Validación duplicada en servidor para evitar manipulación desde el cliente.
if (!user.permissions.includes('admin')) {
	throw new ForbiddenError();
}
```

El comentario explica **por qué** existe la validación.

### Ejemplo útil de abstracción

```ts
/**
 * Construye el catálogo visible aplicando las reglas de disponibilidad
 * antes de exponer los productos a la interfaz.
 */
function buildVisibleCatalog(products: Product[]) {
	// ...
}
```

La implementación podría ser sencilla, pero el comentario permite comprender
la responsabilidad de la función sin reconstruir primero todas sus operaciones internas.

### Ejemplo redundante

```ts
// Verifica si el usuario es admin
if (!user.permissions.includes('admin')) {
	throw new ForbiddenError();
}
```

El código ya deja claro qué está haciendo.
El comentario no aporta contexto adicional.

---

## 2. Idioma de los comentarios

Los comentarios deben escribirse en un único idioma de forma consistente.

El idioma definido para esta guía es **español**.

Evitar mezclar idiomas dentro del mismo comentario:

```ts
// Validar uploaded files antes de guardar
```

Correcto:

```ts
// Validar archivos subidos antes de guardar
```

Los nombres técnicos ampliamente aceptados (`fetch`, `hook`, `storage`, etc.)
pueden mantenerse en inglés cuando formen parte natural del contexto técnico.

---

## 3. JSDoc (`/** ... */`): documentación de contratos y contexto

Usar JSDoc cuando ayude a comprender el propósito, la responsabilidad, el contrato,
las restricciones o el comportamiento relevante de un símbolo.

JSDoc no es obligatorio por el simple hecho de que una función sea exportada.
Sin embargo, toda función, hook, servicio, componente o utilidad relevante debe evaluarse
para determinar si una descripción breve ahorraría al consumidor leer la implementación completa.

Un nombre y una firma pueden explicar cómo invocar un símbolo sin explicar completamente
por qué existe, qué garantiza o qué papel cumple dentro del flujo general.

Casos donde suele aportar valor:

- lógica de dominio o casos de uso
- servicios (`auth`, `storage`, `email`, etc.)
- hooks complejos
- utilidades reutilizadas en varios módulos
- funciones con reglas de negocio, restricciones o efectos secundarios importantes
- funciones exportadas cuyo propósito no quede completamente expresado por nombre y tipos
- coordinadores que conectan varias operaciones o módulos
- símbolos cuyo uso correcto depende de precondiciones, invariantes o garantías

### Cuándo evitar JSDoc

Evitar JSDoc cuando el código ya es suficientemente claro por sí mismo
y no existe información adicional relevante para documentar.

Casos comunes donde no suele aportar valor:

- componentes UI simples
- exports técnicos de frameworks (`page.tsx`, `layout.tsx`, etc.)
- helpers triviales o autoexplicativos
- wrappers pequeños sin lógica relevante
- funciones privadas con contexto evidente dentro del mismo módulo

No evitar JSDoc únicamente porque el agente pudo comprender el símbolo después de leer
toda su implementación. La evaluación debe considerar el tiempo que ahorraría a futuros lectores.

### Ejemplo de JSDoc innecesario

```tsx
/**
 * Componente de botón.
 * Renderiza un botón.
 */
export function Button({ label }: { label: string }) {
	return <button>{label}</button>;
}
```

El comentario repite exactamente lo que el código ya comunica.
No aporta intención, restricciones ni contexto adicional.

### Ejemplo correcto

```tsx
export function Button({ label }: { label: string }) {
	return <button>{label}</button>;
}
```

### Ejemplo de JSDoc útil

```tsx
/**
 * Botón base del sistema de diseño.
 *
 * IMPORTANTE: Este componente NO maneja estados de carga.
 * Para acciones asíncronas, usar <AsyncButton> en su lugar.
 *
 * @see AsyncButton para operaciones con loading
 */
export function Button({ label, onClick }: ButtonProps) {
	return <button onClick={onClick}>{label}</button>;
}
```

Este comentario sí aporta información relevante:

- restricciones de uso
- decisiones de arquitectura
- comportamiento esperado
- referencias relacionadas

También puede usarse JSDoc para documentar relaciones importantes entre módulos mediante tags como `@see`.

### Tags recomendados

Usar tags según contexto, solo cuando aporten información relevante.

Evitar duplicar información que TypeScript ya expresa mediante tipos.

Tags recomendados:

- `@param`
- `@returns`
- `@throws`
- `@see`
- `@deprecated`

Evitar documentación redundante:

```ts
/**
 * @param id - string
 * @returns Promise<User>
 */
```

TypeScript ya expresa esa información mediante tipos.

Preferir documentación con contexto adicional:

```ts
/**
 * @param requestId - Identificador público visible para el usuario.
 * @throws ForbiddenError cuando el usuario no tiene permisos.
 */
```

---

## 4. Comentarios inline (`//`): implementación y decisiones

Usar comentarios inline para explicar decisiones específicas de implementación
que no sean evidentes únicamente leyendo el código.

Suelen aportar valor cuando documentan:

- decisiones técnicas no obvias
- trade-offs
- restricciones de negocio
- compatibilidad legacy
- validaciones de seguridad
- workarounds temporales
- comportamiento condicionado por librerías o frameworks

El comentario debe complementar el código, no narrarlo línea por línea.
Una explicación de alto nivel debe colocarse preferentemente en el símbolo o módulo correspondiente,
en lugar de fragmentarse en comentarios sobre cada instrucción.

### Etiquetas para decisiones de implementación

Usar estas etiquetas cuando aporten contexto real:

- `Decisión:` explica qué enfoque se eligió y por qué.
- `Alternativa:` describe una opción válida no elegida y cuándo reevaluarla o eliminarla.

Reglas de uso:

- escribir etiquetas en español y en formato normal: `Decisión` / `Alternativa`
- mantener comentarios breves y concretos
- no usar `TODO` para documentar alternativas de implementación
- si hay bloque de código comentado como alternativa, usar siempre `Decisión` + `Alternativa`
- si no hay bloque comentado, `Decisión` puede usarse sola si aporta contexto; `Alternativa` sola no se recomienda
- si el bloque comentado no aporta valor técnico claro, eliminarlo

### Ejemplo inline útil

```ts
// SEGURIDAD: La URL firmada se genera en servidor para evitar exponer credenciales de storage.
const signedUrl = await generateSignedUploadUrl();
```

### Ejemplo de decisión con alternativa comentada

```ts
// Decisión: Se mantiene cálculo inline por simplicidad en esta rama del reducer.
// Alternativa: Extraer métricas a variables intermedias si esta lógica se reutiliza en más casos.
// const completedTodos = currentTodos.filter((todo) => todo.completed).length;
// const pendingTodos = currentTodos.length - completedTodos;

return {
	...state,
	todos: currentTodos,
	length: currentTodos.length,
	completed: currentTodos.filter((todo) => todo.completed).length,
	pending: currentTodos.filter((todo) => !todo.completed).length,
};
```

### Ejemplo inline redundante

```ts
// Incrementa el contador
count++;
```

---

## 5. Encabezados de archivo

Los encabezados de archivo son opcionales.

Usarlos solo cuando el archivo represente un módulo relevante dentro del dominio,
un servicio importante o una pieza con responsabilidades no evidentes.

También pueden aportar valor cuando permiten a un lector orientarse rápidamente
sin reconstruir la responsabilidad del archivo a partir de todas sus declaraciones internas.

Suelen aportar valor en:

- módulos de dominio
- servicios principales
- adaptadores de infraestructura
- flujos complejos
- archivos que coordinan varias responsabilidades relacionadas

Evitar encabezados en:

- componentes UI pequeños
- archivos triviales
- páginas o layouts simples
- helpers autoexplicativos

### Encabezado útil

```ts
/**
 * Propósito: Coordina la subida, validación y persistencia
 * de documentos asociados a solicitudes.
 */
```

El encabezado aporta contexto sobre la responsabilidad general del módulo.

### Encabezado innecesario

```tsx
/**
 * Página de login.
 */
export default function LoginPage() {
	return <LoginForm />;
}
```

El archivo ya es suficientemente claro mediante su nombre y estructura.
El encabezado no agrega información relevante.

---

## 6. Estructuras de datos y constantes

Comentar estructuras de datos o constantes solo cuando la intención,
el significado o el criterio de indexación no sean completamente evidentes
mediante los tipos o nombres utilizados.

Los comentarios deben aclarar contexto semántico,
no describir la estructura técnica del dato.

Aunque la estructura sea legible, documentar el criterio de indexación, la procedencia,
el orden significativo o la relación con una restricción externa puede ahorrar contexto futuro.

Suelen requerir contexto adicional cuando:

- el indexado no es evidente
- existen claves con significado de dominio
- hay convenciones implícitas
- el orden de los elementos es importante
- la estructura depende de restricciones externas

### Comentario útil

```ts
// Indexado por estado interno de la solicitud: 'draft', 'sent', 'completed'
const statusLabels: Record<RequestStatus, string> = {
	draft: 'Borrador',
	sent: 'Enviada',
	completed: 'Completada',
};
```

El comentario aporta contexto sobre el criterio de indexación utilizado.

### Comentario redundante

```ts
// Lista de usuarios
const users: User[] = [];
```

La estructura y el nombre ya explican claramente el propósito del dato.

---

## 7. TODO y FIXME

Los comentarios `TODO` y `FIXME` deben usarse únicamente
para señalar trabajo pendiente real o limitaciones conocidas.

Deben ser claros, accionables y explicar por qué el cambio es importante.

Reglas:

- escribir siempre en español
- usar etiquetas en mayúsculas al inicio del comentario: `TODO:` y `FIXME:`
- redactar el contenido del comentario en escritura normal
- indicar qué falta
- explicar el impacto, riesgo o motivo
- evitar comentarios ambiguos o genéricos
- `TODO` solo aplica a trabajo pendiente real (implementaciones futuras, mejoras concretas o tareas faltantes)
- no usar `TODO` para documentar alternativas técnicas o código comentado de referencia
- para decisiones de implementación y variantes, usar `Decisión:` y `Alternativa:` (ver sección 4)

### TODO útil

```ts
// TODO: Manejar expiración de URLs firmadas para evitar subidas fallidas.
```

El comentario deja claro:

- qué falta
- por qué es importante resolverlo

### TODO ambiguo

```ts
// TODO: mejorar esto
```

El comentario no explica qué debe hacerse ni cuál es el problema actual.

### Diferencia entre `TODO` y `FIXME`

- `TODO`: trabajo pendiente, mejora o implementación futura.
- `FIXME`: problema conocido que debe corregirse porque el comportamiento actual es incorrecto, frágil o temporal.

```ts
// TODO: Soportar paginación en respuestas grandes.

// FIXME: Este parser falla con fechas en UTC.
```

Si existe un bug actual o comportamiento incorrecto, priorizar `FIXME` sobre `TODO`.

Los comentarios `TODO` y `FIXME` deben revisarse periódicamente.
Si dejan de ser relevantes, deben actualizarse o eliminarse.

---

## 8. Qué se debe evitar

Evitar comentarios que:

- repitan literalmente lo que una instrucción, nombre o tipo ya comunica sin aportar una síntesis útil
- narren el flujo línea por línea
- describan sintaxis o detalles evidentes
- documenten tipos que TypeScript ya expresa
- oculten nombres poco claros o diseño confuso
- mantengan bloques de código comentado sin una justificación clara
- mezclen información no relacionada con documentación técnica
- puedan quedar obsoletos fácilmente con cambios menores

No eliminar un comentario solo porque el agente pueda deducir su contenido leyendo el código completo.
Conservarlo o mejorarlo cuando resuma propósito, responsabilidad, contrato o contexto y reduzca
el esfuerzo de comprensión de un lector futuro.

Eliminar un comentario únicamente cuando se confirme que es incorrecto, obsoleto, ambiguo,
engañoso, puramente mecánico o código desactivado sin una justificación vigente.

Excepción controlada:
Se permite mantener bloques de código comentado únicamente cuando representan una alternativa técnica válida y vigente.
En esos casos, el bloque debe estar justificado con `Decisión:` y `Alternativa:` (ver sección 4), e incluir una condición clara para su reevaluación o eliminación.
Si no se cumple esta condición, el bloque comentado debe eliminarse.

### Ejemplos a evitar

```ts
// Obtiene usuarios
const users = await getUsers();
```

```ts
// Array de strings
const tags: string[] = [];
```

```ts
// TODO: Revisar esto
```

```ts
// Código deshabilitado temporalmente
// const result = oldImplementation();
```

Todos los ejemplos anteriores generan ruido,
duplican información evidente o pierden utilidad con el tiempo.

---

## 9. Los comentarios deben envejecer bien

Los comentarios deben mantenerse útiles y correctos a lo largo del tiempo.

Evitar comentarios demasiado específicos sobre el flujo exacto del código,
el orden de ejecución o detalles que puedan cambiar fácilmente durante un refactor.

Preferir comentarios que expliquen intención, contexto o decisiones de diseño,
ya que suelen mantenerse válidos incluso cuando la implementación evoluciona.

Las descripciones de responsabilidad y contrato también pueden envejecer bien
cuando se redactan en el nivel de abstracción del símbolo y no dependen de sus pasos internos.

Si un comentario queda obsoleto tras un cambio,
**debe actualizarse o eliminarse**.

### Comentario que envejece bien

```ts
// Validación en servidor para garantizar consistencia del flujo.
```

El comentario explica intención y sigue siendo válido
aunque la implementación interna cambie.

### Comentario frágil

```ts
// Este bloque debe ejecutarse antes de loadUserSession()
```

El comentario depende de un orden específico de implementación
que puede cambiar fácilmente durante un refactor.

---

## 10. Guía práctica para decidir si comentar

> Esta sección no define reglas nuevas.
> Su objetivo es ayudar a aplicar correctamente los criterios anteriores.

Antes de escribir un comentario, pregúntate:

1. **¿El comentario reduciría el esfuerzo para comprender el propósito, contrato o contexto del símbolo?**
   No: evaluar si existe otra información relevante antes de descartarlo.
   Sí: agregarlo, conservarlo o actualizarlo.

2. **¿El comentario evita errores, malentendidos o mal uso del código?**
   No: continuar evaluando si aporta propósito, responsabilidad, contrato o contexto de mantenimiento.
   Sí: mantener.

3. **¿Explica una decisión, restricción o contexto no evidente?**
   No: probablemente es redundante.
   Sí: mantener.

4. **¿Esto es trabajo pendiente real o una alternativa técnica?**
   Si es trabajo pendiente real: usar `TODO` (o `FIXME` si hay comportamiento incorrecto actual).
   Si es una elección de implementación con opción descartada: usar `Decisión` y `Alternativa` (sección 4), no `TODO`.

5. **¿Solo parece innecesario porque ya se leyó toda la implementación?**
   Sí: volver a evaluarlo desde la perspectiva de un consumidor del símbolo o de un lector futuro.
   No: aplicar los criterios anteriores.

6. **¿Se está considerando eliminar un comentario existente?**
   Eliminarlo solo con una causa concreta: incorrección, obsolescencia, ambigüedad,
   engaño, repetición mecánica o ausencia de una justificación vigente.

---

## 11. Regla final

> No documentar cada línea; documentar cada responsabilidad, contrato, decisión o contexto cuyo conocimiento merezca conservarse.
