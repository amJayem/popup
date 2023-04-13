import PopUpRoute from './PopUpRoute'

const mainRoutes = (app) => {
  app.use('/api/add', PopUpRoute)
}

export default mainRoutes
