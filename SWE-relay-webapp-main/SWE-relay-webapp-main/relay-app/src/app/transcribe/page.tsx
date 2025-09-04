'use client'
import Header from '../../../components/Header'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TranscribeEntry() {
  const [title, setTitle] = useState('')
  const [course, setCourse] = useState('')
  const router = useRouter()

  const start = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !course.trim()) return
    router.push(`/transcribe/session?title=${encodeURIComponent(title)}&course=${encodeURIComponent(course)}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header size="small" />
      
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Start a New Transcription</h1>
          <p className="text-gray-600 dark:text-gray-300">Set up your lecture details before we begin recording</p>
        </div>
        
        <form onSubmit={start} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Lecture Title
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder="e.g., Lecture 5 - Binary Trees and Traversal"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course Code
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={course} 
                onChange={e => setCourse(e.target.value)} 
                placeholder="e.g., CS201"
                required
              />
            </div>
          </div>
          
          <div className="mt-8 flex gap-4">
            <button 
              type="button" 
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Continue to Recording
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
