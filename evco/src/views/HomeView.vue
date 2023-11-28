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
        fetch(`${process.env.BASE_URL}api/data/categories/parents`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            this.categories = data.sort(function(a, b) {
                let textA = a.name.toUpperCase();
                let textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            // data.map((category) => {
            //   if (category.Category.includes('->')) {
            //     const parentCategory = category.Category.substring(0, category.Category.indexOf('->'))
            //     if (parentCategory.includes('(')) {
            //       const parentCategoryNoParens = parentCategory.substring(0, parentCategory.indexOf(' ('))
            //       this.categories.push(parentCategoryNoParens);
            //     } else {
            //       this.categories.push(parentCategory);
            //     } 
            //   } else if (!category.Category.includes('->')) {
            //     if (category.Category.includes('(')) {
            //       const categoryNoParens = category.Category.substring(0, category.Category.indexOf(' ('))
            //       this.categories.push(categoryNoParens);
            //     } else {
            //       this.categories.push(category.Category);
            //     }
            //   }
            // });
            // this.categories = this.uniq(this.categories);
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