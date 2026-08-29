import CollectionView from './CollectionView'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  return (
    <CollectionView
      component="workouts"
      endpoint={endpoint}
      title="Workout library"
      description="Simple plans for your next strong session."
      renderItem={(workout) => (
        <>
          <span className="card-kicker">{workout.category} / {workout.difficulty}</span>
          <h2>{workout.name}</h2>
          <p>{workout.description}</p>
          <strong>{workout.durationMinutes} minutes</strong>
        </>
      )}
    />
  )
}

export default Workouts
