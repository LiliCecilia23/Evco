<script setup>

</script>

<template>
  <main>
    <div class="row h-100 p-3">
      <div class="col-2" style="border-right: 2px gray solid;">
        <p style="border-bottom: 1px black solid;">Categories</p>
        <ul class="list-group list-group-flush">
          <li v-for="category in categories" class="list-group-item" style="font-size: 10pt;">{{ category }}</li>
        </ul>
      </div>
      <div class="col-10">
        All Categories
      </div>
    </div>
  </main>
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
        fetch('http://localhost:1433/api/data/categories')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            data.map((category) => {
              if (category.Category.includes('->')) {
                const parentCategory = category.Category.substring(0, category.Category.indexOf('->'))
                if (parentCategory.includes('(')) {
                  const parentCategoryNoParens = parentCategory.substring(0, parentCategory.indexOf(' ('))
                  this.categories.push(parentCategoryNoParens);
                } else {
                  this.categories.push(parentCategory);
                } 
              } else if (!category.Category.includes('->')) {
                if (category.Category.includes('(')) {
                  const categoryNoParens = category.Category.substring(0, category.Category.indexOf(' ('))
                  this.categories.push(categoryNoParens);
                } else {
                  this.categories.push(category.Category);
                }
              }
            });
            this.categories = this.uniq(this.categories);
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