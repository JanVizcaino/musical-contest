import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/css/style.css'
import { router } from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faPlay, faStar, faHeadphones, faRankingStar, faBullseye, faMusic, fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9, fa0, faUser} from '@fortawesome/free-solid-svg-icons'

library.add(faHome, faPlay, faStar, faHeadphones, faRankingStar, faBullseye, faMusic, fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9, fa0, faUser)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(createPinia())

app.mount('#app')
