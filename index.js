const express = require("express")
const app = express()

app.use(express.json())

app.get('/', function(_req, res) {
    res.send('Hello World')
})

const students = []

app.post('/post-students', (req, res) => {
    console.log(req.body);
    students.push({
        // name: `Student-${students.length + 1}`,
        name: req.body.name,
        id: students.length + 1,
    })

    res.status(200).json({ message: "Record Created" })
})

app.get('/get-students', (req, res) => {
    res.status(200).json({ students })
})

app.get('/students/:id', (req, res) => {
    if (students[req.params.id - 1]) {
        res.json({ student: students[req.params.id - 1] })
    } else {
        res.json("No Record found")
    }
})

app.put('/students/:id', (req, res) => {
    if (students[req.params.id - 1]) {
        students[req.params.id - 1].name = req.body.name
        res.json({ message: "Record Updated" })
    } else {
        res.json("No Record found")
    }
})


app.delete('/students/:id', (req, res) => {
    const { id } = req.params.id; // Destructring

    const projectIndex = students.findIndex(p => p.id == id);

    students.splice(projectIndex, 1);

    res.json({ message: "Record deleted" });

});

app.listen(3000, () => console.log("Listening to port 3000....."));