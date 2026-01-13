import React, { useEffect, useState } from 'react'

export default function History() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const h = JSON.parse(localStorage.getItem('quiz_history') || '[]')
    setHistory(h)
  }, [])

  if (!history.length) return (
    <section className="bg-white/5 border border-white/5 p-6 rounded-xl mb-4">
      <h2 className="text-xl font-medium">History</h2>
      <p className="mt-3 text-slate-300">No quiz history yet.</p>
    </section>
  )

  const avg = (history.reduce((s, h) => s + (h.score / h.total), 0) / history.length) * 100
  const best = Math.max(...history.map((h) => (h.score / h.total) * 100))

  return (
    <section className="bg-white/5 border border-white/5 p-6 rounded-xl mb-4">
      <h2 className="text-xl font-medium">History</h2>
      <div className="text-sm text-slate-300 mt-2">Average: {avg.toFixed(0)}% • Best: {best.toFixed(0)}%</div>
      <ul className="mt-4 divide-y divide-white/5">
        {history.map((h) => (
          <li key={h.id} className="py-3 flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-200">{new Date(h.date).toLocaleString()}</div>
              <div className="text-sm text-slate-400">{h.category} • {h.difficulty}</div>
            </div>
            <div className="font-medium text-slate-100">{h.score} / {h.total}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
