import SalesPopUpModel from '../models/PopUpModel.js'

export const PopUpController =
  ('/api/add',
  async (req, res) => {
    try {
      const popUpInfo = req.body
      const shop = res.locals.shopify.session.shop
      // console.log(popUpInfo)
      const data = { ...popUpInfo, shop: shop }
      const result = await SalesPopUpModel.findOneAndUpdate(
        { shop: shop },
        data,
        {
          upsert: true,
          new: true
        }
      )
      // console.log(result)
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
