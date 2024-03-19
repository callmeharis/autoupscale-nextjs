
import FullLayout from '@/components/layouts/company/full-layout';
import PageLayout from '@/components/layouts/company/page-layout';
import React, { ReactElement, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Payment from '../../payments';
import { useEffectAsync } from '@/utils/react';
import PaymentApi from '@/pages/api/payment';
import { set } from 'nprogress';

export default function Payments() {
  return (
    <PageLayout title=''>
      <Payment />
      
    </PageLayout>
  );
}
Payments.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
