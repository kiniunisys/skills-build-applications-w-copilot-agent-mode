import CollectionView from './CollectionView'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  return (
    <CollectionView
      component="activities"
      endpoint={endpoint}
      title="Activity log"
      description="Recent movement, training time, and points earned."
      renderItem={(activity) => (
        <>
          <span className="card-kicker">{activity.type}</span>
          <h2>{activity.durationMinutes} minutes</h2>
          <p>{activity.user?.firstName || activity.user?.username || 'OctoFit member'}</p>
          <strong>{activity.points} points</strong>
        </>
      )}
    />
  )
}

export default Activities
