import type { APIRoute } from 'astro'
import { saveSuggestion } from '../../lib/storage'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { guestId, song, artist } = body as {
    guestId: string
    song: string
    artist: string
  }

  if (!song) {
    return new Response(JSON.stringify({ error: 'Nombre de canción requerido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    await saveSuggestion({
      guestId: String(guestId ?? 'general'),
      song: String(song),
      artist: String(artist ?? ''),
      suggestedAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Error saving song suggestion:', err)
    return new Response(JSON.stringify({ error: 'Error al guardar sugerencia' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
