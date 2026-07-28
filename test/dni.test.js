import { describe, it, expect } from "vitest";
import { esNumero, estaEnRango, calcularLetraDNI, procesarDNI } from "../js/dni.js";

describe("esNumero", () => {
  it("acepta una cadena de exactamente 8 dígitos", () => {
    expect(esNumero("12345678")).toBe(true);
  });

  it("acepta 8 dígitos con ceros a la izquierda", () => {
    expect(esNumero("00000005")).toBe(true);
  });

  it("rechaza un valor con menos de 8 dígitos", () => {
    expect(esNumero("1234567")).toBe(false);
  });

  it("rechaza un valor con más de 8 dígitos", () => {
    expect(esNumero("123456789")).toBe(false);
  });

  it("rechaza un valor con letras", () => {
    expect(esNumero("1234abc9")).toBe(false);
  });

  it("rechaza un valor vacío", () => {
    expect(esNumero("")).toBe(false);
  });

  it("rechaza un valor con espacios en medio", () => {
    expect(esNumero("1234 567")).toBe(false);
  });

  it("rechaza un valor negativo", () => {
    expect(esNumero("-1234567")).toBe(false);
  });
});

describe("estaEnRango", () => {
  it("acepta el límite inferior (0)", () => {
    expect(estaEnRango(0)).toBe(true);
  });

  it("acepta el límite superior (99999999)", () => {
    expect(estaEnRango(99999999)).toBe(true);
  });

  it("rechaza un número mayor que el límite superior", () => {
    expect(estaEnRango(100000000)).toBe(false);
  });

  it("rechaza un número negativo", () => {
    expect(estaEnRango(-1)).toBe(false);
  });
});

describe("calcularLetraDNI", () => {
  it("calcula correctamente la letra para un número conocido", () => {
    expect(calcularLetraDNI(12345678)).toBe("Z");
  });

  it("calcula correctamente la letra para el número 0", () => {
    expect(calcularLetraDNI(0)).toBe("T");
  });
});

describe("procesarDNI - DNI válido", () => {
  it("devuelve la letra correcta para un número de 8 dígitos", () => {
    const resultado = procesarDNI("12345678");
    expect(resultado.valido).toBe(true);
    expect(resultado.letra).toBe("Z");
    expect(resultado.dniCompleto).toBe("12345678Z");
  });

  it("acepta 8 dígitos con ceros a la izquierda (número bajo)", () => {
    const resultado = procesarDNI("00000005");
    expect(resultado.valido).toBe(true);
    expect(resultado.letra).toBe(calcularLetraDNI(5));
  });

  it("acepta el límite superior (99999999)", () => {
    const resultado = procesarDNI("99999999");
    expect(resultado.valido).toBe(true);
  });
});

describe("procesarDNI - Número fuera de rango / formato incorrecto", () => {
  it("rechaza un número con menos de 8 dígitos", () => {
    const resultado = procesarDNI("5");
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toBe("El dato introducido es incorrecto");
  });

  it("rechaza un número con más de 8 dígitos", () => {
    const resultado = procesarDNI("100000000");
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toBe("El dato introducido es incorrecto");
  });
});

describe("procesarDNI - Dato no numérico", () => {
  it("rechaza una cadena con letras", () => {
    const resultado = procesarDNI("abc12345");
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toBe("El dato introducido es incorrecto");
  });

  it("rechaza un valor vacío", () => {
    const resultado = procesarDNI("");
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toBe("El dato introducido es incorrecto");
  });
});