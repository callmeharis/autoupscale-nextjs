import React, { ReactElement } from 'react'
import { RiListSettingsFill } from "react-icons/ri";
import { AiFillIdcard, AiFillInsurance } from 'react-icons/ai';
import FullLayout from '@/components/layouts/company/full-layout';
import { useRouter } from 'next/router';
import CompanyRoutes from '@/routes/company.route';
import { BiNotification, BiUser } from 'react-icons/bi';
import { MdAirlineStops, MdAllInclusive, MdContrast, MdGarage, MdOutlinePayments, MdOutlineWarning, MdPayment, MdSettingsApplications } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { NavBarItemsProps } from '@/types/layout/nav-bar.type';
import { SideBarDrawer } from '@/components/navigations/sidebar';
import { CarFront, CardImage } from 'react-bootstrap-icons';
export default function SideBar() {
    const router = useRouter();
    const menuItems: NavBarItemsProps[] = [
        {
            pathname: CompanyRoutes.setting.index,
            icon: <FiSettings className="w-1/1 text-3xl text-slate-100 section-hover:text-teal-100" />,
            text: "Company Setting",
            permissions: "rental.update",
        },
        // {
        //     pathname: CompanyRoutes.setting.system,
        //     icon: <RiListSettingsFill className="w-1/1 text-2xl text-slate-100 section-hover:text-teal-100" />,
        //     text: "System Setting",
        //     permissions: "other.get-system-settings",
        // },
        {
            pathname: CompanyRoutes.setting.manager,
            icon: <BiUser className="w-1/1 text-3xl text-slate-100 section-hover:text-teal-100" />,
            text: "Managers",
            permissions: "manager.index",
        },
        {
            pathname: CompanyRoutes.setting.maintenance,
            icon: <CarFront className="w-1/1 text-3xl text-slate-100 section-hover:text-teal-100" />,
            text: "Maintenance",
            permissions: "maintenance.index",
        },
        {
            pathname: CompanyRoutes.setting.service.index,
            icon: <MdSettingsApplications className="w-1/1 text-3xl text-slate-100 section-hover:text-teal-100" />,
            text: "Service",
            permissions: "service.index",
        },
        {
            pathname: CompanyRoutes.setting.insurance,
            icon: <AiFillInsurance className="w-1/1 text-2xl text-slate-100 section-hover:text-teal-100" />,
            text: "Insurance",
            permissions: "company-insurance.index",
        },
        {
            pathname: CompanyRoutes.setting.garage,
            icon: < MdGarage className="w-1/1 text-2xl text-slate-100 section-hover:text-teal-100" />,
            text: "Garage",
            permissions: "garage.index",
        },
        {
            pathname: CompanyRoutes.setting.violation,
            icon: < MdOutlineWarning className="w-1/1 text-2xl text-slate-100 section-hover:text-teal-100" />,
            text: "Violations",
            permissions: "violation.index",
        },
        // {
        //     pathname: CompanyRoutes.setting.reports,
        //     icon: <AiFillIdcard className="w-1/1 text-3xl text-slate-100 section-hover:text-teal-100" />,
        //     text: "Reports",
        //     permissions: "manager.index",
        // },
        // {
        //     pathname: CompanyRoutes.setting.contract,
        //     icon: <MdContrast className="w-1/1 text-3xl text-slate-100 section-hover:text-teal-100" />,
        //     text: "Contracts",
        //     permissions: "",
        // },
        {
            pathname: CompanyRoutes.setting.notification,
            icon: <BiNotification className="w-1/1 text-2xl text-slate-100 section-hover:text-teal-100" />,
            text: "Notifications",
            permissions: "notification.index",
        },
        {
            pathname: CompanyRoutes.setting.payments,
            icon: <MdPayment className="w-1/1 text-3xl text-slate-100 section-hover:text-teal-100" />,
            text: "Payments Subscription",
            permissions: "payment.index",
        },
        {
            pathname: CompanyRoutes.setting.account.billing,
            icon: <MdOutlinePayments className="w-1/1 text-3xl text-slate-100 section-hover:text-teal-100" />,
            text: "Account Billing",
            permissions: "",
        }

    ];
    return (
        <>
            <div className="float-left h-screen sticky top-0 px-2 py-3 bg-gradient-to-br from-[#887ed1] via-custom-btn to-[#3828a3] w-1/5">
                <SideBarDrawer items={menuItems} />
            </div>
        </>

    )
}
SideBar.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout>{page}</FullLayout>;
}