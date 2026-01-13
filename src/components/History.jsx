import React, { useEffect, useState } from 'react'

export default function History() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const h = JSON.parse(localStorage.getItem('quiz_history') || '[]')
    setHistory(h)
  }, [])

  if (!history.length) return (
    <section className="card">
      <h2>History</h2>
      <p>No quiz history yet.</p>
    </section>
  )

  const avg = (history.reduce((s, h) => s + (h.score / h.total), 0) / history.length) * 100
  const best = Math.max(...history.map((h) => (h.score / h.total) * 100))

  return (
    <section className="card">
      <h2>History</h2>
      <div className="stats">Average: {avg.toFixed(0)}% • Best: {best.toFixed(0)}%</div>
      <ul className="history-list">
        {history.map((h) => (
          <li key={h.id} className="history-item">
            <div className="hist-meta">
              <div>{new Date(h.date).toLocaleString()}</div>
              <div>{h.category} • {h.difficulty}</div>
            </div>
            <div className="hist-score">{h.score} / {h.total}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
