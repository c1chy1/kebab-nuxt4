import compression from 'compression'

const compress = compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    const contentType = res.getHeader('content-type') as string | undefined
    if (contentType && /image\//.test(contentType)) return false
    return compression.filter(req, res)
  },
})

export default defineEventHandler((event) => {
  return new Promise<void>((resolve) => {
    compress(event.node.req, event.node.res, () => resolve())
  })
})
