const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ parts }) => {
  const total = parts.reduce((accumulator, { exercises }) => accumulator + exercises, 0)

  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
      <b>total of {total} exercises</b>
    </div>
  )
}

const Header = ({ heading }) => <h1>{heading}</h1>

const Course = ({ courses }) => {
  return (
      <div>
        {courses.map(course =>
        <div key={course.id}>
          <Header heading={course.name} />
          <Content parts={course.parts} />
        </div>
        )}
      </div>
    )
}

export default Course