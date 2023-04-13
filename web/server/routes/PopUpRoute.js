import { Router } from 'express'
import { PopUpController } from '../controller/PopUpController'

const PopUpRoute = Router()

PopUpRoute.route('/').post(PopUpController)

export default PopUpRoute
