'use client'
import Header from '../../../../components/Header'
import { useSearchParams, useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { saveTranscript } from '../../../lib/saveTranscript'


export default function TranscribeSession() {
  /* ── query-string data ───────────────────────── */
  const qp     = useSearchParams()
  const title  = qp.get('title')  || ''
  const course = qp.get('course') || ''
  /* ── state ───────────────────────────────────── */
  const [status,     setStatus]     = useState<'idle'|'recording'|'processing'|'done'>('idle')
  const [transcript, setTranscript] = useState('')
  const [duration,   setDuration]   = useState(0)           // seconds
  /* ── refs ────────────────────────────────────── */
  const chunksRef = useRef<Blob[]>([])
  const mediaRef  = useRef<MediaRecorder|null>(null)
  const streamRef = useRef<MediaStream|null>(null)  
  const timerRef  = useRef<NodeJS.Timeout| null>(null)
  ///
  /* ── controls ────────────────────────────────── */
  async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  streamRef.current = stream  // ← ADD THIS LINE
  const rec    = new MediaRecorder(stream, { mimeType: 'audio/webm' })
  mediaRef.current  = rec
  chunksRef.current = []
  rec.ondataavailable = e => chunksRef.current.push(e.data)
  rec.onstop          = handleUpload
  rec.start()
  setStatus('recording')
  timerRef.current = setInterval(() => setDuration(d => d + 1), 1_000)
}

  function stopRecording() {
    mediaRef.current?.stop()
    if (streamRef.current) {
    streamRef.current.getAudioTracks().forEach(track => track.stop())
    streamRef.current = null
  }
  
  if (timerRef.current) clearInterval(timerRef.current)
  setStatus('processing')
  }
  /* ── upload → poll → save ────────────────────── */
  async function handleUpload() {
    const blob   = new Blob(chunksRef.current, { type: 'audio/webm' })
    const buffer = await blob.arrayBuffer()
    try {
  /* 1. upload audio */
  console.log('Uploading audio...')
  const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
    method: 'POST',
    headers: { authorization: process.env.NEXT_PUBLIC_ASSEMBLY_KEY! },
    body:   buffer,
  })
  
  if (!uploadResponse.ok) {
    console.error('Upload failed:', uploadResponse.status, uploadResponse.statusText)
    return
  }
  
  const { upload_url } = await uploadResponse.json()
  console.log('Upload successful, URL:', upload_url)
  
  /* 2. request transcript */
  console.log('Requesting transcript...')
  const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
    method: 'POST',
    headers: {
      authorization:  process.env.NEXT_PUBLIC_ASSEMBLY_KEY!,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ audio_url: upload_url, format_text: true }),
  })
  
  if (!transcriptResponse.ok) {
    console.error('Transcript request failed:', transcriptResponse.status, transcriptResponse.statusText)
    return
  }
  
  const { id } = await transcriptResponse.json()
  console.log('Transcript ID:', id)
  
  /* 3. poll every 2.5 s until finished */
  let attempts = 0
  const maxAttempts = 120 // 5 minutes max
  
  while (attempts < maxAttempts) {
    console.log(`Polling attempt ${attempts + 1}/${maxAttempts}`)
    
    const pollResponse = await fetch(
      `https://api.assemblyai.com/v2/transcript/${id}`,
      { headers: { authorization: process.env.NEXT_PUBLIC_ASSEMBLY_KEY! } }
    )
    
    if (!pollResponse.ok) {
      console.error('Polling failed:', pollResponse.status, pollResponse.statusText)
      setTranscript('Error: Polling failed')
      setStatus('done')
      break
    }
    
    const res = await pollResponse.json()
    console.log('Poll response:', res.status, res.id)
    
    if (res.status === 'completed') {
      console.log('Transcription completed!')
      await saveTranscript({ text: res.text, title, course })
      setTranscript(res.text)
      setStatus('done')
      break
    }
    if (res.status === 'error') {
      console.error('Transcription error:', res.error)
      setTranscript('Error: ' + res.error)
      setStatus('done')
      break
    }
    
    attempts++
    await new Promise(r => setTimeout(r, 2_500))
  }
  
  if (attempts >= maxAttempts) {
    console.error('Transcription timed out after 5 minutes')
    setTranscript('Error: Transcription timed out')
    setStatus('done')
  }
  
} catch (error) {
  console.error('Upload process error:', error)
  if (error instanceof Error) {
    setTranscript('Error: ' + error.message)
  } else {
    setTranscript('Error: Unknown error')
  }
  setStatus('done')
}
}

  /* ── UI ──────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header size="small" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{title}</h1>
        <p  className="text-gray-600 dark:text-gray-300 mb-6">{course}</p>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
          {/* buttons */}
          <div className="flex gap-4 mb-6">
            {status !== 'recording' && (
              <button onClick={startRecording}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Start Recording
              </button>
            )}
            {status === 'recording' && (
              <button onClick={stopRecording}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Stop Recording
              </button>
            )}
          </div>
          {/* transcript box */}
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600
                          rounded-lg p-6 min-h-[12rem] bg-gray-50 dark:bg-gray-700
                          overflow-auto whitespace-pre-wrap">
            {status === 'idle'       && 'Press "Start Recording" to begin.'}
            {status === 'recording'  && 'Recording…'}
            {status === 'processing' && 'Transcribing… this may take a minute.'}
            {transcript}
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex justify-between">
            <span>Status: {status}</span>
            <span>Duration: {duration.toString().padStart(2, '0')} s</span>
          </div>
        </div>
      </main>
    </div>
  )
  }
