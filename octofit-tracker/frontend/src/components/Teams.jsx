import CollectionView from './CollectionView'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  return (
    <CollectionView
      component="teams"
      endpoint={endpoint}
      title="Teams"
      description="Find your crew and keep the momentum going."
      renderItem={(team) => (
        <>
          <span className="card-kicker">Team</span>
          <h2>{team.name}</h2>
          <p>{team.description}</p>
          <strong>{team.members?.length || 0} members</strong>
        </>
      )}
    />
  )
}

export default Teams
