<script setup>
defineProps(['section']);
</script>
<template>
    <div class="container">
        <h5>{{ section.name }}</h5>
        <ul>
          <li v-for="product in products">{{ product.Title }}</li>
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
        fetch(`http://localhost:1433/api/data/products/${this.section.id}`)
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