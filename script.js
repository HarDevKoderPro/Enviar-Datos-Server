"use strict";
import { Libreria } from "./libreria.js";

// -----------------------------------------------------------------
// REFERENCIAS DEL DOM
// -----------------------------------------------------------------
// Creo Formulario, lo agrego al DOM y referencio los elementos
const elementosFormulario = Libreria.crearFormularioLogin();

// -----------------------------------------------------------------
// PROGRAMA PRINCIPAL
// -----------------------------------------------------------------
// Acciones al presionar botón de envío de datos
elementosFormulario.boton.addEventListener("click", () => {
  // Obtener datos usando las referencias
  let datosUsuario = Libreria.obtenerDatosInputs(elementosFormulario);

  console.log(datosUsuario);

  // Enviar datos pasando las referencias
  Libreria.enviarDatosParaConsultas(
    datosUsuario,
    "./registrarDatos.php",
    elementosFormulario
  );
});
