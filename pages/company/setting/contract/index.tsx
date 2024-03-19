import React, { ReactElement } from 'react'
import FullLayout from '../../../../components/layouts/company/full-layout';
import PageLayout from '../../../../components/layouts/company/page-layout';

export default function Contract() {
    return (
        <PageLayout title='Coming Soon!!'></PageLayout>
    )
}
Contract.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout>{page}</FullLayout>;
};
