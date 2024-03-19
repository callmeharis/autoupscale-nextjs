import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { ImCross } from "react-icons/im";
import React from "react";
export function ChecklistTable() {
  return (
    <div className="overflow-x-auto px-10">
      <table className="table-auto w-full text-lg">
        <thead>
          <tr className="border-b-2 text-purple-100 text-left">
            <th className="px-4 py-2 text-purple-100">Create Date</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Service</th>
            <th className="px-4 py-2">Vehicle</th>
            <th className="px-4 py-2">Odometer</th>
            <th className="px-4 py-2">Last Action</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="align-top">
          <tr className="border-b-2 text-sm">
            <td className="px-4 py-2 text-sm text-gray-700">
              09.03.2023
              <span className="text-gray-400"> 13:04</span>
            </td>
            <td className="px-4 py-2 flex">
              <HiOutlineWrenchScrewdriver className="text-purple-600 text-xl mr-2" />
              <div className="services">
                <h4 className="text-gray-700">Full Service</h4>
                <h4 className="text-gray-400">Every 20000.0 Km</h4>
                <h4 className="text-gray-400">Every 365 days</h4>
              </div>
            </td>
            <td className="px-4 py-2 text-purple-500 underline decoration-solid">
              <p>14248</p>
              <p>14248</p>
            </td>
            <td className="px-4 py-2">
              <div className="vehicle-wrap">
                <div className="vehicle-wrap__flex flex items-start">
                  <a href="">
                    <div className="vehicle-wrap__image-wrap w-20 h-20 mr-2 relative">
                      <img
                        src="vehicle.png"
                        alt="vehicle"
                        className="w-20 h-20 rounded-full border border-gray-500"
                      />
                      <div className="color-circle w-5 h-5 absolute bottom-1 right-1 border border-gray-800 bg-white rounded-full  "></div>
                    </div>
                  </a>
                  <div className="vehicle-wrap__info">
                    <p className="vehicle-wrap__title">
                      <a href="" className="text-blue-600">
                        VOLKSWAGEN
                      </a>
                    </p>
                    <div className="td-row bg-gray-300 p-1 text-md my-2">
                      <span className="group">Compact Manual</span>
                    </div>
                    <div className="vehicle-wrap__info-bottom">
                      <a
                        href=""
                        className="text-blue-600 font-bold border border-gray-300 px-2"
                      >
                        ABC127
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 py-2 text-purple-100 ">
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                0{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                0{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                0{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                3{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                4{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                5{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                6{" "}
              </span>
            </td>
            <td className="px-4 py-2">None</td>
            <td className="px-4 py-2 flex text-xl">
              <HiOutlineWrenchScrewdriver className="text-purple-600 mr-4" />
              <ImCross className="text-purple-600" />
            </td>
          </tr>
          <tr className="border-b-2 text-sm">
            <td className="px-4 py-2 text-sm text-gray-700">
              09.03.2023
              <span className="text-gray-400"> 13:04</span>
            </td>
            <td className="px-4 py-2 flex">
              <HiOutlineWrenchScrewdriver className="text-purple-600 text-xl mr-2" />
              <div className="services">
                <h4 className="text-gray-700">Full Service</h4>
                <h4 className="text-gray-400">Every 20000.0 Km</h4>
                <h4 className="text-gray-400">Every 365 days</h4>
              </div>
            </td>
            <td className="px-4 py-2 text-purple-500 underline decoration-solid">
              <p>14248</p>
              <p>14248</p>
            </td>
            <td className="px-4 py-2">
              <div className="vehicle-wrap">
                <div className="vehicle-wrap__flex flex items-start">
                  <a href="">
                    <div className="vehicle-wrap__image-wrap w-20 h-20 mr-2 relative">
                      <img
                        src="vehicle.png"
                        alt="vehicle"
                        className="w-20 h-20 rounded-full border border-gray-500"
                      />
                      <div className="color-circle w-5 h-5 absolute bottom-1 right-1 border border-gray-800 bg-white rounded-full  "></div>
                    </div>
                  </a>
                  <div className="vehicle-wrap__info">
                    <p className="vehicle-wrap__title">
                      <a href="" className="text-blue-600">
                        VOLKSWAGEN
                      </a>
                    </p>
                    <div className="td-row bg-gray-300 p-1 text-md my-2">
                      <span className="group">Compact Manual</span>
                    </div>
                    <div className="vehicle-wrap__info-bottom">
                      <a
                        href=""
                        className="text-blue-600 font-bold border border-gray-300 px-2"
                      >
                        ABC127
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 py-2 text-purple-100 ">
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                0{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                0{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                0{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                3{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                4{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                5{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                6{" "}
              </span>
            </td>
            <td className="px-4 py-2">None</td>
            <td className="px-4 py-2 flex text-xl">
              <HiOutlineWrenchScrewdriver className="text-purple-600 mr-4" />
              <ImCross className="text-purple-600" />
            </td>
          </tr>
          <tr className="border-b-2 text-sm">
            <td className="px-4 py-2 text-sm text-gray-700">
              09.03.2023
              <span className="text-gray-400"> 13:04</span>
            </td>
            <td className="px-4 py-2 flex">
              <HiOutlineWrenchScrewdriver className="text-purple-600 text-xl mr-2" />
              <div className="services">
                <h4 className="text-gray-700">Full Service</h4>
                <h4 className="text-gray-400">Every 20000.0 Km</h4>
                <h4 className="text-gray-400">Every 365 days</h4>
              </div>
            </td>
            <td className="px-4 py-2 text-purple-500 underline decoration-solid">
              <p>14248</p>
              <p>14248</p>
            </td>
            <td className="px-4 py-2">
              <div className="vehicle-wrap">
                <div className="vehicle-wrap__flex flex items-start">
                  <a href="">
                    <div className="vehicle-wrap__image-wrap w-20 h-20 mr-2 relative">
                      <img
                        src="vehicle.png"
                        alt="vehicle"
                        className="w-20 h-20 rounded-full border border-gray-500"
                      />
                      <div className="color-circle w-5 h-5 absolute bottom-1 right-1 border border-gray-800 bg-white rounded-full  "></div>
                    </div>
                  </a>
                  <div className="vehicle-wrap__info">
                    <p className="vehicle-wrap__title">
                      <a href="" className="text-blue-600">
                        VOLKSWAGEN
                      </a>
                    </p>
                    <div className="td-row bg-gray-300 p-1 text-md my-2">
                      <span className="group">Compact Manual</span>
                    </div>
                    <div className="vehicle-wrap__info-bottom">
                      <a
                        href=""
                        className="text-blue-600 font-bold border border-gray-300 px-2"
                      >
                        ABC127
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 py-2 text-purple-100 ">
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                0{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                0{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                0{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                3{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                4{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                5{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                6{" "}
              </span>
            </td>
            <td className="px-4 py-2">None</td>
            <td className="px-4 py-2 flex text-xl">
              <HiOutlineWrenchScrewdriver className="text-purple-600 mr-4" />
              <ImCross className="text-purple-600" />
            </td>
          </tr>
          <tr className="border-b-2 text-sm">
            <td className="px-4 py-2 text-sm text-gray-700">
              09.03.2023
              <span className="text-gray-400"> 13:04</span>
            </td>
            <td className="px-4 py-2 flex">
              <HiOutlineWrenchScrewdriver className="text-purple-600 text-xl mr-2" />
              <div className="services">
                <h4 className="text-gray-700">Full Service</h4>
                <h4 className="text-gray-400">Every 20000.0 Km</h4>
                <h4 className="text-gray-400">Every 365 days</h4>
              </div>
            </td>
            <td className="px-4 py-2 text-purple-500 underline decoration-solid">
              <p>14248</p>
              <p>14248</p>
            </td>
            <td className="px-4 py-2">
              <div className="vehicle-wrap">
                <div className="vehicle-wrap__flex flex items-start">
                  <a href="">
                    <div className="vehicle-wrap__image-wrap w-20 h-20 mr-2 relative">
                      <img
                        src="vehicle.png"
                        alt="vehicle"
                        className="w-20 h-20 rounded-full border border-gray-500"
                      />
                      <div className="color-circle w-5 h-5 absolute bottom-1 right-1 border border-gray-800 bg-white rounded-full  "></div>
                    </div>
                  </a>
                  <div className="vehicle-wrap__info">
                    <p className="vehicle-wrap__title">
                      <a href="" className="text-blue-600">
                        VOLKSWAGEN
                      </a>
                    </p>
                    <div className="td-row bg-gray-300 p-1 text-md my-2">
                      <span className="group">Compact Manual</span>
                    </div>
                    <div className="vehicle-wrap__info-bottom">
                      <a
                        href=""
                        className="text-blue-600 font-bold border border-gray-300 px-2"
                      >
                        ABC127
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 py-2 text-purple-100 ">
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                0{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                0{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                0{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                3{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                4{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                5{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                6{" "}
              </span>
            </td>
            <td className="px-4 py-2">None</td>
            <td className="px-4 py-2 flex text-xl">
              <HiOutlineWrenchScrewdriver className="text-purple-600 mr-4" />
              <ImCross className="text-purple-600" />
            </td>
          </tr>
          <tr className="border-b-2 text-sm">
            <td className="px-4 py-2 text-sm text-gray-700">
              09.03.2023
              <span className="text-gray-400"> 13:04</span>
            </td>
            <td className="px-4 py-2 flex">
              <HiOutlineWrenchScrewdriver className="text-purple-600 text-xl mr-2" />
              <div className="services">
                <h4 className="text-gray-700">Full Service</h4>
                <h4 className="text-gray-400">Every 20000.0 Km</h4>
                <h4 className="text-gray-400">Every 365 days</h4>
              </div>
            </td>
            <td className="px-4 py-2 text-purple-500 underline decoration-solid">
              <p>14248</p>
              <p>14248</p>
            </td>
            <td className="px-4 py-2">
              <div className="vehicle-wrap">
                <div className="vehicle-wrap__flex flex items-start">
                  <a href="">
                    <div className="vehicle-wrap__image-wrap w-20 h-20 mr-2 relative">
                      <img
                        src="vehicle.png"
                        alt="vehicle"
                        className="w-20 h-20 rounded-full border border-gray-500"
                      />
                      <div className="color-circle w-5 h-5 absolute bottom-1 right-1 border border-gray-800 bg-white rounded-full  "></div>
                    </div>
                  </a>
                  <div className="vehicle-wrap__info">
                    <p className="vehicle-wrap__title">
                      <a href="" className="text-blue-600">
                        VOLKSWAGEN
                      </a>
                    </p>
                    <div className="td-row bg-gray-300 p-1 text-md my-2">
                      <span className="group">Compact Manual</span>
                    </div>
                    <div className="vehicle-wrap__info-bottom">
                      <a
                        href=""
                        className="text-blue-600 font-bold border border-gray-300 px-2"
                      >
                        ABC127
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 py-2 text-purple-100 ">
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                0{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                0{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                0{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                3{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                4{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                5{" "}
              </span>
              <span className="bg-gray-100 px-2 border border-gray-200 text-center">
                6{" "}
              </span>
            </td>
            <td className="px-4 py-2">None</td>
            <td className="px-4 py-2 flex text-xl">
              <HiOutlineWrenchScrewdriver className="text-purple-600 mr-4" />
              <ImCross className="text-purple-600" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
