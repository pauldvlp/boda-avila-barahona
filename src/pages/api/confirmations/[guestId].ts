import type { APIRoute } from 'astro'
import { deleteConfirmation } from '../../../lib/storage'

export const prerender = false

export const DELETE: APIRoute = async ({ params }) => {
  const { guestId } = params
  if (!guestId) return new Response(JSON.stringify({ error: 'ID requerido' }), { status: 400 })

  await deleteConfirmation(guestId)
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
