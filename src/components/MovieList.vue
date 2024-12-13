<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Movie } from "../types/movies.interface";
import MovieCard from "./MovieCard.vue";

// @ts-expect-error no exported member for imported components
import { Button, SearchBar } from "@swarmakit/vue";
import { fetchMovies } from "../utils/api.utils";

const movies = ref<Movie[]>([]);
const totalMovies = ref<number>(0);
const sort = ref<string>("seeds");
const limit = ref<number>(15);
const page = ref<number>(1);
const queryTerm = ref<string>("");

const loadMovies = async (): Promise<void> => {
  const { movies: fetchedMovies, totalMovies: fetchedTotalMovies } =
    await fetchMovies(sort.value, limit.value, page.value, queryTerm.value);
  movies.value = fetchedMovies;
  totalMovies.value = fetchedTotalMovies;
};

onMounted(loadMovies);

const changePage = (newPage: number): void => {
  page.value = newPage;
  loadMovies();
};

const updateSort = (event: Event): void => {
  const target = event.target as HTMLSelectElement;
  sort.value = target.value;
  loadMovies();
};

const handleSearch = (): void => {
  page.value = 1;
  loadMovies();
};
</script>

<template>
  <div
    class="movie-list-container"
    style="
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    "
  >
    <LoadingSpinner title="loading" active="{true}" />
    <div
      class="controls"
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        width: 100%;
      "
    >
      <label style="display: flex; align-items: center; gap: 0.5rem">
        Sort by:
        <select v-model="sort" @change="updateSort">
          <option value="seeds">Seeds</option>
          <option value="rating">Rating</option>
          <option value="year">Year</option>
          <option value="title">Title</option>
          <option value="like_count">Likes</option>
        </select>
      </label>
      <label style="display: flex; align-items: center; gap: 0.5rem">
        Limit:
        <input
          type="number"
          v-model.number="limit"
          @input="loadMovies"
          min="1"
          max="50"
          style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px"
        />
      </label>
      <SearchBar
        title="Search Movies"
        type="text"
        v-model="queryTerm"
        placeholder="Search movies..."
        @input="handleSearch"
        style="
          width: 100%;
          max-width: 400px;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease-in-out;
        "
      />
    </div>

    <div
      class="movies-grid"
      style="
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
        width: 100%;
      "
    >
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>

    <div
      class="pagination"
      style="display: flex; justify-content: center; margin-top: 1rem"
    >
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        "
      >
        <Button
          :disabled="page === 1"
          @click="changePage(page - 1)"
          style="
            padding: 0.5rem 1rem;
            background-color: #007bff;
            color: white;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
          "
          :style="{
            backgroundColor: page === 1 ? '#ccc' : '#007bff',
            cursor: page === 1 ? 'not-allowed' : 'pointer',
          }"
        >
          Previous
        </Button>

        <span style="font-size: 1.125rem; font-weight: 600; color: #555">
          Page {{ page }}
        </span>

        <Button
          :disabled="page * limit >= totalMovies"
          @click="changePage(page + 1)"
          style="
            padding: 0.5rem 1rem;
            background-color: #007bff;
            color: white;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
          "
          :style="{
            backgroundColor: page * limit >= totalMovies ? '#ccc' : '#007bff',
            cursor: page * limit >= totalMovies ? 'not-allowed' : 'pointer',
          }"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template>
