import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Note from "../views/Note.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/note/:id",
    name: "note",
    component: Note,
    props: route => ({ id: Number(route.params.id) })
  },
  {
    path: "/note",
    name: "note-index",
    component: Note,
    props: route => ({ id: route.params.id })
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.afterEach((to, from, next) => {
  Vue.nextTick(() => {
    document.dispatchEvent(new Event("custom-render-trigger"));
  });
});

export default router;
