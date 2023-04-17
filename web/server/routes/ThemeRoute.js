import { Router } from 'express'
import { ThemeController } from '../controller/ThemeController.js'

const ThemeRoute = Router()

ThemeRoute.route('/').get(ThemeController)

export default ThemeRoute
