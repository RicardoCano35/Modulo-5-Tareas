import esperarSegundos from './async.js';

async function pruebas() {
  await esperarSegundos(2);
  await esperarSegundos(5);
  await esperarSegundos(1);
}

pruebas();