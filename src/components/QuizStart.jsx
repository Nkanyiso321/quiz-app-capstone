import React, { useEffect, useState } from 'react'

export default function QuizStart({ categories, onStart, loading, error }) {
  const [amount, setAmount] = useState(10)
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [search, setSearch] = useState('')

  const filtered = categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    // pick default category if available
    if (categories.length && !category) setCategory('')
  }, [categories])

  function start() {
    const catObj = categories.find((c) => String(c.id) === String(category))
    onStart({ amount, category: category || undefined, difficulty: difficulty || undefined, categoryName: catObj ? catObj.name : 'Any' })
  }

  return (
    <section className="card">
      <h2>Start a Quiz</h2>

      <div className="form-row">
        <label>Search topics</label>
        <input placeholder="Search categories" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="form-row">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Any</option>
          {filtered.map((c) => (
            <option value={c.id} key={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label>Difficulty</label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="form-row">
        <label>Number of questions</label>
        <input type="number" min="1" max="50" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      </div>

      {error && <div className="error">{error}</div>}

      <div className="form-actions">
        <button onClick={start} disabled={loading} className="primary">
          {loading ? 'Loading...' : 'Start Quiz'}
        </button>
      </div>

      <div className="note">
        <small>Tip: Use the search to filter categories. If no questions are returned, try 'Any' or fewer questions.</small>
      </div>
    </section>
  )
}
