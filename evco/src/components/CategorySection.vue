<script setup>
defineProps({category});
</script>
<template>
    <div class="container">
        <h5>{{ category }}</h5>
        <ul>
            <li v-for="product in products">{{ product.name }}</li>
        </ul>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        products: [],
        selected: 0,
      }
    },
    mounted() {
      this.GetProducts();
    },
    methods: {
      GetProducts() {
        fetch(`http://localhost:1433/api/data/products/${this.category}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            
          }).catch((error) => {
            console.error('Fetch error:', error);
          });
      },
    }
  }
</script>