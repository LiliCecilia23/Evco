<script setup>
import subcategory from '../components/Subcategory.vue';

import { state } from '../state'
</script>

<template>
  <p class="ms-3" style="color: #F2B035; font-size: 20px;">{{ state.selectedName }}</p>
  <ul v-if="subcats.length > 0" class="list-group list-group-horizontal" style="width: 70vw; overflow-x: scroll;">
    <li v-for="subcat in subcats" class="list-group-item" style="text-align: center; padding: 0px !important; width: 100px;">
      <subcategory @click="subcat.hasChildren === 1 ? GetSubs(subcat.name, subcat.id) : SubcatClick(subcat.name, subcat.id)" :item="subcat"></subcategory>
    </li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        subcats: []
      }
    },
    computed: {
      currentCategory () {
        return state.selectedId;
      }
    },
    watch: {
      currentCategory() {
        this.GetThisCategory();
      }
    },
    methods: {
      GetThisCategory() {
        fetch(`https://mango-pebble-0e2297810.4.azurestaticapps.net/api/data/categories/${state.selectedId}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
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
        state.subcatId = id;
        state.subcatName = name;
        // state.view = 'products';
        this.$router.push({
        name: 'subcat',
        params: { name: this.$route.params.name, subcat: name.replace(/\s/g, '') },
        // preserve existing query and hash if any
        // query: this.$route.query,
        // hash: this.$route.hash,
      })
      }
    }
  }
</script>