import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
// import './App.css'
import List from './components/List'

const App = () => {
  const [country, setCountry] = useState('')
  const [list, setList] = useState([])

  useEffect(() => {
    if (country !== '') {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          const filteredData = response.data.filter(data => data.name.common.toLowerCase().includes(country.toLowerCase()))
          setList(filteredData)
        }
      )
    }
  }, [country])

  const changeCountry = (event) => {
    setCountry(event.target.value)
  }

  return (
    <div>
      <form>
        find countries <input value={country} onChange={changeCountry} />
      </form>
      <List list={list} countryInput={country}/>
    </div>
  )
}

export default App
