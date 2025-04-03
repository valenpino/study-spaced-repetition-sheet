# 🧠 Repetición Espaciada Automática en Google Sheets

> Aprende a programar herramientas útiles para tu estudio — vengas de donde vengas (sin background tecnológico)

Este es un pequeño proyecto hecho en Google Sheets con Apps Script que te permite automatizar tus repasos mediante valoración con emojis + fechas de estudio. Es una manera práctica de empezar a programar con JavaScript mientras mejoras tu forma de estudiar.

---

## ✨ ¿Qué consigue el usuario con este sistema?

- 📅 📈 Calcular el próximo repaso según el emoji de confianza elegido.
  - "😫" diasParaRepaso = 1;
  - "😐" diasParaRepaso = 2;
  - "😊" diasParaRepaso = 3;
  - "😎" diasParaRepaso = 7;
- 🔴 Ver en rojo los temas que tocan hoy o están atrasados.
- ⬆️ Tener siempre arriba los temas más urgentes (orden automático por prioridad).
- 🙌 Rellenar fácilmente sin fórmulas: solo seleccionas opciones y se hace todo solo.

---

## ⚙️ ¿Cómo lo hace el script por detrás?

- 🧭 Crea un menú personalizado en la barra superior (“⚡ Repetición Espaciada”).
- 🎛️ Usa listas desplegables (`Hoy`/`Ayer` y emojis) con validación de datos.
- 🔄 Detecta cambios en la hoja (`onEdit`) y actualiza las fechas automáticamente.
- 📌 Calcula fechas con `Date()` según el nivel de confianza (emoji).
- 🎨 Aplica colores a las celdas que deben repasarse hoy o antes.
- 🗃️ Ordena todas las filas según urgencia (`.sort()` por fecha).

---
## 📥 ¿Cómo usar este sistema?

1. Crea una nueva hoja de cálculo en Google Sheets desde [sheets.new](https://sheets.new).
2. Ve a `Extensiones > Apps Script` y reemplaza el código que aparece por [`code/script.js`](code/script.js).
3. Guarda el proyecto.
4. Vuelve a la hoja y verás un nuevo menú llamado “⚡ Repetición Espaciada”.
5. Haz clic en `🛠️ Crear columnas` para que el sistema se configure automáticamente.
6. Escribe tus temas y marca la casilla "Estudiado ✅" cuando termines un tema y elige el emoji de confianza
7. El sistema rellenará la fecha de estudio, calculará el próximo repaso y lo marcará en rojo si toca repasarlo hoy.
8.  ¡Ahora es tu turno! Personaliza el sistema como quieras: cambia los emojis, modifica los colores, adapta las categorías… hazlo tuyo. 💡

> Si haces una versión mejorada o diferente, ¡compártela! Me encantará ver qué creas tú con este sistema 🙌

---

## 📸 Vista previa

👉 [Ver hoja de ejemplo (solo lectura)](https://docs.google.com/spreadsheets/d/1sH79VouooTM0GJi_s_t2a2zx7bh_BGh3d8jzvJiOIuc/edit?usp=sharing)

---

## 🛠️ Próximas mejoras

- [ ] Envío automático por email cada mañana con los repasos pendientes.
- [ ] Casilla de “repasado” para actualizar la fecha automáticamente.
- [ ] Estadísticas de progreso (porcentaje completado, temas por repasar).
- [ ] Soporte para niveles personalizados.
- [ ] Traducción al inglés para versión global.

---

## 👥 ¿Para quién es este sistema?

- Para estudiantes que quieren organizar sus repasos sin apps externas.
- Para quienes quieren aprender programación con proyectos útiles.
- Para curiosos que quieren ver cómo automatizar cosas con Google Sheets.

---

## 🎓 ¿Qué puedes aprender si revisas el código?

- Cómo usar JavaScript (Apps Script) para manipular Google Sheets.
- Cómo crear menús personalizados y validaciones.
- Cómo reaccionar a cambios automáticamente (`onEdit`).
- Cómo trabajar con fechas y colores dinámicos en hojas de cálculo.

> 🟢 Este proyecto es ideal para principiantes: no necesitas saber programar para usarlo, y si quieres aprender, el código está comentado paso a paso.

---

## 💡 ¿Tienes ideas para mejorar este sistema?

Puedes:

- Escribirme por Twitter: [@valenpindi](https://x.com/valenpindi)
- O si tienes cuenta de GitHub, ir a la pestaña "Issues" y abrir una sugerencia

👉 No hace falta saber programar, cualquier idea es bienvenida.

---

## 📨 ¿Quieres seguir informado?

Estoy creando más herramientas prácticas como esta.  
Déjame tu email si quieres que te avise cuando publique la siguiente:

👉 [Formulario para estar al tanto](https://forms.gle/gM4tuw2Wi7XfmXL19)

🛡️ Solo para este proyecto. Sin spam.

---
## 📩 Contacto

Twitter: [@valenpindi](https://x.com/valenpindi)

---
