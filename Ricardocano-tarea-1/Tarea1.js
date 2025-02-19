let libros = [
    { titulo: 'El Hobbit', autor: 'J.R.R. Tolkien', paginas: 300 },
    { titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', paginas: 400 },
    { titulo: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling', paginas: 350 }
  ];
  
  console.log("Nombre del segundo libro:", libros[1].titulo);
  console.log("Autor del segundo libro:", libros[1].autor);
  
  libros[0].paginas = 350;
  
  console.log("Información actualizada del primer libro:", libros[0]);
  
  let librosResumidos = libros.map(libro => ({ titulo: libro.titulo, autor: libro.autor }));
  
  console.log("Array de libros resumidos:", librosResumidos);
  
  const estudiantes = [
    { nombre: "Pedro", edad: 29, promedio: 7.9 },
    { nombre: "Ana", edad: 33, promedio: 8.9 },
    { nombre: "Pablo", edad: 32, promedio: 9.5 },
    { nombre: "Juan", edad: 25, promedio: 6.0 },
    { nombre: "Maria", edad: 28, promedio: 7.3 },
    { nombre: "Andres", edad: 45, promedio: 8.7 },
  ];
  
  let sumaEdades = 0;
  
  for (let i = 0; i < estudiantes.length; i++) {
    sumaEdades += estudiantes[i].edad;
  }
  
  let promedioEdad = sumaEdades / estudiantes.length;
  
  console.log("Suma de edades:", sumaEdades);
  console.log("Promedio de edad:", promedioEdad);
  
  let productos = [
    { nombre: 'Camisa', categoria: 'Ropa', precio: 20 },
    { nombre: 'Computadora', categoria: 'Electrónica', precio: 800 },
    { nombre: 'Zapatos', categoria: 'Ropa', precio: 50 },
    { nombre: 'Teléfono', categoria: 'Electrónica', precio: 300 }
  ];
  
  let ropa = productos.filter(producto => producto.categoria === 'Ropa');
  
  console.log("Productos de ropa:", ropa);
  
  let preciosMayores = productos.filter(producto => producto.precio > 30);
  
  console.log("Productos con precios mayores a 30:", preciosMayores);
  
  let estudianteMayorPromedio = estudiantes[0];
  
  for (let i = 1; i < estudiantes.length; i++) {
    if (estudiantes[i].promedio > estudianteMayorPromedio.promedio) {
      estudianteMayorPromedio = estudiantes[i];
    }
  }
  
  console.log("Estudiante con mayor promedio:", estudianteMayorPromedio);