import React from 'react'

export default function ScoreSummary({ score, total, questions, quizConfig, onRetake, onHome }) {
  return (
    <section className="bg-white/5 border border-white/5 p-6 rounded-xl mb-4">
      <h2 className="text-xl font-medium">Quiz Summary</h2>
      <p className="text-2xl font-semibold mt-3 mb-4">You scored {score} / {total}</p>

      <div className="flex gap-3 mb-4">
        <button onClick={onRetake} className="bg-teal-400 text-slate-900 px-4 py-2 rounded-md">Retake</button>
        <button onClick={onHome} className="px-4 py-2 rounded-md border border-white/6">Home</button>
      </div>

      <details className="text-sm text-slate-300">
        <summary className="cursor-pointer mb-2">Review answers</summary>
        <ol className="divide-y divide-white/5 mt-2">
          {questions.map((q, i) => (
            <li key={i} className="py-2">
              <div className="font-medium text-slate-100">{q.question}</div>
              <div className="text-slate-300">Answer: {q.correct_answer}</div>
            </li>
          ))}
        </ol>
      </details>
    </section>
  )
}
