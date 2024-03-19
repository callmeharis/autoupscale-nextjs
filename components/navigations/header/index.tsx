import React, { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { UserEntity } from "../../../models/user/user.entity";
import CompanyRoutes from "@/routes/company.route";
import { MdCancel, MdSettings } from "react-icons/md";
import AutoUpscale from "../../../public/autoupscale (2).png";
import CompanyProfileCard from "./company-profile-card";
import CompanyProfileNotifications from "./company-profile-notification";
import Image from "next/image";
import { MenuButton } from "react-bootstrap-icons";
import { BsMenuButton } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";

type HeaderProps = {
  children?: ReactNode; // Optional children prop
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { user, logoutAndRedirect } = useAuth();
  const [userLoggedIn, setUserLoggedIn] = useState<UserEntity>(null);
  const [navigationMenu, setNavigationMenu] = useState<Boolean>(false);

  useEffect(() => setUserLoggedIn(user), [user]);

  useEffect(() => setUserLoggedIn(user), [user]);

  return (
    <>
      <div className="flex items-center justify-between flex-wrap bg-custom-btn lg:p-6 px-3 py-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Image src={AutoUpscale} alt="" width={171} />

          {/* <span className="font-semibold text-xl tracking-tight">Auto Upscale</span> */}
        </div>
        <div className="block lg:hidden text-2xl text-white">
          {!Boolean(navigationMenu) ? (
            <div className="flex mt-1 space-x-2 lg:space-x-0">
              {Boolean(userLoggedIn) && (
                <Link href={CompanyRoutes.setting.index}>
                  <MdSettings className="text-2xl  section lg:mt-0 text-gray-100 hover:text-white cursor-pointer  flex justify-center items-center" />
                </Link>
              )}
              {Boolean(userLoggedIn) && (
                <>
                  <CompanyProfileCard
                    userLoggedIn={userLoggedIn}
                    logoutAndRedirect={logoutAndRedirect}
                  />

                  <CompanyProfileNotifications />
                </>
              )}

              <FiMenu
                className=""
                onClick={() => {
                  setNavigationMenu(true);
                }}
              />
            </div>
          ) : (
            <MdCancel
              className=""
              onClick={() => {
                setNavigationMenu(false);
              }}
            />
          )}
        </div>

        <div className="hidden ml-2 w-full  flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow flex justify-center space-x-4">
            {children}
          </div>

          {Boolean(userLoggedIn) && (
            <>
              <Link href={CompanyRoutes.setting.index}>
                <MdSettings className="text-3xl  section lg:mt-0 text-gray-100 hover:text-white cursor-pointer  flex justify-center items-center" />
              </Link>

              <CompanyProfileNotifications />
            </>
          )}

          {Boolean(userLoggedIn) ? (
            <>
              <CompanyProfileCard
                userLoggedIn={userLoggedIn}
                logoutAndRedirect={logoutAndRedirect}
              />
            </>
          ) : (
            <>
              <Link
                href="/login"
                role="button"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-teal-600  lg:mt-0 mr-2"
              >
                Login
              </Link>
              <Link
                href="/signup"
                role="button"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-teal-600  lg:mt-0 mr-2"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
      {!!Boolean(navigationMenu) && (
        <>
          <div className="bg-custom-btn lg:hidden">
            <div className=" ">
              <div className="text-sm lg:flex-grow flex-col flex justify-center lg:space-x-4 space-y-5 pt-4 pb-5">
                {children}
              </div>

              {!Boolean(userLoggedIn) && (
                <div className="lg:pb-0 pb-20 lg:w-full w-32 m-auto lg:m-0 text-center lg:text-left">
                  <Link
                    href="/login"
                    role="button"
                    className="block lg:mb-0 mb-3  lg:inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-teal-600  lg:mt-0 mr-2"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    role="button"
                    className="block lg:mb-0 mb-3  lg:inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-teal-600  lg:mt-0 mr-2"
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
