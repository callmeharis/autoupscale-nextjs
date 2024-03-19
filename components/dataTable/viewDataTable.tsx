import React, { useEffect, useState } from "react";
import BaseLoader from "../forms/base-loader";
import { EmptyData } from "../empty-data";

type DataTableProps = {
  data?: any;
  itemsPerPage?: number;
  columns?: Array<{
    name: string;
    selector?: (row: Object) => any;
    cell?: (row: Object) => any;
    hidable?: boolean;
  }>;
  onSelectionChange?: (selectedRows: Array<Object>) => void;
  selectable?: "multi" | "single";
  isLoading?: boolean;
  buttonTitle?: string;
  buttonRoute?: string;
  className?: string;
};
// const useDataTable = (props: DataTableProps) => {
// const { data } = props;

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setLoading(false);
//         }, 2000);

//         return () => {
//             clearTimeout(timer);
//         };
//     }, []);

//     useEffect(() => {
//         if (data?.length) {
//             setLoading(false);
//         }
//     }, [data]);

//     return { isLoading };
// };
const DataTable: React.FC<DataTableProps> = (props: DataTableProps) => {
  const {
    itemsPerPage = 10,
    columns = [],
    onSelectionChange,
    selectable,
  } = props;
  // const { isLoading } = useDataTable(props);
  const [data, setData] = useState<any>(props.data);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(data)
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  function forcefullySetSelectedRows(selectedRow: Array<Object>) {
    setSelectedRows(selectedRow);
  }

  const handleRowClick = (item) => {
    if (selectable !== "multi" && selectable !== "single") {
      return;
    }

    const isSelected = selectedRows?.includes(item);
    let updatedSelectedRows = [];
    if (selectable === "multi") {
      updatedSelectedRows = isSelected
        ? selectedRows?.filter((selected) => selected !== item)
        : [...selectedRows, item];
    } else {
      updatedSelectedRows = isSelected ? [] : [item];
    }
    setSelectedRows(updatedSelectedRows);
    if (onSelectionChange) {
      onSelectionChange(updatedSelectedRows);
    }
  };

  const renderTableRows = () => {
    if (props.isLoading) {
      return (
        <div className="text-center">
          <div className="text-red-500 absolute left-1/2">
            <BaseLoader />
          </div>
        </div>
      );
    }

    // if (!data?.length) {
    //     return (
    //         <td>
    //         <div className='text-center'>
    //             <div className='text-red-500 absolute left-1/2'><EmptyData title='No Data Available Yet'/></div>
    //         </div>
    //         </td>
    //     );
    // }

    return currentItems?.map((item, index) => {
      const rowIsSelected = selectedRows?.includes(item);
      return (
        <tr
          key={item?.id}
          onClick={() => handleRowClick(item)}
          className={
            rowIsSelected
              ? "bg-custom-btn text-white hover:bg-custom-btn"
              : "hover:bg-slate-50"
          }
        >
          {selectable === "multi" && (
            <td className=" px-6 py-4">
              <input type="checkbox" checked={rowIsSelected} />
            </td>
          )}
          {selectable === "single" && (
            <td className=" px-6 py-4">
              <input type="radio" checked={rowIsSelected} />
            </td>
          )}
          {columns?.map((column, index) => {
            let cellContent = "";
            if (column?.selector) {
              cellContent = column?.selector(item);
            } else if (column?.cell) {
              cellContent = column?.cell(item);
            }
            return (
              column.hidable !== false && (
                <td key={index} className=" px-6 py-4">
                  {cellContent}
                </td>
              )
            );
          })}
        </tr>
      );
    });
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setData(props?.data);
  }, [props]);

  return (
    <div
      className={`overflow-x-auto rounded-lg border border-slate-200 shadow-md ${props.className}`}
    >
      <table className="w-full border-collapse bg-white text-left text-sm text-slate-500">
        <thead className="text-capitalize bg-slate-50">
          <tr>
            {selectable ? (
              <th className="px-6 py-4 font-medium text-slate-900">Select</th>
            ) : null}
            {columns.map((column, index) => {
              return (
                column.hidable !== false && (
                  <>
                    <th
                      key={index}
                      className="px-6 py-4 font-medium text-slate-900"
                    >
                      {column.name}
                    </th>
                  </>
                )
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {renderTableRows()}
        </tbody>
      </table>
      {!Boolean(data?.length) && !Boolean(props.isLoading) && (
        <>
          <EmptyData
            title="No Data Available Yet"
            buttonRoute={props.buttonRoute}
            buttonTitle={props.buttonTitle}
          />
        </>
      )}
      <div className="flex justify-center mt-4 float-right mb-3">
        <button
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-custom-btn text-white font-medium text-xl   shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-0 disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed rounded-full h-[32px] w-[32px] pb-[12px]"
        >
          {" "}
          «{" "}
        </button>
        <div className="flex ">
          {Array.from(
            { length: Math.ceil(data?.length / itemsPerPage) },
            (_, i) => i + 1
          ).map((pageNumber , index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(pageNumber)}
              className={`rounded-full  bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium  h-[32px] w-[32px] shadow-md  focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-0 ${
                currentPage === pageNumber
                  ? "bg-custom-btn hover:bg-custom-btn text-white"
                  : ""
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          onClick={handleNextClick}
          disabled={currentItems?.length < itemsPerPage}
          className=" bg-gray-300 text-white hover:bg-custom-btn hover:text-white font-medium  shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-0 disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed text-xl h-[32px] w-[32px] pb-2 rounded-[100px] mr-14 "
        >
          »
        </button>
      </div>
    </div>
  );
};
export default DataTable;
