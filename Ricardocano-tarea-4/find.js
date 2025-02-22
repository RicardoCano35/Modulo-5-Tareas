import * as fs from 'fs/promises';

async function encontrarPares(nombreArchivo) {
  try {
    const data = await fs.readFile(nombreArchivo, 'utf8');
    const numeros = data.split(/,|\n/);

    const pares = numeros.filter(num => {
      const numero = parseInt(num);
      return !isNaN(numero) && numero % 2 === 0;
    });

    console.log('Números pares encontrados:');
    pares.forEach(par => console.log(par));

    if (pares.length > 0) {
      const paresString = pares.join('\n');
      await fs.writeFile('numeros_pares.txt', paresString);
      console.log('Archivo numeros_pares.txt generado.');
    } else {
      console.log('No se encontraron números pares.');
    }

  } catch (err) {
    console.error('Error al leer el archivo:', err);
  }
}

encontrarPares('numeros_linea.txt');