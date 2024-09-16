import './assets/main.css';
import './api';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCreditCard,
  faMoneyBillTransfer,
  faBars,
  faXmark,
  faPlaneDeparture,
  faCaretDown,
  faEllipsis,
  faShoppingCart,
  faUser,
  faMinus,
  faPlus,
  faTimes,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import {
  faPaypal,
  faGooglePay,
  faFacebook,
  faSquareTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

library.add(
  faCreditCard,
  faPaypal,
  faGooglePay,
  faBars,
  faXmark,
  faMoneyBillTransfer,
  faPlaneDeparture,
  faFacebook,
  faSquareTwitter,
  faLinkedin,
  faCaretDown,
  faEllipsis,
  faShoppingCart,
  faUser,
  faMinus,
  faPlus,
  faTimes,
  faEllipsisV,
  faEllipsis
);

const app = createApp(App);

app.use(router);
app.use(AOS.init());

// Components
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
