<script setup>
import subcategory from './Subcategory.vue';
import { state } from '../state'

defineProps(['section']);
</script>
<template>
    <div class="container">
        <h5>{{ section.name }}<span v-if="subcats.length === 0" class="ms-2" style="color: #F23838;">→</span></h5>
        <ul v-if="subcats.length > 0" class="list-group list-group-horizontal" style="width: 70vw; overflow-x: scroll;">
          <li v-for="subcat in subcats" class="list-group-item" style="text-align: center; padding: 0px !important; width: 100px;">
            <subcategory @click="subcat.hasChildren === 1 ? GetSubs(subcat.name, subcat.id) : SubcatClick(subcat.name, subcat.id)" :item="subcat"></subcategory>
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
      GetSubcategories() {
        fetch(`https://evco.azurewebsites.net/api/data/categories/${this.section.id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            this.subcats = data;
          }).catch((error) => {
            console.error('Fetch error:', error);
          });
      },
      GetSubs(name, id) {
        state.selectedName = `${state.selectedName} >> ${name}`;
        state.selectedId = id;
      },
      SubcatClick(name, id) {
        console.log(this.$route.params);
        state.subcatId = id;
        state.subcatName = name;
        // state.view = 'products';
        this.$router.push({
          name: 'subcat',
          params: { name: 'home', subcat: name.replace(/\s/g, '') },
          // preserve existing query and hash if any
          // query: this.$route.query,
          // hash: this.$route.hash,
        })
      },
      GetThisCategory(id) {
        fetch(`https://evco.azurewebsites.net/api/data/categories/${id}`)
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