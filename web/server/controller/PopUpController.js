import SalesPopUpModel from '../models/PopUpModel.js'

export const PopUpController =
  ('/api/add',
  async (req, res) => {
    try {
      const popUpInfo = req.body
      const shop = res.locals.shopify.session.shop
      // console.log(popUpInfo)
      const data = { ...popUpInfo, shop: shop }
      const newData = new SalesPopUpModel(data)
      const result = await newData.save()
      console.log(result)
      res.status(200).send({
        result,
        acknowledged: true,
        status: 200,
        message: 'successfully added'
      })
    } catch (error) {
      res.send(err.message)
    }
  })
