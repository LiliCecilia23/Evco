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
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 20px;">
                <h5>Hello, {{ state.loggedInUser.name.firstname.charAt(0).toUpperCase() + state.loggedInUser.name.firstname.slice(1) }}!</h5>
                <button title="View Cart" class="mt-3 btn btn-dark" href="#"><span style="font-size: 12pt; color: #f595ed !important;" class="fa-solid fa-cart-shopping me-3"></span> View My Cart</button>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input :value="state.loggedInUser.username" disabled type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon2">Email</span>
                <input :value="state.loggedInUser.email" disabled type="text" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon2">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon3">Phone</span>
                <input :value="state.loggedInUser.phone" disabled type="text" class="form-control" placeholder="Phone" aria-label="Phone" aria-describedby="basic-addon3">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon4">Address</span>
                <input :value="`${state.loggedInUser.address.number} ${state.loggedInUser.address.street}`" disabled type="text" class="form-control" placeholder="Address" aria-label="Address" aria-describedby="basic-addon4">
            </div>
            <div class="input-group">
                <span class="input-group-text">City and Zip Code</span>
                <input :value="state.loggedInUser.address.city.charAt(0).toUpperCase() + state.loggedInUser.address.city.slice(1)" disabled type="text" aria-label="City" class="form-control">
                <input :value="state.loggedInUser.address.zipcode" disabled type="text" aria-label="Zip Code" class="form-control">
            </div>
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
    mounted() {
        fetch('https://fakestoreapi.com/users/1')
            .then(res=>res.json())
            .then(json=> console.log(json))
        if (state.users.length === 0) {
            this.GetUsers();
        }
    },
    methods: {
      GetUsers() {
        fetch('https://fakestoreapi.com/users')
            .then(res=>res.json())
            .then(json=> state.users = json)
      },
      LogInUser(id) {
        fetch(`https://fakestoreapi.com/users/${id}`)
            .then(res=>res.json())
            .then(json=>state.loggedInUser = json)
      }
    }
  }
</script>