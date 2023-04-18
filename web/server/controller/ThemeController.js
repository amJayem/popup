import shopify from '../../shopify.js'

export const ThemeController =
  ('/api/theme',
  async (req, res) => {
    try {
      const session = res.locals.shopify.session
      const result = await shopify.api.rest.Theme.all({
        session: session
      })

      console.log({ result })
      res.status(200).json({ success: true, result })
    } catch (error) {
      res.json({ message: error.message })
    }
  })
