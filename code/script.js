// ================================================================
// 📄 SISTEMA DE REPETICIÓN ESPACIADA PARA GOOGLE SHEETS
// ================================================================
// Este script crea un sistema para ayudarte a estudiar de forma eficiente.
// Utilizando emojis para valorar tu nivel de confianza, el sistema calcula
// automáticamente cuándo deberías repasar cada tema.
// ================================================================

// Esta función se ejecuta automáticamente cuando se abre la hoja de cálculo.
// Crea un menú personalizado en la barra superior de Google Sheets.
function onOpen() {
  // Obtenemos acceso a la interfaz de usuario de Google Sheets
  const ui = SpreadsheetApp.getUi();
  
  // Creamos un nuevo menú llamado "⚡ Repetición Espaciada"
  // .createMenu() inicia la creación del menú y le da un nombre
  ui.createMenu("⚡ Repetición Espaciada")
    // .addItem() añade un elemento al menú: primero el texto visible, y luego el nombre de la función a ejecutar
    .addItem("🛠️ Crear columnas", "crearColumnas")
    // .addToUi() finaliza la creación del menú y lo añade a la interfaz
    .addToUi();
}

// Esta función configura las columnas necesarias para el sistema.
// Se ejecuta cuando el usuario hace clic en "🛠️ Crear columnas" en el menú.
function crearColumnas() {
  // Obtenemos la hoja activa (la que está actualmente visible)
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Definimos los títulos de las columnas que queremos crear
  const cabeceras = ["Tema", "Estudiado ✅", "Nivel de confianza", "Fecha de estudio", "Fecha próximo repaso"];
  
  // Escribimos las cabeceras en la primera fila
  // getRange(fila, columna, núm_filas, núm_columnas) selecciona un rango de celdas
  // setValues() establece los valores para ese rango (tiene que ser un array bidimensional, por eso usamos [cabeceras])
  hoja.getRange(1, 1, 1, cabeceras.length).setValues([cabeceras]);
  
  // Damos formato a las cabeceras para que se vean mejor
  // Seleccionamos el mismo rango que antes y aplicamos varios formatos
  hoja.getRange(1, 1, 1, cabeceras.length)
    .setBackground("#4285f4")    // Color de fondo azul de Google
    .setFontColor("white")       // Texto en color blanco
    .setFontWeight("bold");      // Texto en negrita
  
  // Limpiamos cualquier validación previa que pudiera existir
  // para evitar conflictos con las nuevas validaciones
  hoja.getRange("B2:B").clearDataValidations();  // Columna "Estudiado ✅" desde la fila 2
  hoja.getRange("C2:C").clearDataValidations();  // Columna "Nivel de confianza" desde la fila 2
  
  // Establecemos el formato de fecha para las columnas de fechas
  // Esto hace que las fechas se muestren de forma legible
  hoja.getRange("D2:D").setNumberFormat("dd/mm/yyyy hh:mm");  // Formato con día, mes, año, hora y minutos
  hoja.getRange("E2:E").setNumberFormat("dd/mm/yyyy");        // Formato solo con día, mes y año
  
  // Creamos la lista desplegable para los emojis de nivel de confianza
  // Definimos los emojis que se podrán seleccionar
  const niveles = ["😎", "😊", "😐", "😕", "😫"];
  
  // Creamos una nueva validación que requiere que el valor esté en la lista
  const valEmojis = SpreadsheetApp.newDataValidation()
    .requireValueInList(niveles, true)  // Los valores deben estar en la lista de niveles, 'true' muestra desplegable
    .setAllowInvalid(false)             // No permite valores que no estén en la lista
    .build();                           // Construye la validación
  
  // Aplicamos esta validación a la columna "Nivel de confianza" (C) desde la fila 2
  hoja.getRange("C2:C").setDataValidation(valEmojis);
  
  // Creamos casillas de verificación para la columna "Estudiado ✅"
  hoja.getRange("B2:B").insertCheckboxes();
}

// Esta función se ejecuta automáticamente cada vez que alguien edita la hoja
// Recibe un parámetro 'e' que contiene información sobre lo que se ha editado
function onEdit(e) {
  // Obtenemos la hoja donde se hizo la edición
  const hoja = e.source.getActiveSheet();
  
  // Obtenemos la fila y columna donde ocurrió la edición
  const fila = e.range.getRow();
  const col = e.range.getColumn();
  
  // Ignoramos ediciones en la fila de cabeceras (fila 1)
  if (fila <= 1) return;  // 'return' hace que la función termine aquí si la condición es verdadera
  
  // CASO 1: Si se marca "Estudiado ✅" (columna 2) como verdadero
  if (col === 2 && e.range.getValue() === true) {
    // Creamos una nueva fecha con la fecha y hora actual
    const fechaAhora = new Date();
    
    // Establecemos esta fecha en la columna "Fecha de estudio" (columna 4)
    hoja.getRange(fila, 4).setValue(fechaAhora);
    
    // Actualizamos la fecha del próximo repaso basándonos en el nivel de confianza
    actualizarFechaRepaso(hoja, fila);
  }
  
  // CASO 2: Si se edita el "Nivel de confianza" (columna 3)
  if (col === 3) {
    // Comprobamos si ya hay una fecha de estudio
    const fechaEstudio = hoja.getRange(fila, 4).getValue();
    
    // Si no hay fecha de estudio, ponemos la fecha actual
    if (!(fechaEstudio instanceof Date)) {  // Comprobamos si NO es una fecha
      const fechaAhora = new Date();
      hoja.getRange(fila, 4).setValue(fechaAhora);
      
      // También marcamos como estudiado
      hoja.getRange(fila, 2).setValue(true);
    }
    
    // Actualizamos la fecha del próximo repaso
    actualizarFechaRepaso(hoja, fila);
  }
  
  // CASO 3: Si se edita directamente la "Fecha de estudio" (columna 4)
  if (col === 4) {
    // Obtenemos la fecha que ha puesto el usuario
    const fechaEstudio = e.range.getValue();
    
    // Si es una fecha válida, actualizamos el próximo repaso
    if (fechaEstudio instanceof Date) {  // Comprobamos si es una fecha
      // Marcamos como estudiado si no lo estaba ya
      const estudiado = hoja.getRange(fila, 2).getValue();
      if (!estudiado) {  // Si NO está estudiado
        hoja.getRange(fila, 2).setValue(true);
      }
      
      // Actualizamos la fecha del próximo repaso
      actualizarFechaRepaso(hoja, fila);
    }
  }
  
  // CASO 4: Si se edita la "Fecha próximo repaso" (columna 5)
  // No hacemos nada especial, permitimos la edición manual
  
  // Finalmente, actualizamos los colores y el orden de las filas
  colorearYOrdenar(hoja);
}

// Esta función calcula la fecha del próximo repaso según el nivel de confianza
function actualizarFechaRepaso(hoja, fila) {
  // Obtenemos la fecha de estudio de la columna 4
  const fechaEstudio = hoja.getRange(fila, 4).getValue();
  
  // Obtenemos la celda del nivel de confianza (columna 3)
  const nivelCelda = hoja.getRange(fila, 3);
  
  // Obtenemos el valor (emoji) de esa celda
  const nivel = nivelCelda.getValue();
  
  // Obtenemos la celda donde pondremos la fecha del próximo repaso (columna 5)
  const celdaRepaso = hoja.getRange(fila, 5);
  
  // Solo continuamos si tenemos una fecha válida y un nivel de confianza
  if (fechaEstudio instanceof Date && nivel) {
    // Valor predeterminado: 1 día
    let dias = 1;
    
    // Según el emoji seleccionado, asignamos diferentes intervalos de días
    if (nivel === "😎") {
      dias = 7;  // Muy fácil: repasar en 7 días
    } else if (nivel === "😊") {
      dias = 3;  // Fácil: repasar en 3 días
    } else if (nivel === "😐") {
      dias = 2;  // Regular: repasar en 2 días
    } else if (nivel === "😕" || nivel === "😫") {
      dias = 1;  // Difícil o muy difícil: repasar mañana
    } else {
      // Si el emoji no coincide con ninguno de los anteriores, usamos 1 día por defecto
      dias = 1;
      // Podemos registrar qué emoji no reconocido se usó (útil para depuración)
      console.log("Emoji no reconocido: " + nivel);
    }
    
    // Creamos una nueva fecha para el próximo repaso basada en la fecha de estudio
    const fechaRepaso = new Date(fechaEstudio);
    
    // Añadimos el número de días calculado
    fechaRepaso.setDate(fechaEstudio.getDate() + dias);
    
    // Establecemos esta nueva fecha en la celda de próximo repaso
    celdaRepaso.setValue(fechaRepaso);
  }
}

// Esta función colorea las celdas y ordena las filas según la urgencia
function colorearYOrdenar(hoja) {
  // Obtenemos el número de la última fila con datos
  const ultimaFila = hoja.getLastRow();
  
  // Si no hay datos (solo la fila de cabeceras), no hacemos nada
  if (ultimaFila <= 1) return;
  
  // PARTE 1: Colorear las celdas de fecha de próximo repaso
  for (let i = 2; i <= ultimaFila; i++) {
    // Obtenemos la celda de la fecha de próximo repaso (columna 5)
    const celda = hoja.getRange(i, 5);
    
    // Obtenemos el valor de esa celda
    const valor = celda.getValue();
    
    // Si el valor es una fecha válida
    if (valor instanceof Date) {
      // Creamos una fecha para "hoy" a las 00:00:00
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);  // Establecemos hora, minutos, segundos y milisegundos a 0
      
      // Creamos una copia de la fecha de repaso también a las 00:00:00
      // (para comparar solo las fechas, sin la hora)
      const fecha = new Date(valor);
      fecha.setHours(0, 0, 0, 0);
      
      // Si la fecha de repaso es hoy o antes (atrasada), la coloreamos de rojo
      // De lo contrario, la dejamos en blanco
      const color = fecha <= hoy ? "#f28b82" : "white";
      celda.setBackground(color);
    }
  }
  
  // PARTE 2: Ordenar las filas por fecha de próximo repaso
  // Solo ordenamos si hay más de una fila de datos
  if (ultimaFila > 2) {
    // Seleccionamos todas las filas de datos (desde la fila 2 hasta la última)
    // y todas las columnas (de la 1 a la 5)
    hoja.getRange(2, 1, ultimaFila - 1, 5)
      // Ordenamos por la columna 5 (fecha de próximo repaso) en orden ascendente
      // (las fechas más cercanas/antiguas aparecerán primero)
      .sort({ column: 5, ascending: true });
  }
}
