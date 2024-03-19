import React, { useEffect } from "react";

import { useTranslation } from "../../hooks/use-translation";
import { BaseControlProps } from "./base-control";
import BaseCheck from "./base-check";

function InlineLayout(
	t,
	options,
	value,
	name,
	labelKey,
	valueKey,
	onChange,
	handleBlur,
	readOnly,
	error,
	labelPrefix
) {
	return (
		<>
			{options?.map((v, i) => (
				<div
					key={i}
					className={`form-check form-check-inline flex-row-reverse`}
				>
					<label className="form-check-label">
						{t((labelPrefix ? labelPrefix + "." : "") + v[labelKey])}
					</label>
					<input
						className={`form-check-input ${error ? "is-invalid" : ""}`}
						type="checkbox"
						readOnly={readOnly}
						value={v[valueKey]}
						name={name}
						onChange={onChange}
						onBlur={handleBlur}
						// checked={value.includes(`${v[valueKey]}`)}
						checked={value.map(String).includes(v[valueKey].toString())}
					/>
				</div>
			))}
		</>
	);
}

function ColLayout(
	t,
	options,
	cols,
	value,
	name,
	labelKey,
	valueKey,
	onChange,
	handleBlur,
	readOnly,
	error,
	labelPrefix
) {
	return (
		<div className="row mt-1">
			{options?.map((v, i) => (
				<div key={i} className={`col-md-${12 / cols}`}>
					<div className={`form-check form-check-inline flex-row-reverse`}>
						<label className="form-check-label">
							{t((labelPrefix ? labelPrefix + "." : "") + v[labelKey])}
						</label>
						<input
							className={`form-check-input ${error ? "is-invalid" : ""}`}
							readOnly={readOnly}
							type="checkbox"
							value={v[valueKey]}
							name={name}
							onChange={onChange}
							onBlur={handleBlur}
							checked={value.map(String).includes(v[valueKey].toString())}
						/>
					</div>
				</div>
			)
			)}
		</div>
	);
}

export interface BaseCheckListProps extends BaseControlProps {
	options?: object[];
	labelKey?: string;
	valueKey?: string;
	labelPrefix?: string;
	value?: string[];
	cols?: string | number;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	readOnly?: boolean | (() => boolean);
	enumType?: object;
	showSelectAll?: boolean | (() => boolean);
}

function BaseCheckList({
	formik,
	required,
	className,
	label,
	options,
	labelKey = "label",
	valueKey = "value",
	labelPrefix,
	value,
	cols,
	onChange,
	handleBlur,
	readOnly,
	name,
	touched,
	error,
	enumType,
	showSelectAll,
}: BaseCheckListProps) {
	const { t } = useTranslation();

	if (formik) {
		/**
		 * @type {import('formik').FieldMetaProps}
		 */
		const meta = formik.getFieldMeta(name);

		if (meta) {
			value = meta?.value;
			touched = meta?.touched;
			error = meta?.error;
		}
		onChange = onChange || formik.handleChange;
		handleBlur = handleBlur || formik.handleBlur;
	}
	if (typeof enumType === "object") {
		options = Object?.entries(enumType)?.map(([key, value]) => ({
			[valueKey]: value,
			[labelKey]: value,
		}));
	}
	if (!value) value = [];

	const handleSelectAllChange = ({ target: { checked } }) => {
		formik.setFieldValue(name, checked ? options?.map((v: any) => v?.id?.toString()) : []);
	};

	return (
		<div className={className}>
			{label && (
				<span style={{ marginRight: "20px" }}>
					{t(label)}
					{required ? "*" : ""}:
				</span>
			)}
			{showSelectAll
				&& (<BaseCheck name="selectAll"
					onChange={handleSelectAllChange}
					checked={options?.length == value?.length}
					className="font-normal"
					label="Select All" />
				)
			}
			{cols
				? ColLayout(
					t,
					options,
					+cols,
					value,
					name,
					labelKey,
					valueKey,
					onChange,
					handleBlur,
					readOnly,
					error,
					labelPrefix
				)
				: InlineLayout(
					t,
					options,
					value,
					name,
					labelKey,
					valueKey,
					onChange,
					handleBlur,
					readOnly,
					error,
					labelPrefix
				)}
			{touched && error && typeof error === "string" ? (
				<span className="text-danger small">{error}</span>
			) : null}
		</div>
	);
}

export default BaseCheckList;
