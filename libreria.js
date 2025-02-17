"use strict";
// ----------------------------------------------------------------------------------
// Libreria de funciones
// ----------------------------------------------------------------------------------

export class Libreria {
  // ----------------------------------------------------------------------------------
  // Generar Formulario
  // ----------------------------------------------------------------------------------
  static crearFormularioLogin() {
    // Crear el div principal del formulario
    const formulario = document.createElement("div");
    formulario.className = "formulario";

    // Crear el título
    const titulo = document.createElement("div");
    titulo.className = "titulo";
    titulo.textContent = "Login Usuario";

    // Crear input de email
    const inputEmail = document.createElement("input");
    inputEmail.type = "email";
    inputEmail.id = "inputEmail";
    inputEmail.placeholder = "Ingresa Email...";

    // Crear input de contraseña
    const inputPass = document.createElement("input");
    inputPass.type = "password";
    inputPass.id = "inputPass";
    inputPass.placeholder = "Ingresa Contraseña...";

    // Crear botón de enviar
    const btnEnviar = document.createElement("button");
    btnEnviar.id = "btnEnviar";
    btnEnviar.textContent = "Enviar";

    // Crear span de respuesta
    const spanRespuesta = document.createElement("span");
    spanRespuesta.className = "spanRespuesta";
    spanRespuesta.id = "spanRespuesta";
    spanRespuesta.textContent = "Respuesta del servidor...";

    // Agregar elementos al formulario
    formulario.appendChild(titulo);
    formulario.appendChild(inputEmail);
    formulario.appendChild(inputPass);
    formulario.appendChild(btnEnviar);

    // Agregar formulario y span al documento
    document.body.appendChild(formulario);
    document.body.appendChild(spanRespuesta);

    // Estilos para el formulario
    const formStyles = {
      maxWidth: "200px",
      marginTop: "20px",
      marginLeft: "20px",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      border: "1px solid gray",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    };

    // Agrego estilos al Formulario
    Object.assign(formulario.style, formStyles);

    // Estilos para el título
    const titleStyles = {
      fontSize: "24px",
      marginBottom: "20px",
      color: "#333",
    };

    // Agrego estilos al Título
    Object.assign(titulo.style, titleStyles);

    // Estilos normales para los inputs
    const inputStyles = {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid gray",
      borderRadius: "4px",
      boxSizing: "border-box",
    };

    Object.assign(inputEmail.style, inputStyles);
    Object.assign(inputPass.style, inputStyles);

    // Creo efecto focus para los inputs
    const inputFocusStyle = () => ({
      outline: "none",
      borderColor: "blue",
      boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)", // Sombra azul
    });

    //Agrego efecto focus a input Email
    inputEmail.addEventListener("focus", () =>
      Object.assign(inputEmail.style, inputFocusStyle())
    );

    //Agrego efecto focus a input Pass
    inputPass.addEventListener("focus", () =>
      Object.assign(inputPass.style, inputFocusStyle())
    );

    // Estilos originales al perder el foco
    inputEmail.addEventListener("blur", () =>
      Object.assign(inputEmail.style, inputStyles)
    );

    inputPass.addEventListener("blur", () =>
      Object.assign(inputPass.style, inputStyles)
    );

    // Estilos para el botón
    const buttonStyles = {
      width: "100%",
      padding: "12px",
      backgroundColor: "#4CAF50", // Verde base más claro
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
    };

    // Agrego los estilos al botón
    Object.assign(btnEnviar.style, buttonStyles);

    // Agregar hover effect al botón
    btnEnviar.onmouseover = () => (btnEnviar.style.backgroundColor = "#367c39"); // Verde más oscuro para hover
    btnEnviar.onmouseout = () => (btnEnviar.style.backgroundColor = "#4CAF50"); // Volver al verde base

    // Estilos para el span de respuesta
    const spanStyles = {
      display: "block",
      marginLeft: "20px",
      marginTop: "15px",
      color: "#666",
    };

    // Agrego estilos al span de la respuesta
    Object.assign(spanRespuesta.style, spanStyles);

    return {
      formulario,
      email: inputEmail,
      password: inputPass,
      boton: btnEnviar,
      respuesta: spanRespuesta,
    };
  }

  // ----------------------------------------------------------------------------------
  // Obtener datos de los inputs usando referencias
  // ----------------------------------------------------------------------------------
  static obtenerDatosInputs(referencias) {
    let datosUsuario = {};

    // Extraer valores directamente de las referencias
    if (referencias.email) {
      datosUsuario.email = referencias.email.value;
    }
    if (referencias.password) {
      datosUsuario.password = referencias.password.value;
    }

    return datosUsuario;
  }

  // ----------------------------------------------------------------------------------
  // Envío de datos para consultas con actualización del span de respuesta
  // ----------------------------------------------------------------------------------
  static enviarDatosParaConsultas(datosAEnviar, rutaPhp, referencias) {
    fetch(rutaPhp, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosAEnviar),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta PHP: ", data);
        // Actualizar el span de respuesta
        if (referencias.respuesta) {
          referencias.respuesta.textContent =
            data.mensaje || JSON.stringify(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        if (referencias.respuesta) {
          referencias.respuesta.textContent =
            "Error en la comunicación con el servidor";
        }
      });
  }
  // ----------------------------------------------------------------------------------
}
