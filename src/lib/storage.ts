import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import seedGuests from '../assets/data/guests.json'

export interface Guest {
  id: string
  name: string
  seats: number
}

export interface Confirmation {
  guestId: string
  guestName: string
  attending: boolean
  attendees: number
  message: string
  confirmedAt: string
}

export interface SongSuggestion {
  guestId: string
  song: string
  artist: string
  suggestedAt: string
}

const isVercel = process.env.VERCEL === '1'
const dataDir = join(process.cwd(), 'src/assets/data')

// ── Blob helpers ──────────────────────────────────────────────

async function blobGet<T>(key: string): Promise<T | null> {
  const { get } = await import('@vercel/blob')
  const result = await get(key, { access: 'private' })
  if (!result || !result.stream) return null
  const text = await new Response(result.stream).text()
  return JSON.parse(text) as T
}

async function blobPut(key: string, data: unknown): Promise<void> {
  const { put } = await import('@vercel/blob')
  await put(key, JSON.stringify(data), { access: 'private', addRandomSuffix: false, allowOverwrite: true })
}

// ── Guests ────────────────────────────────────────────────────

export async function getGuests(): Promise<Guest[]> {
  if (isVercel) {
    try {
      return (await blobGet<Guest[]>('guests/data.json')) ?? (seedGuests as Guest[])
    } catch {
      return seedGuests as Guest[]
    }
  }
  try {
    const raw = readFileSync(join(dataDir, 'guests.json'), 'utf-8')
    return JSON.parse(raw)
  } catch {
    return seedGuests as Guest[]
  }
}

export async function saveGuests(guests: Guest[]): Promise<void> {
  if (isVercel) {
    await blobPut('guests/data.json', guests)
    return
  }
  writeFileSync(join(dataDir, 'guests.json'), JSON.stringify(guests, null, 2))
}

export async function upsertGuest(guest: Guest): Promise<void> {
  const all = await getGuests()
  const idx = all.findIndex((g) => g.id === guest.id)
  if (idx >= 0) all[idx] = guest
  else all.push(guest)
  await saveGuests(all)
}

export async function deleteGuest(id: string): Promise<void> {
  const all = await getGuests()
  await saveGuests(all.filter((g) => g.id !== id))
}

// ── Confirmations ─────────────────────────────────────────────

export async function getConfirmations(): Promise<Confirmation[]> {
  if (isVercel) {
    try {
      return (await blobGet<Confirmation[]>('confirmations/data.json')) ?? []
    } catch {
      return []
    }
  }
  try {
    const raw = readFileSync(join(dataDir, 'confirmations.json'), 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export async function saveConfirmation(data: Confirmation): Promise<void> {
  const all = await getConfirmations()
  const idx = all.findIndex((c) => c.guestId === data.guestId)
  if (idx >= 0) all[idx] = data
  else all.push(data)
  if (isVercel) {
    await blobPut('confirmations/data.json', all)
    return
  }
  writeFileSync(join(dataDir, 'confirmations.json'), JSON.stringify(all, null, 2))
}

// ── Song Suggestions ──────────────────────────────────────────

export async function getSuggestions(): Promise<SongSuggestion[]> {
  if (isVercel) {
    try {
      return (await blobGet<SongSuggestion[]>('suggestions/data.json')) ?? []
    } catch {
      return []
    }
  }
  try {
    const raw = readFileSync(join(dataDir, 'suggestions.json'), 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export async function saveSuggestion(data: SongSuggestion): Promise<void> {
  const all = await getSuggestions()
  all.push(data)
  if (isVercel) {
    await blobPut('suggestions/data.json', all)
    return
  }
  writeFileSync(join(dataDir, 'suggestions.json'), JSON.stringify(all, null, 2))
}
