import { router } from '@muzamint/erica-items-db'

export default {
  async fetch(request: Request, server: Server) {
  return router.handle(request)
  },
}
