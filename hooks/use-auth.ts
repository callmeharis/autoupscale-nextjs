import { UserEntity } from "../models/user/user.entity";
import useStorage from "./use-storage";
import { useRouter } from "next/router";

import { useUserContext } from "../context/user-context";
import CompanyRoutes from "@/routes/company.route";
import AuthRoutes from "@/routes/auth.route";
import { UserRoles } from "@/enums/auth/user-role.enum";
import CustomerRoutes from "@/routes/customer.route";
import { isBrowser } from "@/utils/common";

export function parseJwt(token: any) {
	var base64Url = token.split(".")[1];
	var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

	let decodedBase64 = null;
	if (window.Buffer) {
		decodedBase64 = Buffer.from(base64, "base64").toString();
	} else if (window.atob) {
		decodedBase64 = atob(base64);
	} else {
		throw new Error("Unable to decode Base64 str");
	}

	var jsonPayload = decodeURIComponent(
		decodedBase64
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);

	return JSON.parse(jsonPayload);
}

export function useToken() {
	const storageKey = "user";
	const { getItem, setItem, removeItem } = useStorage();

	function setUser(user: any) {
		if (!user.token) throw new Error("User does not have a jwt token");

		setItem(storageKey, JSON.stringify(user));
	}

	function removeUser() {
		removeItem(storageKey);
	}

	function getToken(): string {
		const user = getUser();
		if (user && user.token) return user.token;

		return "";
	}

	function getUser(): any {
		const json = getItem(storageKey);

		let user: any = null;
		if (json) {
			user = JSON.parse(json);
		}

		return user;
	}

	return {
		setUser,
		removeUser,
		getToken,
		getUser,
	};
}

export function useAuth() {
	const { setUser, removeUser } = useToken();

	const router = useRouter();

	const userContext = useUserContext();

	function login(u: any) {
		updateUser(u);

		if (Boolean(u?.token)) {
			if (u?.roles?.find(v => v?.name == UserRoles.CUSTOMER)) router.push(CustomerRoutes.profile.index);
			else if (u?.roles?.find(v => v?.name == UserRoles.MANAGER)) router.push(CompanyRoutes.dashboard.index);
			else if (u?.roles?.find(v => v?.name == UserRoles.COMPANY)) router.push(CompanyRoutes.dashboard.index);
		}
	}

	function updateUser(u: any) {
		setUser(u);

		userContext.setUser(u);
	}

	function setEmailVerified(verified: boolean) {
		const user = userContext.user;

		if (user) {
			user.email_verified = verified;
			updateUser(user);
		}
	}

	async function logout() {
		removeUser();
		userContext.setUser(null);
	}

	async function logoutAndRedirect() {
		logout();
		if (router.asPath.toLowerCase().startsWith("/company") || router.asPath.toLowerCase().startsWith("/customer") || router.asPath.toLowerCase().startsWith("/manager")) {
			await router.push('/');

			return true;
		}


		return false;
	}

	async function loginGuard(): Promise<boolean> {
		const user = userContext.user;

		if (user) {
			if (!user.token) {
				return !(await logoutAndRedirect());
			} else {
				if (router.asPath.toLowerCase().startsWith("/company") || router.asPath.toLowerCase().startsWith("/customer") || router.asPath.toLowerCase().startsWith("/manager")) {
					await router.push(CompanyRoutes.dashboard.index);
					return false;
				}
			}
		} else {
			return !(await logoutAndRedirect());
		}
	}

	function getPermissions(): string[] {
		const user = userContext.user;

		if (!user?.token) return [];

		return user.permissions;
	}

	function hasPermission(...permissions) {

		const user = userContext.user;

		if (!user?.token) return false;

		const currentPermissions = new Set(user.permissions || []);

		return user.permissions && permissions.some(p => currentPermissions.has(p));
	}

	return {
		user: userContext.user,
		company: userContext.user?.company,
		email_verified: userContext.user?.email_verified,
		setEmailVerified,
		// isSuperAdmin: !!userContext.user?.super_admin,
		updateUser,
		getUser: () => userContext.user,
		getCompany: () => userContext.user?.company,
		login,
		logout,
		logoutAndRedirect,
		loginGuard,
		permissions: getPermissions(),
		hasPermission,
	};
}
