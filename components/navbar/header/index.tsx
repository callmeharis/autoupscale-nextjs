import { MdSpaceDashboard, MdCarRental } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { TbReportSearch } from "react-icons/tb";
import { BsCalendar2PlusFill } from "react-icons/bs";
import Link from "next/link";
import React from "react";
export function Navbar() {
	return (
		<nav className="bg-gray-800">
			<div className="max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex items-center justify-between h-16">
					<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
						<div className="hidden sm:block sm:ml-6">
							<div className="flex space-x-4" id="nav-items">
								<Link href="/dashboard" legacyBehavior>
									<a className="text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md font-medium flex justify-start	 w-30 items-center">
										<MdSpaceDashboard className="w-1/1 text-4xl" />
										<span className="w-1/1 ml-1.5 text-xl">Dashboard</span>
									</a>
								</Link>
								<Link href="/dashboard" legacyBehavior>
									<a className="text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md font-medium flex justify-start	 w-30 items-center">
										<BsCalendar2PlusFill className="w-1/1 text-4xl" />
										<span className="w-1/1 ml-1.5 text-xl">Planner</span>
									</a>
								</Link>
								<Link href="/rentals" legacyBehavior>
									<a className="text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md font-medium flex justify-start	 w-30 items-center">
										<AiOutlineCalendar className="w-1/1 text-4xl" />
										<span className="w-1/1 ml-1.5 text-xl">Rentals</span>
									</a>
								</Link>
								<Link href="/maintenance" legacyBehavior>
									<a className="text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md font-medium flex justify-start	 w-30 items-center">
										<MdCarRental className="w-1/1 text-4xl" />
										<span className="w-1/1 ml-1.5 text-xl">Vehicles</span>
									</a>
								</Link>
								<Link href="/contacts" legacyBehavior>
									<a className="text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md font-medium flex justify-start	 w-30 items-center">
										<BiUserCircle className="w-1/1 text-4xl" />
										<span className="w-1/1 ml-1.5 text-xl">Contacts</span>
									</a>
								</Link>
								<Link href="/dashboard" legacyBehavior>
									<a className="text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md font-medium flex justify-start	 w-30 items-center">
										<TbReportSearch className="w-1/1 text-4xl" />
										<span className="w-1/1 ml-1.5 text-xl">Reports</span>
									</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
