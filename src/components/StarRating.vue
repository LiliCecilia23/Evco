<script setup>
defineProps(['rating', 'number']);
</script>
<template>
    <div class="star-rating">
        <span v-for="n in 5">&star;</span>
        <div class="star-rating__current" :style="{width: getRating + '%'}">
            <span v-for="n in 5">&starf;</span>
        </div>
    </div>
  <span>({{ number }})</span>
</template>
<script>
    export default {
        computed: {
            getRating: function() {
                return (this.rating / 5) * 100
            }
        }
    }
</script>
<style scoped>
.star-rating {
  color: #f595ed  !important;
  display: inline-block;
  font-size: 2em;
  position: relative;
  transform: translate(-6px);
}

.star-rating__max,
.star-rating__current {
  position: absolute;
  top: 0;
}

.star-rating__current {
  overflow: hidden;
  white-space: nowrap;
}
</style>