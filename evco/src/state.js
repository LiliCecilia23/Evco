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
  filters: [
    {
      name: 'Manufacturer',
      choices: [],
    },
    {
      name: 'Cost',
      choices: [],
    },
    {
      name: 'List Price',
      choices: [],
    },
    {
      name: 'Weight',
      choices: [],
    },
    {
      name: 'Length',
      choices: [],
    },
    {
      name: 'Width',
      choices: [],
    },
    {
      name: 'Height',
      choices: [],
    },
  ]
})