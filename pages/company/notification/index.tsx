import DataTable from '@/components/dataTable/viewDataTable';
import ShowFormattedDate from '@/components/date-formatter';
import { EmptyData } from '@/components/empty-data';
import FullLayout from '@/components/layouts/company/full-layout';
import { NotificationEntity } from '@/models/admin/notification/notification.entity';
import NotificationApi from '@/pages/api/notification';
import { useEffectAsync } from '@/utils/react';
import React, { ReactElement, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { Check2Circle } from 'react-bootstrap-icons';
import { RiMessageFill } from 'react-icons/ri';

export default function Notification() {
  const [notifications, setNotifications] = useState<NotificationEntity>(null);

  useEffectAsync(async () => {
    try {
      const notificationAPi = new NotificationApi;
      const data = await notificationAPi.list();
      setNotifications(data); 
      await notificationAPi.markAllRead();
    } catch (error) {
    }
  }, []);
  console.log('App rendered');
  return (
    <>
      <div className="max-w-7xl m-auto p-5">
        <Row className='my-4 mx-5'>
          <Col lg={4} className="text-start p-0" >
         
            <h1 className=" mb-6 font-bold text-3xl">Notification</h1>
          </Col>
        </Row>

        <div className="mx-5">
         {
        !!Boolean (notifications?.notifications) ? ( <ul className='m-auto w-3/5 space-y-6'>
          {notifications?.notifications?.map((n, index) => (

            <li key={index} className="b-2 p-2 hover:bg-slate-50">
              {/* <RiMessageFill className="text-gray-400 inline-block text-xl" /> */}
             <div className="flex justify-center items-center ">
             <img className='h-9 w-9 rounded-full object-cover mr-4' src={
               !!Boolean(n?.response?.vehicle?.media[0]?.file_name) ? n?.response?.vehicle?.media[0]?.file_name : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7EkV3CX7fEqiL-PnjPzqstMql_Uu1V2vj0g'

             } alt="" />
               <div><span>{n?.message} </span>
              ( <ShowFormattedDate className='font-semibold text-gray-600' date={n?.response?.created_at} hideTime/>)
               </div>
             </div>
            </li>
          ))}

        </ul>)
        : <EmptyData title='No notification available yet' />
         }
        </div>

      </div>
    </>
  )
}
Notification.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};