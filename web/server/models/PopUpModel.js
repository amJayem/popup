import mongoose from 'mongoose'

const popUpSchema = new mongoose.Schema({
  title: {
    type: String
  },
  subTitle: { type: String }
})

const SalesPopUpModel = mongoose.model('spu', popUpSchema)
export default SalesPopUpModel
