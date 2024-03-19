import { UserRoles } from '@/enums/auth/user-role.enum';
import { useAuth } from '../../../hooks/use-auth';
import Header from '@/components/navigations/header';
import { useRouter } from 'next/router';
import CompanyRoutes from '@/routes/company.route';
import CustomerRoutes from '@/routes/customer.route';
import { isBrowser } from '@/utils/common';
import { useEffect } from 'react';

// customer layout
const FullLayout = ({ children ,stopRouting}:{
    children: React.ReactNode,
    stopRouting?:boolean
}) => {
    const { user } = useAuth();
    const router = useRouter();
    useEffect(() => {
		
        if (isBrowser) {
            if (Boolean(user) && !stopRouting) {
                if (user?.roles?.find(v => v?.name == UserRoles.COMPANY)) {
                    router.push(CompanyRoutes.dashboard.index);
                } else if (user?.roles?.find(v => v?.name == UserRoles.MANAGER)) {
                    router.push(CompanyRoutes.dashboard.index);
                } else {
                    router.push(CustomerRoutes.profile.index);
                }
            }
        }
    }, []);

    return (
        <div className='bg-slate-100 min-h-screen'>
            <Header />
            {/* <NavigationBar items={menuItems} /> */}
            <div>{children}</div>
        </div>
    );
};
export default FullLayout;
