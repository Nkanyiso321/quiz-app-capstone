import React, { useEffect, useState } from 'react'
import QuizStart from './components/QuizStart'
import QuestionCard from './components/QuestionCard'
import ScoreSummary from './components/ScoreSummary'
import History from './components/History'
import { decodeHTML } from './utils'

export default function App() {
  const [view, setView] = useState('start') // start | quiz | summary | history
  const [categories, setCategories] = useState([])
  const [quizConfig, setQuizConfig] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // fetch categories
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories || []))
      .catch((err) => setError('Failed to load categories'))
  }, [])

  async function startQuiz(config) {
    setQuizConfig(config)
    setLoading(true)
    setError(null)
    setQuestions([])
    setCurrentIndex(0)
    setScore(0)

    try {
      const params = new URLSearchParams()
      params.set('amount', config.amount)
      if (config.category) params.set('category', config.category)
      if (config.difficulty) params.set('difficulty', config.difficulty)
      params.set('type', 'multiple')
      const url = `https://opentdb.com/api.php?${params.toString()}`
      const res = await fetch(url)
      const data = await res.json()
      if (data.response_code !== 0 || !data.results.length) {
        setError('No questions available for the selected options. Try different settings.')
        setLoading(false)
        return
      }

      // normalize questions
      const normalized = data.results.map((q) => ({
        question: decodeHTML(q.question),
        correct_answer: decodeHTML(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((a) => decodeHTML(a)),
        category: q.category,
        difficulty: q.difficulty
      }))
      setQuestions(normalized)
      setView('quiz')
    } catch (e) {
      console.error(e)
      setError('Network or server error while fetching questions.')
    } finally {
      setLoading(false)
    }
  }

  function handleAnswer(isCorrect) {
    if (isCorrect) setScore((s) => s + 1)
  }

  function finishQuiz() {
    // save to history
    const history = JSON.parse(localStorage.getItem('quiz_history') || '[]')
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      category: quizConfig?.categoryName || 'Any',
      difficulty: quizConfig?.difficulty || 'Any',
      amount: quizConfig?.amount,
      score,
      total: questions.length
    }
    localStorage.setItem('quiz_history', JSON.stringify([entry, ...history]))
    setView('summary')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 antialiased py-6 px-4">
      <header className="max-w-3xl mx-auto flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Quiz App</h1>
        <nav className="space-x-2">
          <button onClick={() => setView('start')} className="text-sm px-3 py-1 rounded hover:bg-white/5">Home</button>
          <button onClick={() => setView('history')} className="text-sm px-3 py-1 rounded hover:bg-white/5">History</button>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto">
        {view === 'start' && (
          <QuizStart
            categories={categories}
            onStart={startQuiz}
            loading={loading}
            error={error}
          />
        )}

        {view === 'quiz' && (
          <QuestionCard
            question={questions[currentIndex]}
            index={currentIndex}
            total={questions.length}
            onAnswer={(isCorrect) => handleAnswer(isCorrect)}
            onNext={() => {
              if (currentIndex + 1 < questions.length) setCurrentIndex((i) => i + 1)
              else finishQuiz()
            }}
          />
        )}

        {view === 'summary' && (
          <ScoreSummary
            score={score}
            total={questions.length}
            questions={questions}
            quizConfig={quizConfig}
            onRetake={() => {
              // reset and restart same config
              startQuiz(quizConfig)
            }}
            onHome={() => setView('start')}
          />
        )}

        {view === 'history' && <History />}
      </main>

      <footer className="max-w-3xl mx-auto mt-6 text-center text-sm text-slate-400">
        <small>Powered by Open Trivia DB • Frontend Capstone</small>
      </footer>
    </div>
  )
}
