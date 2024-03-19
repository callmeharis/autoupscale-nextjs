const CustomerRoutes = {
    index: "/customer",
    profile: {
        index: "/customer/profile",
        edit: "/customer/profile/edit"
    },
    dashboard: {
        index: "/customer/dashboard"
    },
    payments: {
        index: "/customer/payments"
    },
    history: {
        index: "/customer/history"
    },
    reservations: {
        index: "/customer/reservations",
        view: "/customer/reservations/[reservationsId]",
    },
};

export default CustomerRoutes;
