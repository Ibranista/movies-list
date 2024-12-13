<script setup lang="ts">
import MovieList from "./components/MovieList.vue";
</script>

<template>
  <div class="app-container">
    <h1
      class="text-4xl font-extrabold text-center text-gray-900 mb-6 sm:text-5xl lg:text-6xl leading-tight"
    >
      Movie Explorer
    </h1>
    <MovieList />
  </div>
</template>

<style scoped>
.app-container {
  text-align: center;
  padding: 1rem;
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
}
</style>
