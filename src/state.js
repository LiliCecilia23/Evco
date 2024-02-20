// store.js
import { reactive } from 'vue'

export const state = reactive({
  baseUrl: 'fake.url',
  view: 'categories',
  selectedId: null,
  selectedName: null,
  subcatId: null,
  subcatName: null,
  productName: null,
  productId: null,
  filters: [
    {
      name: 'Manufacturer',
      choices: [],
    },
    {
      name: 'List Price',
      choices: [],
    }
  ]
})