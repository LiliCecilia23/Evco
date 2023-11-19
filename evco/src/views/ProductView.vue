<script setup>
import { state } from '../state'
</script>

<template>
  <div class="row" style="height: 379px;">
    <div class="col-7">
      <nav class="ms-3" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" style="font-size: 12pt !important;"><a href="#">Home</a></li>
          <li class="breadcrumb-item" style="font-size: 12pt !important;"><a href="#">{{ product.Category }}</a></li>
          <li class="breadcrumb-item active" style="font-size: 12pt !important;" aria-current="page">{{ state.productName }}</li>
        </ol>
      </nav>
      <div style="display: flex; justify-content: center;">
        <img v-if="product.imgUrl === null || product.imgUrl === undefined" src="../assets/noImg.png" alt="No Image Available" />
        <img v-else :src="product.imgUrl" alt="Product Image" />
      </div>
    </div>
    <div class="col-5">
      <p style="color: #F23838; font-size: 25pt;">{{ state.productName }}</p>
      <p style="color:#565659; font-size: 12pt; font-weight: light; margin-top: -15px;">Part #{{ product.Part_Number }}</p>
      <hr>
      <p style="font-size: 25pt;">${{ product.List_Price }}</p>
      <!-- <p style="color:#565659; font-size: 12pt; font-weight: light;">Product Specifications</p>
      <table class="table table-striped">
        <tbody>
          <tr>
            <th scope="row">Height</th>
            <td>{{ product.Height }}</td>
          </tr>
          <tr>
            <th scope="row">Weight</th>
            <td>{{ product.Weight }}</td>
          </tr>
          <tr>
            <th scope="row">Length</th>
            <td>{{ product.Length }}</td>
          </tr>
          <tr>
            <th scope="row">Width</th>
            <td>{{ product.Width }}</td>
          </tr>
        </tbody>
      </table> -->
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
        fetch(`http://localhost:1433/api/data/product/${state.productId}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            this.product = data[0];
            console.log(this.product.Part_Number)
            
          }).catch((error) => {
            console.error('Fetch error:', error);
          });
      },
    }
  }
</script>