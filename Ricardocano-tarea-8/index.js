import express from 'express';
import { readFile, writeFile } from 'fs/promises';

const server = express();
server.use(express.json());

server.get('/students', async (req, res) => {
    const studentsData = await readFile('./students.json', 'utf-8');
    const students = JSON.parse(studentsData);
    res.json(students);
});

server.get('/students/:id', async (req, res) => {
    const id = req.params.id;
    const studentsData = await readFile('./students.json', 'utf-8');
    const students = JSON.parse(studentsData);

    const student = students.find(s => s.id === parseFloat(id));
    if (!student) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(student);
});

server.post('/students', async (req, res) => {
    const newStudent = req.body;
    const studentsData = await readFile('./students.json', 'utf-8');
    const students = JSON.parse(studentsData);

    newStudent.id = students.length > 0 ? students[students.length - 1].id + 1 : 1;
    students.push(newStudent);
    await writeFile('./students.json', JSON.stringify(students, null, 2), 'utf-8');
    res.status(201).json(newStudent);
});

server.put('/students/:id', async (req, res) => {
    const id = req.params.id;
    const updatedStudent = req.body;

    const studentsData = await readFile('./students.json', 'utf-8');
    const students = JSON.parse(studentsData);

    const studentIndex = students.findIndex(s => s.id === parseFloat(id));
    if (studentIndex === -1) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    students[studentIndex] = { ...students[studentIndex], ...updatedStudent, id: parseFloat(id) };
    await writeFile('./students.json', JSON.stringify(students, null, 2), 'utf-8');
    res.json(students[studentIndex]);
});

server.delete('/students/:id', async (req, res) => {
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
});

server.listen(3003, () => console.log('Servidor corriendo en el puerto 3003'));