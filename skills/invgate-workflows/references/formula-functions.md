# InvGate Workflows - Formula Functions Reference

This reference documents the functions available in InvGate Service Management workflow formula nodes (`type: 3`, `config.type: 303`, `action.type: 10`).

## Execution & Variable Mechanics

- Expressions live in `params.expression`.
- Variables are interpolated with `{{variableId}}` (always use the 8-character ID or system variable ID).
- Output is written to `params.resultVariable`; `params.overwriteVariable` controls whether an existing value is overwritten.
- Supported operators observed in expressions: arithmetic (`+`, `-`, `*`, `/`), comparison (`==`, `!=`, `>`, `<`, `>=`, `<=`), and logical (`&&`, `||`).

---

## 1. Numeric & Math Functions

| Function | Description |
|---|---|
| `SUM` | Suma todos los valores numéricos proporcionados. |
| `MULTIPLY` | Multiplica todos los valores numéricos proporcionados. |
| `AVERAGE` | Calcula el promedio de los valores numéricos proporcionados. |
| `ROUND` | Redondea un valor numérico al entero más cercano. |
| `SUM_KEYS` | Suma las claves numéricas de las opciones seleccionadas en un campo de tipo lista o árbol. |

---

## 2. Text & Regex Functions

| Function | Description |
|---|---|
| `CONCAT` | Concatena múltiples valores en un solo texto (e.g. `CONCAT("PREFIX ", {{var1}}, " ", {{var2}})`). |
| `JOIN` | Une una lista de valores usando un separador. |
| `TO_STRING` | Convierte un valor a texto. |
| `SPLIT` | Divide un texto según un delimitador específico. |
| `TRIM` | Elimina los espacios en blanco al inicio y al final de un texto. |
| `REGEXEXTRACT` | Extrae la primera subcadena del texto que coincide con una expresión regular. |
| `REGEXEXTRACT_ALL` | Extrae todas las coincidencias de una expresión regular en el texto y las devuelve como una lista. |
| `SUBSTITUTE` | Reemplaza todas las ocurrencias de un texto por otro. |

---

## 3. Date & Time Functions

| Function | Description | Supported Units / Notes |
|---|---|---|
| `TimeDifference` | Calcula la diferencia en segundos entre dos fechas. Si no se provee `fechaInicio`, usa la fecha actual. | Devuelve diferencia en segundos. |
| `NOW` | Devuelve la fecha y hora actual según la zona horaria de la instancia. | Sin argumentos requeridos. |
| `DATE_DIFF` | Calcula la diferencia entre dos fechas en la unidad indicada. | `seconds`, `minutes`, `hours`, `days` |
| `DATE_ADD` | Suma una cantidad de tiempo a una fecha en la unidad indicada. | `seconds`, `minutes`, `hours`, `days`, `weeks`, `months`, `years` |
| `DATE_SUBTRACT` | Resta una cantidad de tiempo a una fecha en la unidad indicada (e.g. `DATE_SUBTRACT({{date}}, 1, "days")`). | `seconds`, `minutes`, `hours`, `days`, `weeks`, `months`, `years` |

---

## 4. Lists, Logic & Utility Functions

| Function | Description | Notes |
|---|---|---|
| `Union` | Une múltiples listas eliminando duplicados. | |
| `Difference` | Devuelve los elementos de la primera lista que no están en las otras listas. | |
| `StripHtml` | Elimina todas las etiquetas HTML de un texto. | Útil para limpiar descripciones enriquecidas o comentarios. |
| `IsEmpty` | Evalúa si una lista está vacía. Retorna `true` si la lista está vacía, `false` en caso contrario. | e.g. `IF(IsEmpty({{var}}), ...)` |
| `IF` | Devuelve un valor u otro según una condición (`IF(cond, a, b)`). | |
| `UNIQUE` | Elimina los valores duplicados de una lista, manteniendo el orden de primera aparición. | La comparación es sensible a mayúsculas y minúsculas. |
