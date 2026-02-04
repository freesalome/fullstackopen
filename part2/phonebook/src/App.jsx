import { useEffect, useState } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import Notifications from './components/Notifications'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterName = event => setFilterName(event.target.value)

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  const handleSubmit = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)
    if(existingPerson && existingPerson.number !== newNumber && window.confirm(`Change ${existingPerson.name}'s number?`)) {
      const updatedPerson = {...existingPerson, number: newNumber}

      personService
        .update(existingPerson.id, updatedPerson)
        .then(response => setPersons(persons.map(person => person.id === response.id ? response : person)))
        .catch(err => {
          alert(`${existingPerson.name} was already deleted`)
          setPersons(persons.filter(p => p.id !== existingPerson.id))
        })

      setNewName('')
      setNewNumber('')
      return
    }

    if (persons.some(person => person.name === newName)) {
      setMessage(`${newName} already exists`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      setNewName('')
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(person => {
        setPersons(persons.concat(person))
        setMessage(`Added ${person.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (id) => {
    const personToDel = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${personToDel.name} ?`)) {
      personService
      .remove(id)
      .then(response => setPersons(persons.filter(person => person.id !== id)))
      .catch(err => {
        setMessage(`${personToDel.name} was already deleted`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== id))
      })
    }
    return
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notifications message={message} />
      <Filter value={filterName} onChange={handleFilterName} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={handleSubmit} nameValue={newName} numberValue={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} onDelete={handleDelete}/>
    </div>
  )
}

export default App