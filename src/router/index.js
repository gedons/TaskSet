import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Index from "../views/Index.vue";
import Tasks from "../views/Tasks.vue";
import Dashboard from "../views/Dashboard.vue";
import MainLayout from "../components/MainLayout.vue";


const routes = [
    
    {
        path: "/",
        name: 'Index',
        component: Index
    },

    {
        path: "/",
        redirect: "/dashboard",
        component: MainLayout,
        children: [
            { path: "/dashboard", name: "Dashboard", component: Dashboard },
            { path: "/tasks", name: "Tasks", component: Tasks },    
        ]
    },

   
];



const router = createRouter({
    history: createWebHistory(),
    routes,
  });

//   router.beforeEach((to, from, next) => {
//     if (to.meta.requiresAuth && !store.state.user.token) {
//       next({ name: "Login" });
//     } else if (store.state.user.token && to.meta.isGuest) {
//       next({ name: "Admin" });
//     } else {
//       next();
//     }
//   });

export default router;