import type { APIRoute } from 'astro'
import { deleteSuggestion } from '../../../lib/storage'

export const prerender = false

export const DELETE: APIRoute = async ({ params }) => {
  const { index } = params
  if (index === undefined) return new Response(JSON.stringify({ error: 'Índice requerido' }), { status: 400 })

  const idx = Number(index)
  if (isNaN(idx) || idx < 0) return new Response(JSON.stringify({ error: 'Índice inválido' }), { status: 400 })

  await deleteSuggestion(idx)
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
