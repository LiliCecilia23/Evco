<script setup>
defineProps(['item']);
</script>
<template>
    <div class="container">
        <img src="../assets/wrenchIcon.png" style="height: 50px;">
        <p style="text-align: center !important;">{{ item.name }}</p>
    </div>
</template>