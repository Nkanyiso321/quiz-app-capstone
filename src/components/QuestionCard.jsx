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
    <section className="card">
      <div className="meta">Question {index + 1} / {total}</div>
      <h3 className="question">{question.question}</h3>

      <div className="options">
        {options.map((opt) => {
          const isSelected = selected === opt
          const isCorrect = submitted && opt === question.correct_answer
          const isWrong = submitted && isSelected && opt !== question.correct_answer
          return (
            <button
              key={opt}
              className={`option ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
              onClick={() => choose(opt)}
            >
              {opt}
            </button>
          )
        })}
      </div>

      <div className="form-actions">
        {!submitted && (
          <button onClick={submit} className="primary" disabled={selected == null}>
            Submit
          </button>
        )}
        {submitted && (
          <>
            <div className="feedback">{selected === question.correct_answer ? 'Correct!' : `Incorrect — correct: ${question.correct_answer}`}</div>
            <button onClick={next}>Next</button>
          </>
        )}
      </div>
    </section>
  )
}
