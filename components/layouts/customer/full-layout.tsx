import { MdSpaceDashboard, MdOutlinePayments } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { NavBarItemsProps } from "../../../types/layout/nav-bar.type";
import { NavigationBar } from "../../navigations";
import { useAuth } from "../../../hooks/use-auth";
import CustomerRoutes from "@/routes/customer.route";
import { UserRoles } from "@/enums/auth/user-role.enum";
import { useRouter } from "next/router";
import AuthRoutes from "@/routes/auth.route";
import CompanyRoutes from "@/routes/company.route";
import { isBrowser } from "@/utils/common";
import { useEffect } from "react";

// customer layout
const FullLayout = ({ children }) => {

	const { user, company } = useAuth();

	console.log("user====", user);
	const router = useRouter()
	useEffect(() => {

		//TODO Refactor this code
		if (isBrowser) {
			if (!Boolean(user)) {
				router.push(AuthRoutes.login)
			} else if (user?.roles?.find(v => v?.name == UserRoles.COMPANY)) {
				// router.push(CompanyRoutes.vehicle.index)
				router.push(CompanyRoutes.dashboard.index)
			} 
			else if (user?.roles?.find(v => v?.name == UserRoles.MANAGER)) {
				router.push(CompanyRoutes.dashboard.index)
			
			}
			
		}
	}, [])

	const menuItems: NavBarItemsProps[] = [
		// {
		// 	pathname: CustomerRoutes.dashboard.index,
		// 	icon: <MdSpaceDashboard className="w-1/1 text-2xl text-blue-600" />,
		// 	text: "Dashboard",
		// 	permissions: "customer.index",
		// },
		{
			pathname: CustomerRoutes.profile.index,
			icon: <TbReportSearch  className="w-1/1 text-3xl text-slate-100 section-hover:text-teal-100"  />,
			text: "Profile",
			permissions: "customer.self.get",
		},
		{
			pathname: CustomerRoutes.history.index,
			icon: <MdOutlinePayments className="w-1/1 text-3xl text-slate-100 section-hover:text-teal-100"  />,
			text: "History",
			permissions: "self.customer.history",
		},
		{
			pathname: CustomerRoutes.reservations.index,
			icon: <TbReportSearch className="w-1/1 text-3xl text-slate-100 section-hover:text-teal-100"  />,
			text: "Reservations",
			permissions: "self.customer.reservations",
		},
		{
			pathname: CustomerRoutes.payments.index,
			icon: <MdOutlinePayments className="w-1/1 text-3xl text-slate-100 section-hover:text-teal-100"  />,
			text: "Payments",
			permissions: "self.customer.payments",
		},

	];
	return (
		<div className="bg-slate-100 min-h-screen">
			<NavigationBar items={menuItems} />
			<div>{children}</div>
		</div>
	);
};
export default FullLayout;
