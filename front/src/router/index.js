import { createRouter, createWebHistory } from "vue-router"
import WallPage from "../views/WallPage.vue"

const routes = [
	{
		path: "/",
		name: "home",
		component: WallPage,
	},
	{
		path: "/ProfilePage",
		name: "ProfilePage",

		component: () => import("../views/ProfilePage.vue"),
	},
	{
		path: "/signup",
		name: "signup",
		component: () => import("../views/SignUp.vue"),
	},
	{
		path: "/login",
		name: "login",
		component: () => import("../views/Login.vue"),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
