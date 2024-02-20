<script setup>
import categorySection from '../components/CategorySection.vue'
</script>

<template>
  <p class="ms-3 pt-3" style="color: #F23838; font-size: 20px;">All Categories</p>
  <ul class="list-group list-group-flush">
    <categorySection v-for="category in categories" :section="category" class="list-group-item" style="font-size: 10pt;"></categorySection>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        categories: [],
        selected: 0,
      }
    },
    mounted() {
      this.GetCategories();
    },
    methods: {
      GetCategories() {
        fetch('https://fakestoreapi.com/products/categories')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            this.categories = data;
          }).catch((error) => {
            console.error('Fetch error:', error);
          });
      },
      uniq(a) {
        return a.sort().filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
        });
      }
    }
  }
</script>