// @ts-check
import { join } from 'path'
import { readFileSync } from 'fs'
import express from 'express'
import serveStatic from 'serve-static'

import shopify from './shopify.js'
import productCreator from './product-creator.js'
import GDPRWebhookHandlers from './gdpr.js'

import mongoose from 'mongoose'
import mainRoutes from './server/routes/mainRoutes.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10)

const STATIC_PATH =
  process.env.NODE_ENV === 'production'
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`

const app = express()

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin())
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
)
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
)

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use('/api/*', shopify.validateAuthenticatedSession())

app.use(express.json())

app.get('/api/products/count', async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session
  })
  res.status(200).send(countData)
})

// ===================================================================

mainRoutes(app)

app.put('/api/theme-files', async (req, res) => {
  try {
    const session = res.locals.shopify.session
    const id = req.body.id
    let isExist = false
    const body = await shopify.api.rest.Asset.all({
      session: session,
      theme_id: id,
      asset: { key: 'layout/theme.liquid' }
    })
    const htmlFile = body[0].value
    console.log(body)
    if (htmlFile.includes('jayem')) {
      isExist = true
    } else {
      isExist = false
      let result = htmlFile.split('</body>')
      result = result.join(`
        <!--   Sales popup Code Start -->
           <script src="https://salespopup-server.vercel.app/api/cdn/js"></script>
        <!--   Sales popup Code End -->
        </body>
        `)

      const asset = new shopify.api.rest.Asset({ session: session })
      asset.theme_id = id
      asset.key = 'layout/theme.liquid'
      asset.value = result
      await asset.save({
        update: true
      })
    }

    res.status(200).json({
      success: true,
      message: 'ok',
      isExist
    })
  } catch (error) {
    res.status(500).json({
      message: 'There was an error',
      error: error.message
    })
  }
})

const dbUrl = process.env.DB_URL

try {
  // @ts-ignore
  await mongoose.connect(dbUrl)
  console.log('***Connected to database***')
} catch (error) {
  console.error('Unable to connect mongodb', error.message)
}

// ===================================================================

app.get('/api/products/create', async (_req, res) => {
  let status = 200
  let error = null

  try {
    await productCreator(res.locals.shopify.session)
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`)
    status = 500
    error = e.message
  }
  res.status(status).send({ success: status === 200, error })
})

app.use(shopify.cspHeaders())
app.use(serveStatic(STATIC_PATH, { index: false }))

app.use('/*', shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set('Content-Type', 'text/html')
    .send(readFileSync(join(STATIC_PATH, 'index.html')))
})

app.listen(PORT)
