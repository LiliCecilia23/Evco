<script setup>
defineProps(['item']);
</script>
<template>
    <div class="p-3" style="border: 1px solid #E6E6E6;">
        <!-- <img src="../assets/wrenchIcon.png" style="height: 50px;"> -->
        <p>{{ item.Title }}</p>
        <p style="color:#565659; font-size: 10pt; font-weight: light; margin-top: -15px;">Part #{{ item.Part_Number }}</p>
        <p>${{ item.List_Price }}</p>
    </div>
</template>