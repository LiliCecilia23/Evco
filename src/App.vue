<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { state } from './state';
import { ref } from "vue";
const sliderValue = ref(0);
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary py-0" style="background-color: white !important; border-bottom: 3px #f595ed solid;">
    <div class="container-fluid py-0 row">
      <a class="navbar-brand ms-3 p-1 col-1" href="#" @click="homeClick()">
        <img alt="Fake Lc.co Logo" class="logo" src="./assets/lightlogo.png" height="100" />
      </a>
      <div class="col-4">
        <ul class="ps-3 navbar-nav me-auto mb-2 mb-lg-0">
          <li v-for="category in categories" class="nav-item me-3">
            <RouterLink style="font-size: 12pt; color: black !important; font-weight: bold;" @click="categoryClick(category.name, category.id)" :to="{ name: 'category', params: { name: category.name.replace(/\s/g, '')}}">{{ category.name }}</RouterLink>
          </li>
        </ul>
      </div>
      <div class="col"></div>
      <div class="input-group col">
        <input @keyup.enter="Search('key')" v-model="searchTerm" style="border: 1px solid black;" type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2" />
        <button @click="Search('btn')" ref="myBtn" class="btn btn-dark rounded" type="button" id="button-addon2" data-bs-toggle="dropdown" aria-expanded="false"><span style="font-size: 12pt; color: #f595ed !important;" class="fa-solid fa-magnifying-glass"></span></button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li v-for="res in results"><a class="dropdown-item" href="#">{{ res.title.length > 50 ? `${res.title.substring(0, 50)}...` : res.title }}</a></li>
        </ul>
      </div>
      <div class="col-1">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item me-3">
            <button title="Log In" class="btn btn-dark" href="#" @click="loginClick"><span style="font-size: 12pt; color: #f595ed !important;" class="fa-solid fa-right-to-bracket"></span></button>
          </li>
          <li class="nav-item">
            <button title="View Cart" class="btn btn-dark" href="#"><span style="font-size: 12pt; color: #f595ed !important;" class="fa-solid fa-cart-shopping"></span></button>
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
        searchTerm: '',
        products: [],
        results: [],
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
    mounted() {
      this.GetAllProducts();
    },
    methods: {
      homeClick() {
        this.$router.push({
          name: 'home'
        })
      },
      loginClick() {
        this.$router.push({
          name: 'login'
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
      GetAllProducts() {
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>this.products = json);
      },
      Search(method) {
        if (method === 'key') {
          const elem = this.$refs.myBtn
          elem.click()
        } else {
          this.results = [];
          const term = this.searchTerm;
          if (this.searchTerm !== '') {
            this.products.map((item) => {
              if (item.title.toLowerCase().includes(term) || item.category.includes(term)) {
                this.results.push(item);
              }
            })
          } else {
            this.results = this.products;
          }
        }
      }
    }
  }
</script>
