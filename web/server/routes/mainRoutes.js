import PopUpRoute from './PopUpRoute.js'
import ThemeRoute from './ThemeRoute.js'

const mainRoutes = (app) => {
  app.use('/api/add', PopUpRoute)
  app.use('/api/theme', ThemeRoute)
  app.use('/api/test', (req, res) => {
    res.send({ message: 'ok' })
  })
}

export default mainRoutes
