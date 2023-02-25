import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/hangmangame",
    },
    {
      path: "/hangmangame",
      name: "Game",
      component: () => import("@/views/Game-view.vue"),
    },
  ],
});

export default router;
