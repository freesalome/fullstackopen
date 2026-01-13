const Header = ({course}) => {
  return (
    <h1>
      {course}
    </h1>
  )
}

const Part = ({content}) => {
  return (
    <p>
      {content}
    </p>
  )
}

const Content = ({parts}) => {
  console.log(parts)
  const partOne = parts[0].name + ' ' + parts[0].exercises
  const partTwo = parts[1].name + ' ' + parts[1].exercises
  const partThree = parts[2].name + ' ' + parts[2].exercises

  return (
    <div>
      <Part content={partOne} />
      <Part content={partTwo} />
      <Part content={partThree} />
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return (
    <p>
      Number of exercises {total}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App