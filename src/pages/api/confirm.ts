import type { APIRoute } from 'astro'
import { saveConfirmation } from '../../lib/storage'

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

  const { guestId, guestName, attending, attendees, message } = body as {
    guestId: string
    guestName: string
    attending: boolean
    attendees: number
    message: string
  }

  if (!guestId || !guestName || attending === undefined) {
    return new Response(JSON.stringify({ error: 'Campos requeridos faltantes' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    await saveConfirmation({
      guestId,
      guestName,
      attending: attending === true || attending === 'true',
      attendees: Number(attendees) || 0,
      message: String(message ?? ''),
      confirmedAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Error saving confirmation:', err)
    return new Response(JSON.stringify({ error: 'Error al guardar confirmación' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
