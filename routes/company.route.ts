const CompanyRoutes = {
    index: "/company",
    dashboard: {
        index: "/company/dashboard"
    },
    contacts: {
        index: "/company/contacts",
        view: "/company/contacts/[contactId]",
        edit: "/company/contacts/[contactId]/edit",
    },
    customer: {
        index: "/company/customer",
        create: "/company/customer/create",
        view: "/company/customer/[customerId]",
        edit: "/company/customer/[customerId]/edit",
        history: "/company/customer/[customerId]/history",
    },
    investor: {
        index: "/company/investor",
        create: "/company/investor/create",
        view: "/company/investor/[investorId]",
        edit: "/company/investor/[investorId]/edit",
    },
    manager: {
        index: "/company/manager",
        create: "/company/manager/create",
        view: "/company/manager/[managerId]",
        edit: "/company/manager/[managerId]/edit",
    },
    payments: {
        index: "/company/payments"
    },
    reports: {
        index: "/company/reports"
    },
    reservations: {
        index: "/company/reservations",
        create: "/company/reservations/create",
        view: "/company/reservations/[reservationsId]",
        edit: "/company/reservations/[reservationsId]/edit",
    },
    vehicle: {
        index: "/company/vehicle",
        create: "/company/vehicle/create",
        view: "/company/vehicle/[vehicleId]",
        edit: "/company/vehicle/[vehicleId]/edit",
        history: "/company/vehicle/[vehicleId]/history",
    },
    setting: {
        index: "/company/setting",
        system: "/company/setting/system",
        insurance: '/company/setting/insurance',
        garage: '/company/setting/garage',
        violation: '/company/setting/violation',
        manager: '/company/setting/manager',
        contract: '/company/setting/contract',
        payments: '/company/setting/payments',
        notification: '/company/setting/notification',
        maintenance:'/company/setting/maintenance',
        service: {
            index : '/company/setting/service',
            create:'/company/setting/service/create',
            edit: "/company/setting/service/[serviceId]/edit",
            view: "/company/setting/service/[serviceId]",
        },
        account: {
            billing: '/company/setting/account-billing'
        },
    },
    
    timeline: {
        index: "/company/timeline",
    },
    notification: {
        index: "/company/notification",
    }
};

export default CompanyRoutes;
