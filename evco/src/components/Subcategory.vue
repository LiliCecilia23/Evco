<script setup>
defineProps(['item']);
</script>
<template>
    <div class="container">
        <img :src="item.imgUrl" style="height: 50px;">
        <p style="text-align: center !important;">{{ item.name }}</p>
    </div>
</template>