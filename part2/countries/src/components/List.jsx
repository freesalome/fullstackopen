import Country from './Country'

const imgSizing = {
    height: '200px',
    width: '200px'
}
const List = ({ list , countryInput}) => {
    if (list.length === 0 || countryInput === '') return null

    if (list.length > 10) return <p>More than 10</p>

    if (list.length === 1) {
        return <Country country={list[0]} forceOpen={true}/>
    }

    return (
        <ul>
            {
                list.map(country => 
                    <li key={country.name.official}>
                        <Country country={country} />
                    </li>
                )
            }
        </ul>
    )
}

export default List