'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Note } from '@/types'

export default function NotePage() {
  const { id } = useParams()
  const [note, setNote] = useState<Note | null>(null)
  const [markdownContent, setMarkdownContent] = useState('')

  useEffect(() => {
    async function loadNote() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      // Get note metadata
      const { data: noteData } = await supabase
        .from('notes')
        .select('*')
        .eq('id', id)
        .single()

      if (noteData) {
        setNote(noteData)

        // Download the .md file from storage
        const { data: fileData } = await supabase.storage
          .from('notes')
          .download(noteData.file_key)

        if (fileData) {
          const text = await fileData.text()
          setMarkdownContent(text)
        }
      }
    }
    loadNote()
  }, [id])

  if (!note) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
      <p className="text-gray-600 mb-6">{note.course}</p>
      
      {/* Raw markdown or rendered markdown */}
      <div className="bg-white border rounded p-6">
        <pre className="whitespace-pre-wrap">{markdownContent}</pre>
      </div>
    </div>
  )
}
