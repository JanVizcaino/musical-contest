import { createRouter, createWebHistory } from 'vue-router' //Importamos router
import HomeView from '../views/HomeView.vue' 
import PlayView from '../views/PlayView.vue'
import RankingView from '../views/RankingView.vue' //Definimos las views

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/play', name: 'Play', component: PlayView },
  { path: '/ranking', name: 'Ranking', component: RankingView }, //Definimos el path que se va a mostrar, el nombre que se va a mostrar y el componente a renderizar
]
export const router = createRouter({
  history: createWebHistory(),
  // history define el tipo de navegación que usará la app.
  // createWebHistory() utiliza el historial nativo del navegador (sin hashes #),
  routes
  //usamos el array creado anteriormente
})
