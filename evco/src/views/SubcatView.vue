<script setup>
import productListItem from '../components/ProductListItem.vue'
import { state } from '../state'
</script>

<template>
  <p class="ms-3" style="color: #4DAA57; font-size: 20px;">{{ state.subcatName }}</p>
  <ul v-if="products.length > 0" class="list-group list-group-flush">
    <li v-for="product in products" class="list-group-item">
      <productListItem :item="product"></productListItem>
    </li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        products: []
      }
    },
    computed: {
      subcatProducts() {
        this.GetProducts();
        return state.subcatId;
      }
    },
    watch: {
      subcatProducts() {
        this.GetProducts();
      }
    },
    methods: {
        GetProducts() {
            fetch(`http://localhost:1433/api/data/products/${state.subcatId}`)
            .then((response) => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                this.products = data;
                
            }).catch((error) => {
                console.error('Fetch error:', error);
            });
        },
        ProductClick(name, id) {
            state.productId = id;
            state.productName = name;
            this.$router.push({
                name: 'product',
                // preserve current path and remove the first char to avoid the target URL starting with `//`
                params: { pathMatch: this.$route.path.substring(1).split('/') },
                // preserve existing query and hash if any
                query: this.$route.query,
                hash: this.$route.hash,
            })
        },
        GetSubs(name, id) {
            state.selectedName = `${state.selectedName} >> ${name}`;
            state.selectedId = id;
        },
        SubcatClick(name, id) {
            state.subcatId = id;
            state.subcatName = name;
            this.$router.push({
                name: 'subcategory',
                // preserve current path and remove the first char to avoid the target URL starting with `//`
                params: { pathMatch: this.$route.path.substring(1).split('/') },
                // preserve existing query and hash if any
                query: this.$route.query,
                hash: this.$route.hash,
            })
        }
    }
  }
</script>