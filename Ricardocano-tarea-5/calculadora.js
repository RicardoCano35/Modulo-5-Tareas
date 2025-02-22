const operaciones = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => {
      if (b === 0) {
        return "Error: División por cero";
      }
      return a / b;
    },
  };
  
  function calcular(num1, operacion, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
  
    if (isNaN(num1) || isNaN(num2)) {
      return "Error: Números inválidos";
    }
  
    if (!operaciones[operacion]) {
      return "Error: Operación no válida";
    }
  
    return operaciones[operacion](num1, num2);
  }
  
  const args = process.argv.slice(2);
  
  if (args.length !== 3) {
    console.log("Uso: node calculadora.js [numero1] [operacion] [numero2]");
    process.exit(1);
  }
  
  const num1 = args[0];
  const operacion = args[1];
  const num2 = args[2];
  
  const resultado = calcular(num1, operacion, num2);
  console.log(resultado);