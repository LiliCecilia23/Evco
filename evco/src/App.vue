<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: white !important; border-bottom: 2px #4DAA57 solid;">
    <div class="container-fluid">
      <a class="navbar-brand ms-3" href="#">
        <img alt="Evco Logo" class="logo" src="./assets/evcoGear.png" width="100" height="50" />
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="col-1"></div>
        <form class="me-5 d-flex col-7" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <div class="col-1"></div>
        <div class="col-3">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#" style="font-size: 12pt;">(979) 233-5303</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" style="font-size: 12pt;">Email Us</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" style="font-size: 12pt;">Order</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <main>
    <div class="row h-100 p-3">
      <div class="col-2" style="border-right: 2px gray solid;">
        <p class="ms-3" style="color: #4DAA57;font-size: 20px;">Categories</p>
        <ul class="list-group list-group-flush">
          <li v-for="category in categories" class="list-group-item" style="font-size: 10pt;">
            <RouterLink :to="`/category/${category.name}`">{{ category.name }}</RouterLink>
          </li>
        </ul>
      </div>
      <div class="col-10">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    data() {
      return {
        categories: [],
        selected: null,
      }
    },
    mounted() {
      this.GetCategories();
    },
    methods: {
      // categoryClick(name) {
      //   router.push(`/category/${name}`)
      // },
      GetCategories() {
        fetch('http://localhost:1433/api/data/categories/parents')
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
