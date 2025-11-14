import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/css/style.css'
import { router } from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faPlay, faStar, faHeadphones, faRankingStar, faBullseye} from '@fortawesome/free-solid-svg-icons'

library.add(faHome, faPlay, faStar, faHeadphones, faRankingStar, faBullseye)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(createPinia())

app.mount('#app')
