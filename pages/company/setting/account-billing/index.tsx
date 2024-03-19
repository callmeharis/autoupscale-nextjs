import DataTable from '@/components/dataTable/viewDataTable';
import FullLayout from '../../../../components/layouts/company/full-layout';
import PageLayout from '@/components/layouts/company/page-layout';
import PaymentApi from '@/pages/api/payment';
import { useEffectAsync } from '@/utils/react';
import React, { ReactElement, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { SubscribeEntity } from '@/models/admin/payment/subscribe.entity';
export default function AccountBilling (){
const [billingDetails, setBillingDetails] = useState<SubscribeEntity[]>(null);
  const paymentAPI = new PaymentApi();

  useEffectAsync(async () => {
    try {
      const data = await paymentAPI.getSubscriptionDetails();
      console.log("data", data);
      setBillingDetails(data);
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:53 ~ useEffectAsync ~ error:', error);
    }
  }, []);
  return (
    <PageLayout>
    <div className='max-w-7xl m-auto '>
        <Row className='my-4 mx-5'>
          <Col lg={10} className='p-0'>
            <h1 className=' mb-6 font-bold text-3xl'>Account Billing</h1>
          </Col>
        </Row>
        <div className='box  mx-5'>
          {billingDetails ? (
            <>
              <div className='tarrif-palne'>
                <h1 className='no-underline text-base text-gray-700 font-medium p-6  '>
                  Tarrif Plan
                </h1>
                <div className='mx-5 block w-8/12 rounded-md border border-gray-500 px-6 py-3'>
                  <h5 className='font-semibold text-2xl  mb-3'>{billingDetails[0]?.name}</h5>
                  <div className='mb-4 flex items-center justify-between '>
                    <div className='text-gray-500 font-semibold'>
                      Max Allowed Vehicles
                    </div>
                    <div className='mx-3 text-xl font-semibold text-right inline-block leading-4 '>
                      {billingDetails[0]?.plan?.vehicles_limit} Vehicles
                      {/* <span className='text-xs text-gray-700 inline-block align-top rounded-sm bg-gray-100 whitespace-no-wrap border-1 px-1 '>
                        {billingDetails?.data.plan.price} £
                      </span> */}
                    </div>
                  </div>
                  <div className='pb-4 flex items-center justify-between border-b'>
                    <div className='text-gray-500 font-semibold'>
                      Plan Price
                    </div>
                    <div className='mx-3 text-xl font-semibold text-right inline-block leading-4 '>
                      <h5 className='font-semibold text-xl mx-3'>
                        {billingDetails[0]?.plan?.price} £
                      </h5>
                    </div>
                  </div>
                  <div className='pb-4 flex items-center justify-between border-b'>
                    <div className='text-gray-500 font-semibold'>
                      Plan Status
                    </div>
                    <div className='mx-3 text-xl font-semibold text-right inline-block leading-4 '>
                      <h5 className='font-semibold text-xl mx-3'>
                        {billingDetails[0]?.stripe_status}
                      </h5>
                    </div>
                  </div>
                  <div className='pb-4 flex items-center justify-between border-b'>
                    <div className='text-gray-500 font-semibold'>
                      Subscription Ends At
                    </div>
                    <div className='mx-3 text-xl font-semibold text-right inline-block leading-4 '>
                      <h5 className='font-semibold text-xl mx-3'>
                        {billingDetails[0]?.subscription_ends_at}
                      </h5>
                    </div>
                  </div>
                  <div className='d-flex justify-between '>
                    <h5 className='font-semibold text-xl   my-3'>Total:</h5>
                    <h5 className='font-semibold text-xl mx-3'>
                      {billingDetails[0]?.plan?.price} £ / month
                    </h5>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          <div className='mt-5 billing-history'>
            <h1 className='no-underline text-base text-gray-700 font-medium p-6  '>
              Billing History
            </h1>
            <div className="mx-5">
			<DataTable
				data={billingDetails}
				columns={[
					{
						name: 'Plan Name',
						selector: (subscription: SubscribeEntity) => subscription.name ?? 'N/A'
					},
          {
						name: 'Price',
						selector: (subscription: SubscribeEntity) => subscription.plan?.price ? subscription.plan?.price + '£' : 'N/A'
					},
          {
						name: 'Ended At',
						selector: (subscription: SubscribeEntity) => subscription.subscription_ends_at ?? 'N/A'
					},
          {
						name: 'Max Allowed Vehicles',
						selector: (subscription: SubscribeEntity) => subscription?.plan?.vehicles_limit ?? 'N/A'
					},
          {
						name: 'Status',
						selector: (subscription: SubscribeEntity) => subscription.stripe_status
					},
				]}

			/>
		</div>
          </div>
        </div>
      </div>
    
    </PageLayout>
  )
}

AccountBilling.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout>{page}</FullLayout>;
};