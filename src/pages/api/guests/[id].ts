import type { APIRoute } from 'astro'
import { upsertGuest, deleteGuest } from '../../../lib/storage'

export const prerender = false

export const PUT: APIRoute = async ({ params, request }) => {
  const { id } = params
  if (!id) return new Response(JSON.stringify({ error: 'ID requerido' }), { status: 400 })

  let body: { name: string; seats: number }
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 })
  }

  const { name, seats } = body
  if (!name?.trim()) {
    return new Response(JSON.stringify({ error: 'El nombre es requerido' }), { status: 400 })
  }

  const guest = { id, name: name.trim(), seats: Number(seats) || 1 }
  await upsertGuest(guest)

  return new Response(JSON.stringify(guest), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params
  if (!id) return new Response(JSON.stringify({ error: 'ID requerido' }), { status: 400 })

  await deleteGuest(id)
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
