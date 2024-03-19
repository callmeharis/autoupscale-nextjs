import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

export function ProfileUploderImg() {

	const [imageUrl, setImageUrl] = useState(null);

	function handleUpload({ target }) {
		const file = target.files[0];
		const reader = new FileReader();

		reader.onload = function (event) {
			setImageUrl(target.result);
		};
		reader.readAsDataURL(file);
	}

	return (
		<>
			<div>
				<div className="flex items-center mb-4">
					{imageUrl ? (
						<img
							src={imageUrl}
							alt="Profile"
							className="h-32 w-32 rounded-full object-cover mr-4"
						/>
					) : (
						<div className="h-32 w-32 rounded-full bg-white border border-gray-200 flex items-center justify-center mr-4 ">
							<img src="https://demo.Auto Upscale.com/assets/1cd099cc/img/svg/noname.svg" />
						</div>
					)}
					<input
						id="file-upload"
						type="file"
						onChange={handleUpload}
						className="hidden"
					/>
					<label
						htmlFor="file-upload"
						className="cursor-pointer bg-white hover:text-blue-400 text-gray-800 font-semibold p-2  mt-[-65px] ml-[-20px] rounded-full shadow"
					>
						<FaPencilAlt />
					</label>
				</div>
			</div>
		</>
	);
}
