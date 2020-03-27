import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "statistik",
    component: function() {
      return import("../views/Statistik.vue");
    }
  },
  {
    path: "/berita",
    name: "berita",
    component: function() {
      return import("../views/Berita.vue");
    }
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(/* webpackChunkName: "about" */ "../views/About.vue");
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
