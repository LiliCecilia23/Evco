<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { state } from './state';
import { ref } from "vue";
const sliderValue = ref(0);
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary py-0" style="background-color: black !important; border-bottom: 3px #f595ed solid;">
    <div class="container-fluid py-0 row">
      <a class="navbar-brand ms-3 py-0 col-1" href="#" @click="homeClick()">
        <img alt="Evco Logo" class="logo" src="./assets/Lc.Co.png" height="100" />
      </a>
      <div class="col-4">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-for="category in categories" class="nav-item me-3">
            <RouterLink style="font-size: 12pt; color: #f595ed !important;" @click="categoryClick(category.name, category.id)" :to="{ name: 'category', params: { name: category.name.replace(/\s/g, '')}}">{{ category.name }}</RouterLink>
          </li>
        </ul>
      </div>
      <div class="col"></div>
      <div class="input-group col">
        <input type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2">
        <button class="btn btn-outline-light" type="button" id="button-addon2"><span style="font-size: 12pt; color: #f595ed !important;" class="fa-solid fa-magnifying-glass"></span></button>
      </div>
      <div class="col-2">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item me-3">
            <button title="Log In" class="btn btn-outline-light" href="#"><span style="font-size: 12pt; color: #f595ed !important;" class="fa-solid fa-right-to-bracket me-2"></span>Sign In</button>
          </li>
          <li class="nav-item">
            <button title="View Cart" class="btn btn-outline-light" href="#"><span style="font-size: 12pt; color: #f595ed !important;" class="fa-solid fa-cart-shopping me-2"></span>Cart</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <main>
    <RouterView />
  </main>

  <!-- <main>
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
          <p class="ms-3" style="color: black;font-size: 15px;">{{state.filters[0].name}}</p>
          <ul class="list-group list-group-flush">
            <li v-for="choice in state.filters[0].choices" class="list-group-item" style="background-color: #DFE1E2 !important;">
              <input class="form-check-input me-1" type="checkbox" value="" id="`${choice.replace(/\s/g, '')}`">
              <label class="form-check-label" for="`${choice.replace(/\s/g, '')}`">{{ choice }}</label>
            </li>
          </ul>
          <p class="ms-3" style="color: black;font-size: 15px;">Price</p>
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
  </main> -->
</template>

<script>
  export default {
    data() {
      return {
        categories: [
          {
            name: 'Electronics',
            id: 'electronics'
          },
          {
            name: 'Jewelery',
            id: 'jewelery'
          },
          {
            name: "Men's",
            id: "men's clothing"
          },
          {
            name: "Women's",
            id: "women's clothing"
          }
        ],
        selected: null,
      }
    },
    methods: {
      homeClick() {
        this.$router.push({
          name: 'home'
        })
      },
      categoryClick(name, id) {
        state.selectedId = id;
        state.selectedName = name;
      },
      productClick(name, id) {
        state.productId = id;
        state.productName = name;
      },
      uniq(a) {
        return a.sort().filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
        });
      }
    }
  }
</script>
