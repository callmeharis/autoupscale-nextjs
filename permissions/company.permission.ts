const CompanyPermissions = {
    customer: {
        index: "customer.index",
        create: "customer.store",
        view: "customer.show",
        edit: "customer.update",
        delete: "customer.destroy",
    },
    self_customer: {
        view: "customer.self.get",
        edit: "customer.self.update",
        reservations: "self.customer.reservations",
        history: "self.customer.history",
        payments: "self.customer.payments",
    },
    report: {
        filter: "report.filter",
        export: "report.export",
        earning: "report.earning",
        index:'report.index'
    },
    investor: {
        index: "investor.index",
        create: "investor.store",
        view: "investor.show",
        edit: "investor.update",
        delete: "investor.destroy",
    },
    reservations: {
        index: "reserve.index",
        create: "reserve.store",
        view: "reserve.show",
        edit: "reserve.update",
        delete: "reserve.destroy",
        start: "reserve.start",
        complete: "reserve.complete",
        cancel: "reserve.cancel",
        download_invoice : 'reserve.download-invoice',
        download_contract:    'reserve.download-contract',
    },
    vehicle: {
        index: "vehicles.index",
        create: "vehicles.store",
        view: "vehicles.show",
        edit: "vehicles.update",
        delete: "vehicles.destroy",
    },
    settings: {
        manager: {
            index: "manager.index",
            create: "manager.store",
            view: "manager.show",
            edit: "manager.update",
            delete: "manager.destroy",
        },
        companySettings: {
            index: "rental.update"
        },
        systemSettings: {
            view: "other.get-system-settings",
            edit: "other.update-system.settings",
        },
        garage: {
            index: "garage.index",
            view: "garage.show",
            edit: "garage.update",
            create:"garage.store"
        },
        violation: {
            index: "violation.index",
            view: "violation.show",
            edit: "violation.update",
            create:"violation.store",
            delete:"violation.destroy",
        },
        maintenance: {
            index: "maintenance.index",
            view: "maintenance.show",
            edit: "maintenance.update",
            create:"maintenance.store"
        },
        service: {
            index: "service.index",
            view: "service.show",
            edit: "service.update",
            create:"service.store",
        },
        insurance: {
            create:"company-insurance.store",
            index: "company-insurance.index",
            edit: "company-insurance.update",
        },
    }
};

export default CompanyPermissions;
