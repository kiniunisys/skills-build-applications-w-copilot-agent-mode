import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function CollectionView({ component, endpoint, title, description, renderItem }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true
    fetchCollection(endpoint)
      .then((data) => {
        if (active) {
          setItems(data)
          setStatus('ready')
        }
      })
      .catch(() => active && setStatus('error'))
    return () => { active = false }
  }, [component, endpoint])

  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">OctoFit Tracker</p>
          <h1>{title}</h1>
          <p className="section-description">{description}</p>
        </div>
        {status === 'ready' && <span className="result-count">{items.length} records</span>}
      </div>
      {status === 'loading' && <p className="state-message">Loading {component}...</p>}
      {status === 'error' && <p className="state-message error">Could not connect to the API at this time.</p>}
      {status === 'ready' && (
        <div className="collection-grid">
          {items.map((item) => <article className="data-card" key={item._id}>{renderItem(item)}</article>)}
        </div>
      )}
    </section>
  )
}

export default CollectionView
