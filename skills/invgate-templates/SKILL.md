---
name: invgate-templates
description: >-
  Use this skill when the user asks to generate, design, or create HTML customization templates for InvGate tickets.
---

# InvGate Customization Templates

This skill provides instructions for generating HTML forms and templates tailored for the InvGate ticketing system.
When the user requests a new template or form fields for InvGate, strictly follow these design and structure rules.

## Design Rules

1. **HTML Structure (`<p>`)**: InvGate's editor requires fields and text to be wrapped in paragraph `<p>` tags. Do not use `<div>` or `<label>` wrappers. Every distinct line, title, or field must be enclosed in its own `<p>` or alongside its text inside a `<p>`.

2. **Section Titles**: Titles or main categories must be styled with blue color (`#3498db`) and bold text (`<strong>`).
   ```html
   <p><span style="color:#3498db"><strong>Título de la sección:</strong></span></p>
   ```

3. **Helper Text / Notes**: Explanatory text or notes must be italicized and colored gray.
   ```html
   <span style="color:#7f8c8d"><em>Texto aclaratorio.</em></span>
   ```

4. **Required Fields**: By default, ALL form inputs (`<input>`, `<select>`, `<textarea>`) must include the attribute `required="required"` unless the user explicitly states the field is optional.

## Field Examples

### Textarea
```html
<p><span style="color:#3498db"><strong>Motivo de la Solicitud:</strong></span></p>
<p><span style="color:#2980b9"><textarea cols="40" name="Motivo" required="required" rows="2"></textarea></span></p>
```

### Simple Text Input with Inline Helper
```html
<p>DNI n.&ordm;&nbsp;<input maxlength="8" name="DNI" required="required" size="8" type="text" />&nbsp;<span style="color:#7f8c8d"><em>Sin puntos ni espacios.</em></span></p>
```

### Multiple Select (Dropdown)
```html
<p><span style="color:#3498db"><strong>Sistemas Afectados:</strong></span></p>
<p><select multiple="multiple" name="Sistemas" required="required" size="3">
  <option value="ERP">ERP</option>
  <option value="CRM">CRM</option>
  <option value="Mail">Mail</option>
</select></p>
```

## Workflow

1. Acknowledge the user's request for an InvGate template.
2. Ask for the list of fields they want to include if they haven't provided them.
3. Generate the HTML code applying the exact tags and styles described above.
4. Output the raw HTML code block so the user can easily copy and paste it into InvGate.
