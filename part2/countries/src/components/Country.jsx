import { useState } from "react"

const imgSizing = {
    height: '200px',
    width: '200px'
}

const Country = ( {country, forceOpen }) => {
    const [toggleDesc, setToggleDesc] = useState(false)

    const toggleButton = () => {
        setToggleDesc(!toggleDesc)
    }

    if (toggleDesc || forceOpen) {
        const languages = Object.values(country.languages)
        return (
            <>
                <h1>
                    {country.name.common} {<button onClick={toggleButton}>Hide</button>}
                </h1>
                <h3>{country.capital}</h3>
                <h3>{country.area}</h3>
                <div>
                    <img style={imgSizing} src={country.coatOfArms.png} />
                </div>
                <h2>Languages</h2>
                <ul>
                    {languages.map(language => <li key={language}>{language}</li>)}
                </ul>
            </>
        )
    }
    return (
        <>
            {country.name.common} {<button onClick={toggleButton}>Show</button>}
        </>
    )
}

export default Country