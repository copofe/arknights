import { createApp } from 'vue';
import { createPinia } from 'pinia';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import router from './router';
import useStore, { subscribe } from './store';
import App from './App.vue';
import 'uno.css';
import './style.css';

dayjs.locale('zh-cn');

function setInnerHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setInnerHeight();
window.addEventListener('resize', setInnerHeight);

const pinia = createPinia();
pinia.use(subscribe);
createApp(App).use(pinia).use(router).mount('#app');
const store = useStore();
store.init();
