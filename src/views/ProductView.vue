<script setup>
import { state } from '../state';
import StarRating from '../components/StarRating.vue';
</script>

<template>
  <div class="row" style="height: 379px;">
    <div class="col-7 p-3">
      <nav class="ms-3" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" style="font-size: 12pt !important;"><a href="#">Home</a></li>
          <li class="breadcrumb-item" style="font-size: 12pt !important;"><a href="#">{{ product.category }}</a></li>
          <li class="breadcrumb-item active" style="font-size: 12pt !important;" aria-current="page">{{ state.productName }}</li>
        </ol>
      </nav>
      <div style="display: flex; justify-content: center;">
        <img v-if="product.image === null || product.image === undefined" src="../assets/noImg.png" alt="No Image Available" />
        <img v-else :src="product.image" alt="Product Image" />
      </div>
    </div>
    <div class="col p-3 me-3">
      <p style="color: black; font-size: 25pt;">{{ state.productName }}</p>
      <hr>
      <p style="font-size: 25pt;">${{ product.price }}</p>
      <StarRating v-if="product.rating !== undefined" :rating="product.rating.rate" :number="product.rating.count" :read-only="true" :increment="0.01"></StarRating>
      <p style="font-size: 12pt;">{{ product.description }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        product: {}
      }
    },
    mounted() {
      if (state.productId === null) {
        state.productId = this.$route.params.id;
      }
      this.GetThisProduct();
    },
    computed: {
      productSelect() {
        return state.productId;
      }
    },
    watch: {
      productSelect() {
        this.GetThisProduct();
      }
    },
    methods: {
      GetThisProduct() {
        fetch(`https://fakestoreapi.com/products/${state.productId}`)
            .then(res=>res.json())
            .then((json) => {
              console.log(json);
              this.product = json;            
            }).catch((error) => {
              console.error('Fetch error:', error);
            });
      },
    }
  }
</script>