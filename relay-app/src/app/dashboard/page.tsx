'use client'
import Header from '../../../components/Header'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Note } from '@/types'
import { createBrowserClient } from '@supabase/ssr'

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
async function fetchNotes() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) {
      // Transform the data to match your Note interface
      const transformedNotes = data.map(note => ({
        ...note,
        dateISO: note.created_at,
        preview: `Transcript for ${note.title}` // You could fetch first few words from the .md file if needed
      }))
      setNotes(transformedNotes)
    }
    
    setLoading(false)
  }

  fetchNotes()
}, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header size="small" />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Loading your notes...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header size="small" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Notes</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Saved lecture transcriptions</p>
          </div>
          <Link
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm"
            href="/transcribe"
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Transcribe a Note
          </Link>
        </div>

        {/* Notes Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-10">
          {notes.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No notes yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">Start by transcribing your first lecture with AI.</p>
              <Link href="/transcribe" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create First Note
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {notes.map((note) => (
                <div key={note.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                        {note.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {note.course} • {new Date(note.dateISO).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                        {note.preview}
                      </p>
                    </div>
                    <Link href={`/notes/${note.id}`} className="ml-4 text-indigo-600 dark:text-indigo-400 hover:underline dark:hover:text-indigo-300 font-medium">
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Connect Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Connect</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Find other students or request help</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/connect" className="group p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-all">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Browse Requests</h3>
                  <p className="text-gray-500 dark:text-gray-400">Find students who need note-taking help</p>
                </div>
              </div>
            </Link>
            
            <Link href="/connect/new" className="group p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-all">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Make a Request</h3>
                  <p className="text-gray-500 dark:text-gray-400">Request notes from your classmates</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
