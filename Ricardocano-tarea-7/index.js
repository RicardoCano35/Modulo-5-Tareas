import express from 'express';
import { readFile, writeFile } from 'fs/promises';

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/students', async (req, res) => {
    try {
        const studentsData = await readFile('./students.json', 'utf-8');
        const students = JSON.parse(studentsData);
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Error al leer el archivo de estudiantes' });
    }
});

server.get('/students/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const studentsData = await readFile('./students.json', 'utf-8');
        const students = JSON.parse(studentsData);

        const student = students.find(s => s.id === parseFloat(id));
        if (!student) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: 'Error al leer el archivo de estudiantes' });
    }
});

server.post('/students', async (req, res) => {
    try {
        const newStudent = req.body;
        const studentsData = await readFile('./students.json', 'utf-8');
        const students = JSON.parse(studentsData);

        const isDuplicate = students.some(s => s.id === newStudent.id);
        if (isDuplicate) {
            return res.status(409).json({ error: 'El estudiante ya existe, prueba otro id' });
        }

        students.push(newStudent);
        await writeFile('./students.json', JSON.stringify(students, null, 2), 'utf-8');
        res.status(201).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el estudiante' });
    }
});

server.put('/students/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedStudent = req.body;

        const studentsData = await readFile('./students.json', 'utf-8');
        const students = JSON.parse(studentsData);

        const studentIndex = students.findIndex(s => s.id === parseFloat(id));
        if (studentIndex === -1) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        students[studentIndex] = updatedStudent;
        await writeFile('./students.json', JSON.stringify(students, null, 2), 'utf-8');
        res.send({ message: 'Estudiante actualizado', student: updatedStudent });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estudiante' });
    }
});

server.delete('/students/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const studentsData = await readFile('./students.json', 'utf-8');
        const students = JSON.parse(studentsData);

        const studentIndex = students.findIndex(s => s.id === parseFloat(id));
        if (studentIndex === -1) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        students.splice(studentIndex, 1);
        await writeFile('./students.json', JSON.stringify(students, null, 2), 'utf-8');
        res.send({ message: 'Estudiante eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el estudiante' });
    }
});

server.listen(3002, () => console.log('Servidor corriendo en el puerto 3002'));