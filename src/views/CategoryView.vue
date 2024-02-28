<script setup>
import subcategory from '../components/Subcategory.vue';
import productListItem from '../components/ProductListItem.vue'

import { state } from '../state'
</script>

<template>
  <p class="ms-3" style="color: #F2B035; font-size: 20px;">{{ state.selectedName }}</p>
  <div v-if="products.length > 0" class="row px-3">
    <div v-for="product in products" class="col-4 px-0">
      <productListItem @click="ProductClick(product.title, product.id)" :item="product"></productListItem>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        products: []
      }
    },
    computed: {
      currentCategory () {
        return state.selectedName;
      }
    },
    watch: {
      currentCategory() {
        this.GetThisCategory();
      }
    },
    mounted() {
      this.GetThisCategory();
    },
    methods: {
      GetThisCategory() {
        fetch(`https://fakestoreapi.com/products/category/${state.selectedId}`)
        .then(res=>res.json())
            .then((json) => {
              this.products = json;
            }).catch((error) => {
            console.error('Fetch error:', error);
          });
      },
    }
  }
</script>