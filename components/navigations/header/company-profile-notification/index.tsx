import { EmptyData } from '@/components/empty-data'
import { NotificationEntity } from '@/models/admin/notification/notification.entity'
import NotificationApi from '@/pages/api/notification'
import CompanyRoutes from '@/routes/company.route'
import { useEffectAsync } from '@/utils/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { BiBell } from 'react-icons/bi'
import { RiMessageFill } from 'react-icons/ri'

const CompanyProfileNotifications = () => {

	const [notifications, setNotifications] = useState<NotificationEntity>(null);

	useEffectAsync(async () => {
		try {
			const notificationAPi = new NotificationApi;
			const data = await notificationAPi.list();
			console.log(data , 'data===');
			
			setNotifications(data);
		} catch (error) {
		}
	}, []);
	

	return (
		<>
			<div className="setting_hover">
				<div className="setting-image" >
					<BiBell className="lg:text-3xl text-2xl lg:mx-3 section lg:mt-0 text-gray-100 hover:text-white cursor-pointer  flex justify-center items-center" />
				</div>
				<div>
					<h1 className=" absolute right-[50px] lg:right-[70px] bg-white text-[11px] rounded-full top-[21px] w-4 h-4 flex justify-center items-center p-[2px] text-black">{notifications?.unread_count}</h1>
				</div>
				<div className="notification_box informative_box absolute right-[0%]  lg:right-16 bg-white rounded-md lg:mx-3 mx-1 shadow-lg " >
					<div className="max-w-sm p-2 bg-white border border-slate-200  rounded-lg shadow dark:bg-gray-800  dark:border-gray-700 lg:w-96 w-64">
						<header className="p-1 border-slate-200 border-b-2 text-center">
							<h1 className="text-xl  text-gray-700 font-semibold">
								Notifications
							</h1>
						</header>
						{
							!Boolean(notifications?.notifications.length > 0) && (
								<div>
									<EmptyData title='No Notification Available Yet' />
								</div>
							)
						}
						<ul>
							{notifications?.notifications?.slice(0 , 3).map((notification, index) => (
								<>
									<li key={index} className="b-2 p-2 hover:bg-slate-50 text-black text-sm">
										<RiMessageFill className="text-gray-400 inline-block text-xl" /> {notification?.message}
									</li>

								</>
							))}
						</ul>
						<div className="text-end pr-5 pt-1 my-3 border-t-2" >
							<Link href={CompanyRoutes.notification.index}>
								<p className="inline-block  text-sm text-gray-700 text-center font-semibold ">See More</p>
							</Link>
						</div>
					</div>


				</div>
			</div>

		</>
	)
}

export default CompanyProfileNotifications