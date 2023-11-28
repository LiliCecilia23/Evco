<script setup>
import productListItem from '../components/ProductListItem.vue'
import { state } from '../state'
</script>

<template>
  <p class="ms-3 mt-3" style="color: #F23838; font-size: 20px;">{{ state.subcatName }} ({{ products.length }} Products)</p>
  <div v-if="products.length > 0" class="row px-3">
    <div v-for="product in products" class="col-4 px-0">
      <productListItem @click="ProductClick(product.Title, product.Part_Number)" :item="product"></productListItem>
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
            fetch(`${process.env.BASE_URL}api/data/products/${state.subcatId}`)
            .then((response) => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                state.filters[0].choices = [];
                state.filters[1].choices = [];
                this.products = data;
                data.map((product) => {
                  // Manufacturer
                  state.filters[0].choices.indexOf(product.Manufacturer_Name) === -1 && state.filters[0].choices.push(product.Manufacturer_Name);
                  // List Price
                  state.filters[1].choices.indexOf(product.List_Price) === -1 && state.filters[1].choices.push(product.List_Price);
              });
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