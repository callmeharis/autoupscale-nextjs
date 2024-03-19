import { FaCloudDownloadAlt } from "react-icons/fa";
import React from "react";
export function FormDocumentSec() {
	return (
		<div className="sixth_row mr-3">
			<div className="text-black font-semibold text-lg">Documents</div>
			<div className="bg-gray-200 py-3 px-4 lg:flex items-center">
				<div>
					<label
						className="block tracking-wide text-gray-700  text-sm mb-1"
						htmlFor="documentType"
					></label>
					<div className="inline-block relative w-44">
						<select className="appearance-none block w-full input_Text-color border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500  text-sm">
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

				<div className=" lg:mx-3">
					<label
						className="block  tracking-wide text-gray-700  text-sm mb-2"
						htmlFor="document-numer"
					>
						Number
					</label>
					<input
						className="appearance-none block w-full  input_Text-color border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
						id="document-numer"
						type="text"
						placeholder="Number"
					/>
				</div>
				<div className=" lg:mx-3">
					<label
						className="block  tracking-wide text-gray-700  text-sm mb-2"
						htmlFor="issueDate"
					>
						Issue Date
					</label>
					<input
						className="appearance-none block w-full  input_Text-color border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
						id="issueDate"
						type="date"
						placeholder="Select Date"
					/>
				</div>
				<div className="lg:mx-3">
					<label
						className="block tracking-wide text-gray-700  text-sm mb-2"
						htmlFor="ExpDtae"
					>
						Exp Date
					</label>
					<input
						className="appearance-none block w-full  input_Text-color border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
						id="ExpDtae"
						type="date"
						placeholder="Select Date"
					/>
				</div>
				<div className="lg:mx-3 mt-5">
					<div className="flex items-center  font-bold text-lg text-blue-700">
						<FaCloudDownloadAlt /> <h4 className="mx-3">Upload</h4>
					</div>
				</div>
			</div>
		</div>
	);
}
