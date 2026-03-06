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
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    response.headers.set('CDN-Cache-Control', 'no-store')
    response.headers.set('Vercel-CDN-Cache-Control', 'no-store')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }

  return response
})
