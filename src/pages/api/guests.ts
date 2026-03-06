import type { APIRoute } from 'astro'
import { getGuests, upsertGuest } from '../../lib/storage'

export const prerender = false

export const GET: APIRoute = async () => {
  const guests = await getGuests()
  return new Response(JSON.stringify(guests), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const POST: APIRoute = async ({ request }) => {
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

  const guest = {
    id: crypto.randomUUID(),
    name: name.trim(),
    seats: Number(seats) || 1,
  }

  await upsertGuest(guest)

  return new Response(JSON.stringify(guest), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}
