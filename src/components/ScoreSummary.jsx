import React from 'react'

export default function ScoreSummary({ score, total, questions, quizConfig, onRetake, onHome }) {
  return (
    <section className="card">
      <h2>Quiz Summary</h2>
      <p className="big">You scored {score} / {total}</p>

      <div className="summary-actions">
        <button onClick={onRetake} className="primary">Retake</button>
        <button onClick={onHome}>Home</button>
      </div>

      <details>
        <summary>Review answers</summary>
        <ol className="review-list">
          {questions.map((q, i) => (
            <li key={i} className="review-item">
              <div className="rev-q">{q.question}</div>
              <div className="rev-a">Answer: {q.correct_answer}</div>
            </li>
          ))}
        </ol>
      </details>
    </section>
  )
}
