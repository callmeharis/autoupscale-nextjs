import { HeadingSec, ProfileUploderImg } from "../../reuse-component";
import { FormDocumentSec } from "./header";
import React from "react";
export function FormSection() {
  return (
    <>
      <div className="tab p-32">
        <div className="bg-gray-200 p-5">
          <div className="heading__sec py-4">
            <HeadingSec title="Add Company" />
          </div>
          <div className="p-10 shahdow-xl bg-white">
            <div className="First_row">
              <div className=" lg:w-8/12  lg:flex justify-center items-center ">
                <div>
                  <ProfileUploderImg />
                </div>
                <div className="lg:mx-3">
                  <label
                    className="block  tracking-wide text-gray-300  text-sm mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="appearance-none block w-full  input_Text-color border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                    id="name"
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <div className="lg:mx-3">
                  <label
                    className="block  tracking-wide text-gray-300  text-sm mb-2"
                    htmlFor="last-name"
                  >
                    Last Name
                  </label>
                  <input
                    className="appearance-none block w-full  input_Text-color border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                    id="last-name"
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
                <div className="lg:mx-3">
                  <label
                    className="block  tracking-wide text-gray-300  text-sm mb-2"
                    htmlFor="birthday"
                  >
                    Birthday
                  </label>
                  <input
                    className="appearance-none block w-full  input_Text-color border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                    id="birthday"
                    type="date"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="secondrow lg:flex">
              <div className="groups">
                <label
                  className="block  tracking-wide text-gray-300  text-sm mb-2"
                  htmlFor="groups"
                >
                  Groups
                </label>
                <div className="inline-block relative w-44">
                  <select
                    className="appearance-none block w-full  input_Text-color border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500  text-sm"
                    id="groups"
                  >
                    <option>Clients</option>
                    <option>Partners</option>
                    <option>Black List</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="thirdRow mt-4">
              <div className="lg:flex w-10/12">
                <div className="mr-3">
                  <label
                    className="block  tracking-wide text-gray-300  text-sm mb-2"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <input
                    className="appearance-none block w-full  input_Text-color border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                    id="country"
                    type="text"
                    placeholder="Country"
                  />
                </div>
                <div className=" lg:mx-3">
                  <label
                    className="block  tracking-wide text-gray-300  text-sm mb-2"
                    htmlFor="zip"
                  >
                    Zip
                  </label>
                  <input
                    className="appearance-none block w-full  input_Text-color border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                    id="zip"
                    type="text"
                    placeholder="Zip"
                  />
                </div>
                <div className=" lg:mx-3">
                  <label
                    className="block  tracking-wide text-gray-300  text-sm mb-2"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <input
                    className="appearance-none block w-full  input_Text-color border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                    id="state"
                    type="text"
                    placeholder="State"
                  />
                </div>
                <div className=" lg:mx-3">
                  <label
                    className="block  tracking-wide text-gray-300  text-sm mb-2"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <input
                    className="appearance-none block w-full  input_Text-color border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                    id="city"
                    type="text"
                    placeholder="City"
                  />
                </div>
                <div className=" lg:mx-3">
                  <label
                    className="block  tracking-wide text-gray-300  text-sm mb-2"
                    htmlFor="street"
                  >
                    Street
                  </label>
                  <input
                    className="appearance-none block w-full  input_Text-color border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                    id="street"
                    type="text"
                    placeholder="Street"
                  />
                </div>
                <div className=" lg:mx-3">
                  <label
                    className="block  tracking-wide text-gray-300  text-sm mb-2"
                    htmlFor="number"
                  >
                    Building
                  </label>
                  <input
                    className="appearance-none block w-full  input_Text-color border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                    id="number"
                    type="text"
                    placeholder="Number"
                  />
                </div>
              </div>
            </div>
            <div className="Fourth_row mt-4">
              <div className="lg:w-8/12  flex  items-center ">
                <div className="mr-3">
                  <label
                    className="block  tracking-wide text-gray-300  text-sm mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full  input_Text-color border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                    id="email"
                    type="text"
                    placeholder="Email"
                  />
                </div>
                <div className=" lg:mx-3">
                  <label
                    className="block  tracking-wide text-gray-300  text-sm mb-2"
                    htmlFor="customerphone"
                  >
                    Phone
                  </label>
                  <input
                    className="appearance-none block w-full  input_Text-color border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                    id="customerphone"
                    type="text"
                    placeholder="Customer Phone"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 FifthRow">
              <div className="mr-3">
                <label
                  className="block  tracking-wide text-gray-300  text-sm mb-2"
                  htmlFor="notes"
                >
                  Notes
                </label>
                <textarea
                  rows={4}
                  className="lg:w-96 sm:w-full appearance-none block   text-gray-300 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                ></textarea>
              </div>
            </div>

            <div className="pt-10 form-dacoument-section">
              <FormDocumentSec />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
