import CollectionView from './CollectionView'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  return (
    <CollectionView
      component="users"
      endpoint={endpoint}
      title="Community"
      description="Meet the students and coaches powering OctoFit."
      renderItem={(user) => (
        <>
          <span className="card-kicker">{user.role}</span>
          <h2>{user.firstName} {user.lastName}</h2>
          <p>@{user.username}</p>
          <strong>{user.email}</strong>
        </>
      )}
    />
  )
}

export default Users
