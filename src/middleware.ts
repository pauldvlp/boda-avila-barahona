import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const session = context.cookies.get('admin_session')
    if (!session?.value) {
      return context.redirect('/admin/login')
    }
  }

  const response = await next()

  if (pathname.startsWith('/admin')) {
    response.headers.set('Cache-Control', 'no-store')
  }

  return response
})
