import mongoose from 'mongoose'

const popUpSchema = new mongoose.Schema({
  shop: {
    type: String,
    require: true
  },
  textColor: {
    type: String
  },
  bgColor: { type: String },
  product: { type: Array }
})

const SalesPopUpModel = mongoose.model('spu', popUpSchema)
export default SalesPopUpModel
