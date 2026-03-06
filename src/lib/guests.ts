import { getGuests, type Guest } from './storage'

export type { Guest }

export async function getGuest(id: string | null | undefined): Promise<Guest> {
  if (!id) return defaultGuest()
  const guests = await getGuests()
  return guests.find((g) => g.id === id) ?? defaultGuest()
}

function defaultGuest(): Guest {
  return { id: 'general', name: 'Estimado Invitado', seats: 1 }
}
