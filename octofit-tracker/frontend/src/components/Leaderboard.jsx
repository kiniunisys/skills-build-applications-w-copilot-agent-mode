import CollectionView from './CollectionView'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  return (
    <CollectionView
      component="leaderboard"
      endpoint={endpoint}
      title="Leaderboard"
      description="See how the community is moving this month."
      renderItem={(entry) => (
        <>
          <span className="rank">#{entry.rank}</span>
          <h2>{entry.user?.firstName || entry.user?.username || 'Member'}</h2>
          <p>{entry.period}</p>
          <strong>{entry.points} points</strong>
        </>
      )}
    />
  )
}

export default Leaderboard
