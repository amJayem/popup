import mongoose from 'mongoose'

const popUpSchema = new mongoose.Schema({
  shop: {
    type: String,
    require: true
  },
  title: {
    type: String
  },
  subTitle: { type: String }
})

const SalesPopUpModel = mongoose.model('spu', popUpSchema)
export default SalesPopUpModel
