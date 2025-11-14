// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayView from '../views/PlayView.vue'
import RankingView from '../views/RankingView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/play', name: 'Play', component: PlayView },
  { path: '/ranking', name: 'Ranking', component: RankingView },
]
export const router = createRouter({
  history: createWebHistory(),
  routes
})
