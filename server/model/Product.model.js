import mongoose from 'mongoose'

const productShema = new mongoose.Schema({
  id: String,
  title: String,
  image: String,
  price: Number,
  description: String
})

export default mongoose.model('products', productShema)
