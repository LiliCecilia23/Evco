<script setup>
defineProps(['item']);
</script>
<template>
    <div class="p-3" style="border: 1px solid #E6E6E6; height: 330px; display: flex; flex-direction: column;">
        <!-- <img src="../assets/wrenchIcon.png" style="height: 50px;"> -->
        <img :src="item.image" style="height: 200px; align-self: center;" />
        <p style="font-weight: bold; height: 64px;" class="pt-3">{{ item.title }}</p>
        <p style="margin-bottom: 0px;">${{ item.price }}</p>
    </div>
</template>