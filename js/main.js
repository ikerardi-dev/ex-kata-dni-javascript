import { procesarDNI } from "./dni.js";

const btnIniciar = document.getElementById("btnIniciar");
const formulario = document.getElementById("formulario");
const btnCalcular = document.getElementById("btnCalcular");
const btnCerrar = document.getElementById("btnCerrar");
const btnCancelar = document.getElementById("btnCancelar");
const loadingOverlay = document.getElementById("loadingOverlay");
const resultado = document.getElementById("resultado");
const overlay = document.getElementById("overlay");
const popupLetra = document.getElementById("popupLetra");
const btnCerrarPopup = document.getElementById("btnCerrarPopup");
const inputDni = document.getElementById("dni");
const cancelOverlay = document.getElementById("cancelOverlay");
const cancelGifEsquina = document.getElementById("cancelGifEsquina");

let timeoutId = null;

// Iniciar: oculta el botón "Iniciar" y muestra el formulario
btnIniciar.addEventListener("click", () => {
  btnIniciar.hidden = true;
  formulario.hidden = false;
  inputDni.value = "";
  resultado.textContent = "";
});

btnCalcular.addEventListener("click", () => {
  resultado.textContent = "";

  const valorInput = inputDni.value;
  const resultadoProceso = procesarDNI(valorInput);

  if (!resultadoProceso.valido) {
    resultado.textContent = resultadoProceso.mensaje;
    return;
  }

  loadingOverlay.hidden = false;

  timeoutId = setTimeout(() => {
    loadingOverlay.hidden = true;
    mostrarPopup(resultadoProceso.letra);
  }, 4500);
});

btnCancelar.addEventListener("click", () => {
  clearTimeout(timeoutId);
  loadingOverlay.hidden = true;

  cancelOverlay.hidden = false;
  cancelGifEsquina.hidden = false;

  setTimeout(() => {
    cancelOverlay.hidden = true;
    cancelGifEsquina.hidden = true;
  }, 3000);
});

// Cerrar: vuelve a la pantalla de "Iniciar"
btnCerrar.addEventListener("click", () => {
  volverAInicio();
});

btnCerrarPopup.addEventListener("click", () => {
  overlay.hidden = true;
  reiniciarInput();
});

function mostrarPopup(letra) {
  popupLetra.textContent = letra;
  overlay.hidden = false;
}

function reiniciarInput() {
  inputDni.value = "";
  inputDni.focus();
}

function volverAInicio() {
  formulario.hidden = true;
  btnIniciar.hidden = false;
  resultado.textContent = "";
  inputDni.value = "";
}