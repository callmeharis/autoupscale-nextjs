import { Table } from "react-bootstrap";

import { useTranslation } from "../../hooks/use-translation";

export interface ViewDetailProps {
    title?: string;
    objArray?: Array<Record<string, number | string | boolean | Date | ListValue | Array<string | boolean | Date | ListValue> | any>>;
    obj?: Record<string, number | string | boolean | Date | ListValue | Array<string | boolean | Date | ListValue> | any>;
    default?: string | (() => string);
    className?: string;
}

interface ListValue {
    show?: boolean | (() => boolean);
    label?: any;
    items?: Array<string | boolean | Date | ListValue>;
    text?: ListValue | string | number | boolean | Date | Array<string | boolean | Date | ListValue>;
    default?: string | (() => string);
}

function isListValue(obj: unknown): obj is ListValue {
    return obj &&
        Object.prototype.hasOwnProperty.call(obj, "label");
}

export default function ViewDetails(props: ViewDetailProps) {


    const resolveText = (value: string | boolean | Date | ListValue | Function) => {
        return resolveValue(value) || (isListValue(value) ? resolveValue(value?.default || props.default) : null);
    }

    const resolveValue = (value: number | string | boolean | Date | ListValue | Function | Array<string | boolean | Date | ListValue>) => {
        switch (typeof value) {
            case "function": return value();
            case "boolean":
                switch (value) {
                    case true: return "YES";
                    case false: return "NO";
                }
                break;
            case "object":
                if (value instanceof Date) {
                    return value.toDateString();
                }

                if (value instanceof Array) {
                    return value.map(v => v.toString()).join(", ");
                }
                if (isListValue(value))
                    return resolveValue(value.text);
                return value;
            default: return value?.toString();
        }

    }

    const resolveItem = (key: string, value: string | boolean | Date | ListValue, i: number) => {
        // coherse value into ListValue compatible type
        if (value && typeof value === "object") {
            if (value instanceof Array) {
                value = {
                    label: key,
                    items: value
                };
            }
            else if (value instanceof Date) {
                value = {
                    label: key,
                    text: value
                }
            }
            else {
                value.label = value.label || key;
            }
        }
        else {
            value = {
                label: key,
                text: value
            };
        }

        // resolve display property
        if (isListValue(value)) {
            if (typeof value.show === "function") {
                value.show = value.show();
            }

            if (value.show === false) return;

            if (typeof value.default === "function") {
                value.default = value.default();
            }

            if (value.items) {
                // nested table
                const firstValue = value.items[0];
                if (typeof firstValue === "object") {
                    return (
                        <tr key={key} className="border-b border-gray-200 hover:bg-gray-50">
                            <td colSpan={2}>
                                <div className="p-4">
                                    <h3 className="text-lg font-medium text-gray-900">{value.label}</h3>
                                    <hr className="my-2 border-gray-200" />
                                    <Table>
                                        <thead>
                                            <tr>
                                                {Object.entries(firstValue).map(([subKey, subValue], subI) => (
                                                    <th
                                                        key={subI}
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        {subValue.label || subKey}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="flex">
                                            {value.items.map((v, i) => (
                                                <tr key={i}>
                                                    {Object.values(v).map((subValue, subI) => (
                                                        <td
                                                            key={subI}
                                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                                                        >
                                                            {resolveText(subValue)}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </td>
                        </tr>

                    );
                }
                else {
                    value.text = value.items;
                    delete value.items;
                }
            }

            return (
                <Table className="border-0 flex m-0">
                    <tr className="border-0 md:block flex justify-between" key={key}>
                        <div>
                            <th className="border-0 pb-0 text-gray-400 mb-4 text-base font-normal">{value.label}</th>
                        </div>
                        <div>

                            <td className="border-0">{resolveText(value)}</td>
                        </div>
                    </tr>
                </Table>

            );
        }

        return (<></>);
    }

    return (
        <div className={`${props.className ?? "p-0"} `}>
            <div className="flex justify-between min-h-16 items-center py-3  px-6 border-b border-gray-300">
                {props.title && <h3 className=" font-medium text-gray-800 text-lg">{props.title}</h3>}
            </div>
            {
                Boolean(props.objArray) ? (
                    props.objArray.map((objArray, index) => (
                        <Table bordered striped key={index}>
                            <tbody className="flex">
                                <div className="w-full flex p-[20px] border-0">
                                    {Object.entries(objArray).map(([key, value], i) => resolveItem(key, value, i))}
                                </div>
                            </tbody>
                        </Table>
                    ))
                ) : (
                    <Table bordered striped>
                        <tbody className="flex">
                            <div className=" w-full flex p-[20px] border-0 md:flex-row flex-col">

                                {Object.entries(props.obj).map(([key, value], i) => resolveItem(key, value, i))}
                            </div>
                        </tbody>
                    </Table>
                )
            }



        </div>
    );

}