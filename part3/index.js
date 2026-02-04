const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let notes = [
        { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
        },
        { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
        },
        {
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
        },
        { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
        }
    ]

app.get('/api/persons', (req, res) => {
    res.json(notes)
})

app.get('/api/info', (req, res) => {
    const currentDate = new Date()
    res.send(`
        <p>Phonebook has info for ${notes.length} people</p>
        <p>${currentDate}</p> 
    `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const note = notes.find(note => note.id === id)
    if (!note) {
        return res.status(204).end()
    }
    res.json(note)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 1000000)
}

app.post('/api/persons', (req, res) => {
    const note = req.body

    if (!note.name || !note.number) {
        return res.status(400).json({ error: 'content is missing' })
    }

    if (notes.find(n => n.name === note.name)) {
        return res.status(400).json({ error: 'name is already added' })
    }

    note.id = String(generateId())
    notes = notes.concat(note)
    res.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(3001, () => {
  console.log(`Server running on port ${PORT}`)
})