import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ConvertPage from "../views/ConvertPage.vue";

const routes = [
   {
      path: "/",
      name: "Home",
      component: HomePage,
   },
   {
      path: "/convert",
      name: "Convert",
      component: ConvertPage,
   },
];

const router = createRouter({
   history: createWebHistory(import.meta.env.VITE_BASE_URL),
   routes,
});

export default router;
