import { UserEntity } from '@/models/user/user.entity'
import CompanyRoutes from '@/routes/company.route'
import Link from 'next/link'
import React from 'react'
import { IoMdLogOut } from 'react-icons/io'
export interface CompanyProfileCardProps{
    userLoggedIn?:UserEntity;
    logoutAndRedirect?:() => Promise<boolean>
}
const CompanyProfileCard = (props:CompanyProfileCardProps) => {
  return (
    <div className="setting_hover">
    <div className="setting-image" >
        <div className="lg:h-9 lg:w-9 rounded-full object-cover bg-white ">
            <h1 className="text-center lg:pt-[6px] lg:p-0 p-[2px] lg:text-[19px] font-[600]  text-custom-btn">
            {`${props?.userLoggedIn?.first_name.charAt(0)}${props?.userLoggedIn?.last_name.charAt(0)}`}
            </h1>
        </div>
    </div>
    {<div className="informative_box absolute right-0 bg-white rounded-md mx-3 shadow-lg lg:w-80" >
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="image flex justify-start"  >
                <div className="text-content text-left text-black">
                    <h1 className="font-medium text-xl text-gray-700 overflow-hidden">{props?.userLoggedIn?.full_name}</h1>
                    <h1>{props?.userLoggedIn?.email}</h1>
                </div>
            </div>
            <a href="#">
                <h5 className="mb-2 text-xl font-semibold  text-gray-600 my-4">Account Settings</h5>
            </a>

            <Link href={CompanyRoutes.setting.index} className="inline-flex items-center text-gray-600 text-sm font-semibold">
                General Setting
            </Link>
            <br />
            <Link href={CompanyRoutes.setting.account.billing} className="inline-flex items-center text-gray-600 text-sm font-semibold">
                Account Billing
            </Link>
            <div className="text-end flex justify-end">
                <button
                    onClick={() => props?.logoutAndRedirect()}
                    role="button"
                    className=" text-sm items-center px-2 flex py-2 leading-none border rounded text-white border-white  bg-custom-btn lg:mt-0 mr-2"
                >
                    <IoMdLogOut className="text-xl" /> Logout


                </button>
            </div>
        </div>


    </div>}
</div>
  )
}

export default CompanyProfileCard