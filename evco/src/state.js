// store.js
import { reactive } from 'vue'

export const state = reactive({
  view: 'categories',
  selectedId: null,
  selectedName: null,
  subcatId: null,
  subcatName: null,
  productName: null,
  productId: null,
})