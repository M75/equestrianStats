
import HomePage from '../pages/home.vue';
import ViewContract from '@/pages/view.vue';
import NewContract from '@/pages/new_entry.vue';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/view/:contract',
    component: ViewContract,
  },
  {
    path: '/add_new',
    component: NewContract,
  },
];

export default routes;
