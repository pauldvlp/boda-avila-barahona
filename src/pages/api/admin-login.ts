import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData()
  const password = form.get('password')?.toString() ?? ''

  if (password !== import.meta.env.ADMIN_PASSWORD) {
    return redirect('/admin/login?error=1')
  }

  cookies.set('admin_session', '1', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  })

  return redirect('/admin')
}
