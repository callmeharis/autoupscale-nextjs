import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { RiTimeLine } from 'react-icons/ri';
import Error from 'next/error';
import { TbReportSearch } from 'react-icons/tb';
import {
  FaCalendarAlt,
  FaCar,
  FaCcMastercard,
  FaUserCircle,
  FaUserTie,
  FaWindows,
} from 'react-icons/fa';
import { NavBarItemsProps } from '../../../types/layout/nav-bar.type';
import { NavigationBar } from '../../navigations';
import { useAuth } from '../../../hooks/use-auth';
import CompanyRoutes from '@/routes/company.route';
import { UserRoles } from '@/enums/auth/user-role.enum';
import AuthRoutes from '@/routes/auth.route';
import CustomerRoutes from '@/routes/customer.route';
import { isBrowser } from '@/utils/common';
import { toast } from 'react-toastify';
import VerifyEmail from '@/components/signup/verify-email';
import EchoConfig from '@/lib/echo';
// const pusher = new Pusher('Testing', {
//   cluster: 'sp1',
//   wsHost: '192.168.1.28',
//   wsPort: 6001,
//   httpHost: '192.168.1.28',
//   httpPort: 6001,
//   forceTLS: false,
// });

type FullLayoutProps = {
  children: ReactNode;
  permission?: string;
};

// company layout
const FullLayout = ({ children, permission }: FullLayoutProps) => {
  const { user, email_verified, hasPermission } = useAuth();

  const [unauthorized, setUnauthorized] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    if (isBrowser) {
      if (Boolean(user)) {
        //@ts-ignore
        EchoConfig(user?.token);

        //@ts-ignore
        window.Echo.private(`App.Models.User.${user.id}`).notification(
          notification => {
            toast.success(notification.message);
          }
        );

        // if (!pusher.channels.hasOwnProperty('this-is-test-email')) {
        //   const channel = pusher.subscribe('this-is-test-email');
        //   console.log('Test channel subscribed');
        //   channel.bind('App\\Events\\ThisIsTestEvent', data => {
        //     console.log('Event data :', data);
        //     toast.success(data.plan);
        //   });
        // }
      }
      if (!Boolean(user)) {
        router.push(AuthRoutes.login);
      } else if (
        user?.roles?.find(v => v?.name == UserRoles.CUSTOMER) ||
        user?.roles?.find(v => v?.name == UserRoles.MANAGER)
      ) {
        router.push(CustomerRoutes.profile.index);
      }
      // else {
      //   router.push(CompanyRoutes.dashboard.index);
      // }
      if (permission && !Boolean(hasPermission(permission))) {
        setUnauthorized(true);
      } else {
        setUnauthorized(false);
      }
    }

    return () => {
      if (isBrowser) {
        //@ts-ignore
        window.Echo.leave(`App.Models.User.${user.id}`);
      }
    };
  }, []);

  const menuItems: NavBarItemsProps[] = [
    {
      pathname: CompanyRoutes.dashboard.index,
      icon: (
        <FaWindows className='w-1/1 text-[23px] text-slate-100 section-hover:text-teal-100' />
      ),
      text: 'Dashboard',
      permissions: 'company.index',
    },
    {
      pathname: CompanyRoutes.investor.index,
      icon: (
        <FaUserTie className='w-1/1 text-[19px] text-slate-100 section-hover:text-teal-100' />
      ),
      text: 'Owner',
      permissions: 'investor.index',
    },
    {
      pathname: CompanyRoutes.customer.index,
      icon: (
        <FaUserCircle className='w-1/1 text-[23px] text-slate-100 section-hover:text-teal-100' />
      ),
      text: 'Customers',
      permissions: 'customer.index',
    },
    {
      pathname: CompanyRoutes.reports.index,
      icon: (
        <TbReportSearch className='w-1/1 text-[23px] text-slate-100 section-hover:text-teal-100' />
      ),
      text: 'Reports',
      permissions: 'manager.index',
    },
    {
      pathname: CompanyRoutes.vehicle.index,
      icon: (
        <FaCar className='w-1/1 text-[23px] text-slate-100 section-hover:text-teal-100' />
      ),
      text: 'Vehicles',
      permissions: 'vehicles.index',
    },
    {
      pathname: CompanyRoutes.reservations.index,
      icon: (
        <FaCalendarAlt className='w-1/1 text-[19px] text-slate-100 section-hover:text-teal-100' />
      ),
      text: 'Reservations',
      permissions: 'reserve.index',
    },
    // {
    //   pathname: CompanyRoutes.payments.index,
    //   icon: (
    //     <FaCcMastercard className='w-1/1 text-[23px] text-slate-100 section-hover:text-teal-100' />
    //   ),
    //   text: 'Payments',
    //   permissions: 'reserve.index',
    // },
    // {
    // 	pathname: CompanyRoutes.setting.index,
    // 	icon: <FiSettings className="w-1/1 text-[23px] text-slate-100 section-hover:text-teal-100" />,
    // 	text: "Settings",
    // 	permissions: "other.get-system-settings",
    // },
    // {
    // 	pathname: CompanyRoutes.timeline.index,
    // 	icon: <RiTimeLine className="w-1/1 text-[23px] text-slate-100 section-hover:text-teal-100" />,
    // 	text: "TimeLine",
    // 	permissions: "other.view-timeline",
    // },
  ];

  if (unauthorized) {
    return <Error statusCode={403} />;
  }

  return (
    <div className=' min-h-screen'>
      <NavigationBar items={menuItems} />
      {user?.email && !Boolean(email_verified) ? (
        <VerifyEmail email={user?.email} authToken={user?.token} />
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};
export default FullLayout;
