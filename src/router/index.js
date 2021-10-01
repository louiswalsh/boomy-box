import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/Login.vue")
      },
      {
        path: "/user",
        name: "User",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "",
        redirect: "/user"
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/404",
    alias: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "../views/NotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // Triggered when callback returns with tokens
  if (to.query.access_token) {
    localStorage.access_token = to.query.access_token;
    localStorage.refresh_token = to.query.refresh_token;

    next({
      path: "/"
    });
  }

  // Routes requiring authentication are redirected to login if access token not available
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.access_token) {
      next({
        name: "Login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
