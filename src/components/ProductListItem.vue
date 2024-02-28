<script setup>
defineProps(['item']);
</script>
<template>
    <div class="p-3" style="border: 1px solid #E6E6E6;">
        <!-- <img src="../assets/wrenchIcon.png" style="height: 50px;"> -->
        <p>{{ item.title }}</p>
        <img :src="item.image" style="height: 200px;" />
        <p>${{ item.price }}</p>
    </div>
</template>