<script setup>
import subcategory from './Subcategory.vue';
defineProps(['section']);
</script>
<template>
    <div class="container">
        <h5>{{ section.name }}<span v-if="subcats.length === 0" class="ms-2" style="color: #4DAA57;">→</span></h5>
        <ul v-if="subcats.length > 0" class="list-group list-group-horizontal" style="width: 70vw; overflow-x: scroll;">
          <li v-for="subcat in subcats" class="list-group-item" style="text-align: center; padding: 0px !important; width: 100px;">
            <subcategory :item="subcat"></subcategory>
          </li>
        </ul>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        subcats: [],
        selected: 0,
      }
    },
    mounted() {
      this.GetSubcategories();
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
            // this.products = data;
            
          }).catch((error) => {
            console.error('Fetch error:', error);
          });
      },
      GetSubcategories() {
        fetch(`http://localhost:1433/api/data/categories/${this.section.id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            this.subcats = data;
            // data.map((category) => {
            //   if (category.parentCategory === 1 && category.hasChildren === 1) {

            //   }
            // })
            
          }).catch((error) => {
            console.error('Fetch error:', error);
          });
      },
      GetThisCategory(id) {
        fetch(`http://localhost:1433/api/data/categories/${id}`)
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
      }
    }
  }
</script>