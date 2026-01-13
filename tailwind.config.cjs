/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  // Safelist classes used via @apply in src/styles.css so JIT generates them
  safelist: [
    'max-w-3xl','mx-auto','mt-6','px-4','flex','justify-between','items-center','gap-3','mb-4',
    'bg-slate-800/60','border','border-slate-700','rounded-lg','p-6','mb-4','flex-col','gap-2','mb-3',
    'px-3','py-2','rounded-md','bg-transparent','text-slate-100','gap-3','my-3','grid-cols-1','text-left',
    'ring-2','ring-cyan-300/30','bg-emerald-700/20','border-emerald-500','bg-red-700/10','border-red-500',
    'text-slate-300','mr-auto','text-2xl','my-2','py-2','border-t','text-slate-400','mt-4','text-center',
    'text-red-400','mb-2','text-slate-400','mt-2','text-sm','text-lg','font-semibold','grid-cols-2','bg-cyan-400','text-slate-900','rounded-lg'
  ],
  plugins: [],
}
