import { createBrowserClient } from '@supabase/ssr'

export async function saveTranscript({
  text,
  title,
  course,
}: {
  text: string
  title: string
  course: string
}) {
  /* 1. init client (browser) */
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  /* 2. get current user */
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser()
  if (authErr || !user) throw new Error('Not signed in')

  /* 3. upload markdown file */
  const fileKey = `notes/${user.id}/${Date.now()}.md`
  const blob = new Blob([text], { type: 'text/markdown' })
  const { error: upErr } = await supabase.storage
    .from('notes')
    .upload(fileKey, blob, { cacheControl: '3600' })
  if (upErr) throw upErr

  /* 4. insert DB row */
  const { error: dbErr } = await supabase.from('notes').insert({
    user_id: user.id,
    title,
    course,
    file_key: fileKey,
  })
  if (dbErr) throw dbErr
}
