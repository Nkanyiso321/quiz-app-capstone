import React, { useEffect, useState } from 'react'

export default function QuizStart({ categories, onStart, loading, error }) {
  const [amount, setAmount] = useState(10)
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [search, setSearch] = useState('')

  const filtered = (categories || []).filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
  useEffect(() => {
    // pick default category if available
    if (categories.length && !category) setCategory('')
  }, [categories])

  function start() {
    const catObj = (categories || []).find((c) => String(c.id) === String(category))
    onStart({ amount, category: category || undefined, difficulty: difficulty || undefined, categoryName: catObj ? catObj.name : 'Any' })
  }

  return (
    <section className="bg-white/5 border border-white/5 p-6 rounded-xl mb-4">
      <h2 className="text-xl font-medium mb-4">Start a Quiz</h2>

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-sm">Search topics</label>
        <input
          className="px-3 py-2 rounded-md bg-transparent border border-white/6 text-slate-100"
          placeholder="Search categories"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-sm">Category</label>
        <select
          className="px-3 py-2 rounded-md bg-transparent border border-white/6 text-slate-100"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Any</option>
          {filtered.map((c) => (
            <option value={c.id} key={c.id} className="text-slate-900">{c.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-sm">Difficulty</label>
        <select
          className="px-3 py-2 rounded-md bg-transparent border border-white/6 text-slate-100"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-sm">Number of questions</label>
        <input
          className="w-28 px-3 py-2 rounded-md bg-transparent border border-white/6 text-slate-100"
          type="number"
          min="1"
          max="50"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>

      {error && <div className="text-rose-400 mb-3">{error}</div>}

      <div className="flex items-center gap-3">
        <button
          onClick={start}
          disabled={loading}
          className="bg-teal-400 text-slate-900 px-4 py-2 rounded-md disabled:opacity-60"
        >
          {loading ? 'Loading...' : 'Start Quiz'}
        </button>
      </div>

      <div className="mt-3 text-sm text-slate-400">
        <small>Tip: Use the search to filter categories. If no questions are returned, try 'Any' or fewer questions.</small>
      </div>
    </section>
  )
}
