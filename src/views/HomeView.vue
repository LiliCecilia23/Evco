<script setup>
import { state } from '../state'
</script>
<template>
    <div class="row" style="background-color: white;">
      <div class="col"></div>
      <div id="carouselExampleRide" class="carousel slide col-7" data-bs-ride="true">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="/Evco/assets/pexels-juan-mendez-1536619.jpg" @click="categoryClick(`women's clothing`)" class="d-block w-100" alt="Yellow Background Fashionable Woman">
        </div>
        <div class="carousel-item">
          <img src="/Evco/assets/pexels-andrea-piacquadio-845434.jpg" @click="categoryClick(`men's clothing`)" class="d-block w-100" alt="Man against blue bricks">
        </div>
        <div class="carousel-item">
          <img src="/Evco/assets/pexels-alex-kinkate-205926.jpg" @click="categoryClick('electronics')" class="d-block w-100" alt="Headphones">
        </div>
        <div class="carousel-item">
          <img src="/Evco/assets/pexels-cottonbro-studio-6662322.jpg" @click="categoryClick('jewelery')" class="d-block w-100" alt="Woman with painted face wearing jewelry">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="col"></div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        categories: [],
        selected: 0,
      }
    },

    methods: {
      categoryClick(cat) {
        console.log(cat)
        state.selectedName = this.GetName(cat);
        state.selectedId = cat;

        this.$router.push({
          name: 'category',
          params: { name: cat }
        })
      },
      GetName(cat) {
        switch (cat) {
          case 'electronics': 
            return 'Electronics'
          case 'jewelery':
            return 'Jewelery'
          case "men's clothing":
            return "Men's Clothing"
          case "women's clothing":
            return "Women's Clothing"
        }
      }
    }
  }
</script>