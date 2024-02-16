<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { state } from './state';
import { ref } from "vue";
const sliderValue = ref(0);
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: #595959 !important; border-bottom: 3px #F23838 solid;">
    <div class="container-fluid">
      <a class="navbar-brand ms-3" href="#">
        <img alt="Evco Logo" class="logo" src="./assets/evcoNoBg.png" height="80" />
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="col-1"></div>
        <form class="me-5 d-flex col-7" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-light" type="submit">Search</button>
        </form>
        <div class="col"></div>
        <div class="col-2">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#" style="font-size: 12pt; color: #F2E530 !important;">(979) 233-5303</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" style="font-size: 12pt; color: #F2E530 !important;">Email Us</a>
            </li>
            <!-- <li class="nav-item">
              <a class="nav-link" href="#" style="font-size: 12pt;">Order</a>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <main>
    <div v-if="state.view === 'categories'" class="row h-100">
      <div class="col-2 pt-3" style="border-right: 2px gray solid; background-color: #DFE1E2 !important;">
        <p class="ms-3" style="color: #F23838;font-size: 20px;">Categories</p>
        <ul class="list-group list-group-flush">
          <li v-for="category in categories" class="list-group-item" style="font-size: 10pt; background-color: #DFE1E2 !important;">
            <RouterLink @click="categoryClick(category.name, category.id)" :to="{ name: 'category', params: { name: category.name.replace(/\s/g, '')}}">{{ category.name }}</RouterLink>
          </li>
        </ul>
      </div>
      <div class="col-10">
        <RouterView />
      </div>
    </div>
    <div v-if="state.view === 'products'" class="row h-100">
      <div class="col-2 pt-3" style="border-right: 2px gray solid; background-color: #DFE1E2 !important;">
        <p class="ms-3" style="color: #F23838;font-size: 20px;">Filter By</p>
        <div>
          <p class="ms-3" style="color: #595959;font-size: 15px;">{{state.filters[0].name}}</p>
          <ul class="list-group list-group-flush">
            <li v-for="choice in state.filters[0].choices" class="list-group-item" style="background-color: #DFE1E2 !important;">
              <input class="form-check-input me-1" type="checkbox" value="" id="`${choice.replace(/\s/g, '')}`">
              <label class="form-check-label" for="`${choice.replace(/\s/g, '')}`">{{ choice }}</label>
            </li>
          </ul>
          <p class="ms-3" style="color: #595959;font-size: 15px;">Price</p>
          <div class="custom-slider px-3">
            <input v-model="sliderValue" type="range" class="form-range" :min="findSmallestDecimal(state.filters[1].choices)" :max="findLargestDecimal(state.filters[1].choices)" id="priceRange">
            <br />
            <input v-model="sliderValue" type="number" />
          </div>
        </div>
      </div>
      <div class="col-10 pt-3">
        <RouterView />
      </div>
    </div>
    <div v-if="state.view === 'productPage'" class="row h-100 p-3">
      <div class="col-12">
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
      categoryClick(name, id) {
        state.selectedId = id;
        state.selectedName = name;
      },
      productClick(name, id) {
        state.productId = id;
        state.productName = name;
      },
      GetCategories() {
        fetch('/api/data/categories/parents')
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
