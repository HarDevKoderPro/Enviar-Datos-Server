"use strict";

//Libreria de funciones
export class Libreria {
  // ----------------------------------------------------------------------------------
  // Validar Inputs Vacíos
  // ----------------------------------------------------------------------------------
  static hayInputsVacios() {
    const inputsArr = document.querySelectorAll("input");
    return [...inputsArr].some((input) => input.value === "");
  }

  // ----------------------------------------------------------------------------------
  // Borrar Inputs
  // ----------------------------------------------------------------------------------
  static borrarInputs() {
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
  }

  // ----------------------------------------------------------------------------------
  // Sweet Alerts
  // ----------------------------------------------------------------------------------
  static sweetAlert(tipo, message, fontSize) {
    // variables a ser modificadas
    let icon, background, iconColor, color;
    // Asigno estilos de acuerdo al tipo de alerta
    if (tipo === "exito") {
      icon = "success";
      background = "#ABEBC6";
      iconColor = "green";
      color = "green";
    } else if (tipo === "error") {
      icon = "error";
      background = "#E6B0AA";
      iconColor = "red";
      color = "red";
    }
    // Cuerpo general del mensaje
    Swal.fire({
      position: "center",
      width: "250px",
      heightAuto: false,
      showConfirmButton: false,
      background: background,
      icon: icon,
      iconColor: iconColor,
      color: color,
      timer: 1300,
      // Personaliza el tamaño del mensaje
      html: `<div style="font-size: ${fontSize}; text-align: center; font-weight:bold">${message}</div>`,
    });
  }

  // ----------------------------------------------------------------------------------
  // Obtener Datos de Inputs
  // ----------------------------------------------------------------------------------
  static obtenerDatosInputs(...ids) {
    let datosUsuario = {};

    ids.forEach((id) => {
      const input = document.getElementById(id);
      if (input) {
        const clave = id.split("input")[1].toLowerCase(); // Obtener la segunda palabra del id
        datosUsuario[clave] = input.value; // Asignar valor al objeto
      }
    });

    return datosUsuario;
  }

  // ----------------------------------------------------------------------------------
  // Envío de Datos para Consultas
  // ----------------------------------------------------------------------------------
  static enviarDatosServer(datosAEnviar, rutaPhp, callback) {
    // Envio de datos Js a variables PHP con fetch
    // Ruta con respecto al archivo html que se este utilizando
    // El callback regresa la respuesta del server para ejecutar acciones
    fetch(rutaPhp, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosAEnviar),
    })
      // Respuesta desde archivo PHP (mensaje)
      .then((response) => response.json())
      .then((data) => {
        // Respuesta en consola para pruebas (opcional)
        console.log("Respuesta PHP: ", data);
        // Ejecutar el callback con los datos recibidos
        callback(data);
      })

      // Captura de errores
      .catch((error) => console.error("Error:", error));
  }
}
