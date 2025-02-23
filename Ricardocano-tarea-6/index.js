import http from 'http';
import { URL } from 'url';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const port = 3002;

let products = [];
try {
  const data = await fs.readFile('productos.json', 'utf8');
  products = JSON.parse(data);
} catch (error) {
  console.error('Error reading productos.json:', error);
  products = [
    { id: 1, name: 'audifonos', price: 89.99, category: 'Electronica' },
    { id: 2, name: 'escritorio', price: 70.99, category: 'Muebles' },
    { id: 3, name: 'teclado', price: 14.99, category: 'Electronica' }
  ];
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  const parseUrl = new URL(req.url, `http://${req.headers.host}`);

  if (parseUrl.pathname === '/productos' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } else if (parseUrl.pathname === '/productos' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const newProduct = JSON.parse(body);

        if (!newProduct.name || !newProduct.price || !newProduct.category) {
          throw new Error('Faltan propiedades del producto');
        }

        newProduct.id = uuidv4(); // Usar UUIDs

        products.push(newProduct);
        await fs.writeFile('productos.json', JSON.stringify(products, null, 2));

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newProduct));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
  }
});

server.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});