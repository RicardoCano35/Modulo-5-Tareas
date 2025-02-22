import * as fs from 'fs/promises';

async function generarNumerosComa() {
  let numeros = '';
  for (let i = 1; i <= 1000; i++) {
    numeros += i;
    if (i < 1000) {
      numeros += ',';
    }
  }
  try {
    await fs.writeFile('numeros_coma.txt', numeros);
  } catch (err) {
    console.error("Error writing file:", err);
  }
}

async function generarNumerosLinea() {
  let numeros = '';
  for (let i = 1; i <= 1000; i++) {
    numeros += i + '\n';
  }
  try {
    await fs.writeFile('numeros_linea.txt', numeros);
  } catch (err) {
    console.error("Error writing file:", err);
  }
}

async function generateFiles() {
    await generarNumerosComa();
    await generarNumerosLinea();
    console.log('Archivos numeros_coma.txt y numeros_linea.txt generados.');
}

generateFiles();