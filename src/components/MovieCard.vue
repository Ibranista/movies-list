<script setup lang="ts">
defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

// @ts-expect-error no exported member for imported components
import { CardBody, CardHeader, CardImage } from "@swarmakit/vue";
</script>

<template>
  <CardBody
    class="movie-card p-3 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:cursor-pointer"
  >
    <CardImage
      class="movie-image"
      :src="movie.medium_cover_image"
      :caption="movie.title"
    />
    <CardHeader
      class="movie-info"
      :title="movie.year"
      :subtitle="`Rating: ${movie.rating}`"
    >
    </CardHeader>
  </CardBody>
</template>

<style scoped>
.movie-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  text-align: left;
  width: 250px;
  margin: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

::v-deep(.caption) {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6) !important;
  color: #fff !important;
  font-size: 0.9rem !important;
  padding: 0.5rem !important;
  text-align: center !important;
  border-radius: 0 0 8px 8px !important;
}

.movie-image {
  width: 100%;
  height: 350px;
  background-size: cover;
  background-position: center;
  border-radius: 8px 8px 0 0;
}

.movie-info {
  padding: 0.5rem;
}
.movie-info h3 {
  font-size: 1rem;
  margin: 0 0 0.5rem;
}
</style>
