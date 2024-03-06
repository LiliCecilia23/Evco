<script setup>
import { state } from '../state'
</script>
<template>
    <div class="row" style="background-color: white;">
        <div class="col"></div>
        <div v-if="state.loggedInUser === null" class="col-6">
            <h5 class="my-3">Select a user profile:</h5>
            <div class="list-group">
                <a v-for="user in state.users" href="#" @click="LogInUser(user.id)" class="list-group-item list-group-item-action" aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                        <p class="mb-1">{{ user.name.firstname.charAt(0).toUpperCase() + user.name.firstname.slice(1) }} {{  user.name.lastname.charAt(0).toUpperCase() + user.name.lastname.slice(1) }}</p>
                        <small>@{{ user.username }}</small>
                    </div>
                </a>
            </div>
        </div>
        <div v-else class="col-6 py-3">
            <ul v-if="cart.length > 0" class="list-group">
                <li v-for="item in cart" class="list-group-item">
                    <div class="d-flex w-100 justify-content-between">
                        <div style="display: flex; flex-direction: row;">
                            <div style="width: 55px">
                                <img :src="item.product.image" style="height: 60px;" />
                            </div>
                            <div>
                                <h6 class="mb-1 ms-2">{{ item.product.title }}</h6>
                                <span class="ms-2 badge text-bg-dark" style="background-color: #f595ed !important; color: black !important">{{ item.amount }}</span>
                            </div>
                        </div>
                        <h6>${{ (Math.round(item.product.price * 100) / 100).toFixed(2) }}</h6>
                    </div>
                </li>
            </ul>
            <div v-else>
                <h5>No products are currently in your cart.</h5>
            </div>
        </div>
        <div class="col"></div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        cart: [],
        selected: 0,
      }
    },
    mounted() {
        if (state.loggedInUser !== null) {
            this.GetCart();
        } else {
            this.GetUsers();
        }
    },
    methods: {
      GetCart() {
        this.cart = [];
        fetch(`https://fakestoreapi.com/carts/user/${state.loggedInUser.id}`)
            .then(res=>res.json())
            .then((json) => {
                json[0].products.map((product) => {
                    this.GetProduct(product.productId, product.quantity)
                });
            })
      },
      GetProduct(id, quantity) {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then((json) => {
                console.log(json)
                this.cart.push({
                    product: json,
                    amount: quantity,
                })
            })
      }, 
      GetUsers() {
        fetch('https://fakestoreapi.com/users')
            .then(res=>res.json())
            .then(json=> state.users = json)
      },
      LogInUser(id) {
        fetch(`https://fakestoreapi.com/users/${id}`)
            .then(res=>res.json())
            .then((json) => {
                state.loggedInUser = json
                this.GetCart();
            })
      }
    }
  }
</script>