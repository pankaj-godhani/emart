import { createRouter, createWebHistory } from "vue-router";

import MiddlewarePipeline from './middlewarePipeline';
import NProgress from 'nprogress/nprogress';
import routes from './routes';



// Dashboard pages

//import Dashboard from "../views/Dashboard/AlternativeDashboard.vue";

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || {x: 0, y: 0};
  },
});

router.beforeEach((to, from, next) => {


  // If this isn't an initial page load...
  if (from.name !== null) {
    // Start the route progress bar.
    NProgress.start();
  }

  const middleware = _.get(to.meta, 'middleware');

  if (!middleware) return next();

  const context = {to, from, next};

  return middleware[0]({
    ...context,
    next: MiddlewarePipeline(context, middleware, 1)
  });
});

router.beforeResolve(async (to, from, next) => {
  // Create a `beforeResolve` hook, which fires whenever
  // `beforeRouteEnter` and `beforeRouteUpdate` would. This
  // allows us to ensure data is fetched even when params change,
  // but the resolved route does not. We put it in `meta` to
  // indicate that it's a hook we created, rather than part of
  // Vue Router (yet?).
 // console.log('here');
  try {
    // For each matched route...
    for (const route of to.matched) {
      await new Promise((resolve, reject) => {
        // If a `beforeResolve` hook is defined, call it with
        // the same arguments as the `beforeEnter` hook.
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(to, from, (...args) => {
            // If the user chose to redirect...
            if (args.length) {
              // If redirecting to the same route we're coming from...
              if (from.name === args[0].name) {
                // Complete the animation of the route progress bar.
                NProgress.done();
              }
              // Complete the redirect.
              next(...args);
              reject(new Error('Redirected'));
            } else {
              resolve();
            }
          })
        } else {
          // Otherwise, continue resolving the route.
          resolve();
        }
      })
    }
    // If a `beforeResolve` hook chose to redirect, just return.
  } catch (error) {
    return;
  }

  // If we reach this point, continue resolving the route.
  next();
});

// When each route is finished evaluating...
router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});
export default router;
