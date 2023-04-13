import PopUpRoute from './PopUpRoute.js'

const mainRoutes = (app) => {
  app.use('/api/add', PopUpRoute)
}

export default mainRoutes
