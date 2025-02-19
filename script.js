"use strict";
import { Libreria } from "./libreria.js";

// -------------------------------------------
// REFERENCIAS DEL DOM
// ------------------------------------------
const getEl = (id) => document.getElementById(id);
const inputNombre = getEl("inputNombre");
const inputApellido = getEl("inputApellido");
const inputEdad = getEl("inputEdad");
const btnEnviar = getEl("btnEnviar");

// -------------------------------------------
// PROGRAMA PRINCIPAL
// -------------------------------------------
btnEnviar.addEventListener("click", () => {
  // Verifico que no Falten datos para enviar
  if (Libreria.hayInputsVacios()) {
    Libreria.sweetAlert("error", "Faltan Datos!", "0.8em");
  } else {
    let datosUsuario = Libreria.obtenerDatosInputs(
      "inputNombre",
      "inputApellido",
      "inputEdad"
    );

    console.log(datosUsuario);
    Libreria.enviarDatosServer(datosUsuario, "./enviar.php", (server) => {
      console.log(server);
      Libreria.sweetAlert("exito", server.respuesta, "0.8em");
      Libreria.borrarInputs();
    });
  }
});
