import SalesPopUpModel from '../models/PopUpModel'

export const addPopUp = async('/api/add', async (req, res) => {
  try {
    const popUpInfo = req.body
    const newData = new SalesPopUpModel(popUpInfo)
    const result = await newData.save()
    res.send(result)
  } catch (error) {
    res.send(err.message)
  }
})
