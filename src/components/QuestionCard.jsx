import React, { useMemo, useState } from 'react'
import { shuffleArray } from '../utils'

export default function QuestionCard({ question, index, total, onAnswer, onNext }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const options = useMemo(() => {
    if (!question) return []
    return shuffleArray([question.correct_answer, ...question.incorrect_answers])
  }, [question])

  function choose(option) {
    if (submitted) return
    setSelected(option)
  }

  function submit() {
    if (selected == null) return
    const isCorrect = selected === question.correct_answer
    setSubmitted(true)
    onAnswer(isCorrect)
  }

  function next() {
    setSelected(null)
    setSubmitted(false)
    onNext()
  }

  if (!question) return null

  return (
    <section className="bg-white/5 border border-white/5 p-6 rounded-xl mb-4">
      <div className="text-sm text-slate-400 mb-2">Question {index + 1} / {total}</div>
      <h3 className="text-lg font-semibold mb-4">{question.question}</h3>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 mb-4">
        {options.map((opt) => {
          const isSelected = selected === opt
          const isCorrect = submitted && opt === question.correct_answer
          const isWrong = submitted && isSelected && opt !== question.correct_answer
          const base = 'text-left p-3 rounded-md border transition'
          const stateClass = isCorrect ? 'bg-emerald-800/40 border-emerald-500' : isWrong ? 'bg-rose-800/30 border-rose-500' : isSelected ? 'ring-2 ring-teal-400/30 border-white/10' : 'border-white/10 bg-transparent'

          return (
            <button
              key={opt}
              className={`${base} ${stateClass} text-slate-100`}
              onClick={() => choose(opt)}
            >
              {opt}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-3">
        {!submitted && (
          <button onClick={submit} className="bg-teal-400 text-slate-900 px-4 py-2 rounded-md disabled:opacity-60" disabled={selected == null}>
            Submit
          </button>
        )}

        {submitted && (
          <>
            <div className="text-sm text-slate-300 mr-auto">{selected === question.correct_answer ? 'Correct!' : `Incorrect — correct: ${question.correct_answer}`}</div>
            <button onClick={next} className="px-4 py-2 rounded-md border border-white/6">Next</button>
          </>
        )}
      </div>
    </section>
  )
}
