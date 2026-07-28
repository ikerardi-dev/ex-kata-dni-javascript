const LETRAS_DNI = "TRWAGMYFPDXBNJZSQVHLCKE";
const MENSAJE_ERROR = "El dato introducido es incorrecto";

export function esNumero(valor) {
  if (valor === null || valor === undefined) return false;
  return /^\d{8}$/.test(valor.toString().trim());
}

export function estaEnRango(numero) {
  return numero >= 0 && numero <= 99999999;
}

export function calcularLetraDNI(numero) {
  const resto = numero % 23;
  return LETRAS_DNI[resto];
}

export function procesarDNI(dniInput) {
  const valor = dniInput.toString().trim();

  if (!esNumero(valor)) {
    return { valido: false, mensaje: MENSAJE_ERROR };
  }

  const numero = parseInt(valor, 10);

  if (!estaEnRango(numero)) {
    return { valido: false, mensaje: MENSAJE_ERROR };
  }

  const letra = calcularLetraDNI(numero);

  return { valido: true, letra, numero, dniCompleto: `${numero}${letra}` };
}