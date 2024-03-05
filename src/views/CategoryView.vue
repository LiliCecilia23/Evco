<script setup>
import productListItem from '../components/ProductListItem.vue'

import { state } from '../state'
</script>

<template>
  <p class="ms-3 my-3" style="color: #5E645F; font-size: 20px;">{{ state.selectedName }}</p>
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
      },
    },
    watch: {
      currentCategory() {
        this.GetThisCategory();
      },
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
      ProductClick(name, id) {
            state.productId = id;
            state.productName = name;
            state.view = 'productPage';
            this.$router.push({
                name: 'product',
                // preserve current path and remove the first char to avoid the target URL starting with `//`
                params: { pathMatch: this.$route.path.substring(1).split('/'), id: id },
                // preserve existing query and hash if any
                query: this.$route.query,
                hash: this.$route.hash,
            })
        },
    }
  }
</script>