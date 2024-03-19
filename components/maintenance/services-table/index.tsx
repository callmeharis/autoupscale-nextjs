import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { FaOilCan, FaSearch } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import React from "react";
export function ServicesTable() {
  return (
    <>
      <h1 className="px-10 mb-6 font-bold text-3xl">Order Service List</h1>
      <div className="overflow-x-auto px-10">
        <table className="table-auto w-full text-lg">
          <thead>
            <tr className="border-b-2 text-purple-100 text-left">
              <th>Sr</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Period</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Vehicle</th>
              <th className="px-4 py-2">Partner</th>
              <th className="px-4 py-2">Balance</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="align-top">
            <tr className="border-b-2 text-sm">
              <td className="text-purple-100 underline py-2">1</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                09.03.2023
                <span className="text-gray-400"> 13:04</span>
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <button className="px-2 bg-orange-400 rounded-3xl text-white">
                  in service
                </button>
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <div>
                  09.03.2023
                  <span className="text-gray-400"> 11:07</span>
                </div>
                <div>
                  11.03.2024
                  <span className="text-gray-400"> 01:50</span>
                </div>
              </td>
              <td className="px-4 py-2 flex flex-col">
                <div className="flex">
                  <HiOutlineWrenchScrewdriver className="text-purple-600 text-xl mr-2" />
                  <div className="services">
                    <h4 className="text-gray-700">Oil Change</h4>
                    <h4 className="text-gray-400">Every 10000.0 Km</h4>
                    <h4 className="text-gray-400">Every 365 days</h4>
                  </div>
                </div>
                <div className="flex">
                  <FaOilCan className="text-purple-600 text-xl mr-2" />
                  <div className="services">
                    <h4 className="text-gray-700">Full Service</h4>
                    <h4 className="text-gray-400">Every 20000.0 Km</h4>
                    <h4 className="text-gray-400">Every 365 days</h4>
                  </div>
                </div>
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
              <td className="px-4 py-2">
                <div className="vehicle-wrap">
                  <div className="vehicle-wrap__flex flex items-start">
                    <a href="">
                      <div className="vehicle-wrap__image-wrap w-20 h-20 mr-2 relative">
                        <img
                          src="g-normal.png"
                          alt="partners"
                          className="w-20 h-20 rounded-full border border-gray-500"
                        />
                        <div className="color-circle w-5 h-5 absolute bottom-1 right-1 border border-gray-800 bg-white rounded-full"></div>
                      </div>
                    </a>
                    <div className="vehicle-wrap__info">
                      <p className="vehicle-wrap__title">
                        <a href="" className="text-blue-600">
                          PETROS <br /> GARAGE LTD
                        </a>
                      </p>
                      <div className="td-row bg-gray-300 p-1 w-20 text-md my-2">
                        <span className="group">Partners</span>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="balance">
                  <h4 className="text-gray-400">Total</h4>
                  <h4 className="text-gray-700">235.00</h4>
                  <h4 className="text-gray-400">&euro;</h4>
                </div>
              </td>
              <td className="px-4 py-2 flex text-xl">
                <FaSearch className="text-purple-600 mr-4" />
                <FiEdit2 className="text-purple-600" />
              </td>
            </tr>
            <tr className="border-b-2 text-sm">
              <td className="text-purple-100 underline py-2">2</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                09.03.2023
                <span className="text-gray-400"> 13:04</span>
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <button className="px-2 bg-orange-400 rounded-3xl text-white">
                  in service
                </button>
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <div>
                  09.03.2023
                  <span className="text-gray-400"> 11:07</span>
                </div>
                <div>
                  11.03.2024
                  <span className="text-gray-400"> 01:50</span>
                </div>
              </td>
              <td className="px-4 py-2 flex flex-col">
                <div className="flex">
                  <HiOutlineWrenchScrewdriver className="text-purple-600 text-xl mr-2" />
                  <div className="services">
                    <h4 className="text-gray-700">Oil Change</h4>
                    <h4 className="text-gray-400">Every 10000.0 Km</h4>
                    <h4 className="text-gray-400">Every 365 days</h4>
                  </div>
                </div>
                <div className="flex">
                  <FaOilCan className="text-purple-600 text-xl mr-2" />
                  <div className="services">
                    <h4 className="text-gray-700">Full Service</h4>
                    <h4 className="text-gray-400">Every 20000.0 Km</h4>
                    <h4 className="text-gray-400">Every 365 days</h4>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="vehicle-wrap">
                  <div className="vehicle-wrap__flex flex items-start">
                    <a href="">
                      <div className="vehicle-wrap__image-wrap w-20 h-20 mr-2 relative">
                        <img
                          src="vehicle2.gif"
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
              <td className="px-4 py-2">
                <div className="vehicle-wrap">
                  <div className="vehicle-wrap__flex flex items-start">
                    <a href="">
                      <div className="vehicle-wrap__image-wrap w-20 h-20 mr-2 relative">
                        <img
                          src="g-normal.png"
                          alt="partners"
                          className="w-20 h-20 rounded-full border border-gray-500"
                        />
                        <div className="color-circle w-5 h-5 absolute bottom-1 right-1 border border-gray-800 bg-white rounded-full"></div>
                      </div>
                    </a>
                    <div className="vehicle-wrap__info">
                      <p className="vehicle-wrap__title">
                        <a href="" className="text-blue-600">
                          PETROS <br /> GARAGE LTD
                        </a>
                      </p>
                      <div className="td-row bg-gray-300 p-1 w-20 text-md my-2">
                        <span className="group">Partners</span>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="balance">
                  <h4 className="text-gray-400">Total</h4>
                  <h4 className="text-gray-700">235.00</h4>
                  <h4 className="text-gray-400">&euro;</h4>
                </div>
              </td>
              <td className="px-4 py-2 flex text-xl">
                <FaSearch className="text-purple-600 mr-4" />
                <FiEdit2 className="text-purple-600" />
              </td>
            </tr>
            <tr className="border-b-2 text-sm">
              <td className="text-purple-100 underline py-2">3</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                09.03.2023
                <span className="text-gray-400"> 13:04</span>
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <button className="px-2 bg-orange-400 rounded-3xl text-white">
                  in service
                </button>
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <div>
                  09.03.2023
                  <span className="text-gray-400"> 11:07</span>
                </div>
                <div>
                  11.03.2024
                  <span className="text-gray-400"> 01:50</span>
                </div>
              </td>
              <td className="px-4 py-2 flex flex-col">
                <div className="flex">
                  <HiOutlineWrenchScrewdriver className="text-purple-600 text-xl mr-2" />
                  <div className="services">
                    <h4 className="text-gray-700">Oil Change</h4>
                    <h4 className="text-gray-400">Every 10000.0 Km</h4>
                    <h4 className="text-gray-400">Every 365 days</h4>
                  </div>
                </div>
                <div className="flex">
                  <FaOilCan className="text-purple-600 text-xl mr-2" />
                  <div className="services">
                    <h4 className="text-gray-700">Full Service</h4>
                    <h4 className="text-gray-400">Every 20000.0 Km</h4>
                    <h4 className="text-gray-400">Every 365 days</h4>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="vehicle-wrap">
                  <div className="vehicle-wrap__flex flex items-start">
                    <a href="">
                      <div className="vehicle-wrap__image-wrap w-20 h-20 mr-2 relative">
                        <img
                          src="vehicle3.jpg"
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
              <td className="px-4 py-2">
                <div className="vehicle-wrap">
                  <div className="vehicle-wrap__flex flex items-start">
                    <a href="">
                      <div className="vehicle-wrap__image-wrap w-20 h-20 mr-2 relative">
                        <img
                          src="g-normal.png"
                          alt="partners"
                          className="w-20 h-20 rounded-full border border-gray-500"
                        />
                        <div className="color-circle w-5 h-5 absolute bottom-1 right-1 border border-gray-800 bg-white rounded-full"></div>
                      </div>
                    </a>
                    <div className="vehicle-wrap__info">
                      <p className="vehicle-wrap__title">
                        <a href="" className="text-blue-600">
                          PETROS <br /> GARAGE LTD
                        </a>
                      </p>
                      <div className="td-row bg-gray-300 p-1 w-20 text-md my-2">
                        <span className="group">Partners</span>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="balance">
                  <h4 className="text-gray-400">Total</h4>
                  <h4 className="text-gray-700">235.00</h4>
                  <h4 className="text-gray-400">&euro;</h4>
                </div>
              </td>
              <td className="px-4 py-2 flex text-xl">
                <FaSearch className="text-purple-600 mr-4" />
                <FiEdit2 className="text-purple-600" />
              </td>
            </tr>
            <tr className="border-b-2 text-sm">
              <td className="text-purple-100 underline py-2">4</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                09.03.2023
                <span className="text-gray-400"> 13:04</span>
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <button className="px-2 bg-orange-400 rounded-3xl text-white">
                  in service
                </button>
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <div>
                  09.03.2023
                  <span className="text-gray-400"> 11:07</span>
                </div>
                <div>
                  11.03.2024
                  <span className="text-gray-400"> 01:50</span>
                </div>
              </td>
              <td className="px-4 py-2 flex flex-col">
                <div className="flex">
                  <HiOutlineWrenchScrewdriver className="text-purple-600 text-xl mr-2" />
                  <div className="services">
                    <h4 className="text-gray-700">Oil Change</h4>
                    <h4 className="text-gray-400">Every 10000.0 Km</h4>
                    <h4 className="text-gray-400">Every 365 days</h4>
                  </div>
                </div>
                <div className="flex">
                  <FaOilCan className="text-purple-600 text-xl mr-2" />
                  <div className="services">
                    <h4 className="text-gray-700">Full Service</h4>
                    <h4 className="text-gray-400">Every 20000.0 Km</h4>
                    <h4 className="text-gray-400">Every 365 days</h4>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="vehicle-wrap">
                  <div className="vehicle-wrap__flex flex items-start">
                    <a href="">
                      <div className="vehicle-wrap__image-wrap w-20 h-20 mr-2 relative">
                        <img
                          src="vehicle4.jpg"
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
              <td className="px-4 py-2">
                <div className="vehicle-wrap">
                  <div className="vehicle-wrap__flex flex items-start">
                    <a href="">
                      <div className="vehicle-wrap__image-wrap w-20 h-20 mr-2 relative">
                        <img
                          src="g-normal.png"
                          alt="partners"
                          className="w-20 h-20 rounded-full border border-gray-500"
                        />
                        <div className="color-circle w-5 h-5 absolute bottom-1 right-1 border border-gray-800 bg-white rounded-full"></div>
                      </div>
                    </a>
                    <div className="vehicle-wrap__info">
                      <p className="vehicle-wrap__title">
                        <a href="" className="text-blue-600">
                          PETROS <br /> GARAGE LTD
                        </a>
                      </p>
                      <div className="td-row bg-gray-300 p-1 w-20 text-md my-2">
                        <span className="group">Partners</span>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="balance">
                  <h4 className="text-gray-400">Total</h4>
                  <h4 className="text-gray-700">235.00</h4>
                  <h4 className="text-gray-400">&euro;</h4>
                </div>
              </td>
              <td className="px-4 py-2 flex text-xl">
                <FaSearch className="text-purple-600 mr-4" />
                <FiEdit2 className="text-purple-600" />
              </td>
            </tr>
            <tr className="border-b-2 text-sm">
              <td className="text-purple-100 underline py-2">5</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                09.03.2023
                <span className="text-gray-400"> 13:04</span>
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <button className="px-2 bg-orange-400 rounded-3xl text-white">
                  in service
                </button>
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <div>
                  09.03.2023
                  <span className="text-gray-400"> 11:07</span>
                </div>
                <div>
                  11.03.2024
                  <span className="text-gray-400"> 01:50</span>
                </div>
              </td>
              <td className="px-4 py-2 flex flex-col">
                <div className="flex">
                  <HiOutlineWrenchScrewdriver className="text-purple-600 text-xl mr-2" />
                  <div className="services">
                    <h4 className="text-gray-700">Oil Change</h4>
                    <h4 className="text-gray-400">Every 10000.0 Km</h4>
                    <h4 className="text-gray-400">Every 365 days</h4>
                  </div>
                </div>
                <div className="flex">
                  <FaOilCan className="text-purple-600 text-xl mr-2" />
                  <div className="services">
                    <h4 className="text-gray-700">Full Service</h4>
                    <h4 className="text-gray-400">Every 20000.0 Km</h4>
                    <h4 className="text-gray-400">Every 365 days</h4>
                  </div>
                </div>
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
              <td className="px-4 py-2">
                <div className="vehicle-wrap">
                  <div className="vehicle-wrap__flex flex items-start">
                    <a href="">
                      <div className="vehicle-wrap__image-wrap w-20 h-20 mr-2 relative">
                        <img
                          src="g-normal.png"
                          alt="partners"
                          className="w-20 h-20 rounded-full border border-gray-500"
                        />
                        <div className="color-circle w-5 h-5 absolute bottom-1 right-1 border border-gray-800 bg-white rounded-full"></div>
                      </div>
                    </a>
                    <div className="vehicle-wrap__info">
                      <p className="vehicle-wrap__title">
                        <a href="" className="text-blue-600">
                          PETROS <br /> GARAGE LTD
                        </a>
                      </p>
                      <div className="td-row bg-gray-300 p-1 w-20 text-md my-2">
                        <span className="group">Partners</span>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="balance">
                  <h4 className="text-gray-400">Total</h4>
                  <h4 className="text-gray-700">235.00</h4>
                  <h4 className="text-gray-400">&euro;</h4>
                </div>
              </td>
              <td className="px-4 py-2 flex text-xl">
                <FaSearch className="text-purple-600 mr-4" />
                <FiEdit2 className="text-purple-600" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
