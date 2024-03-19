import React, { useState } from "react";
import { ChecklistTable, ServicesTable } from "../../components/maintenance";
import { FilterSearchBar } from "../../components/vehicle/filter-searchbar";
export default function Maintenance() {
	const [table, setTable] = useState("checklist");

	return (
		<div className="max-w-7xl m-auto ">
			<div className="tags flex px-10 py-5 gap-10 text-lg font-bold cursor-pointer border-b-2 text-smmx-10 mt-3">
				<h1 onClick={() => setTable("checklist")}>Check List</h1>
				<h1 onClick={() => setTable("services")}>Services</h1>
			</div>
			{/* <FilterSearchBar placeholder="What car are you searching?" /> */}
			{table === "checklist" ? <ChecklistTable /> : <ServicesTable />}
		</div>
	);
}
