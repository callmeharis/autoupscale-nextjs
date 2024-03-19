import * as yup from "yup"
import { useTranslation } from "../hooks/use-translation";

yup.addMethod(yup.string, "enum", function (enumType, message) {
	const keys = Object.values(enumType);
	const set = new Set(keys);
	return this.test("enum", message, function (str) {
		if (str && !set.has(str)) {
			if (!message) {
				message = `${this.path} must be one of ${keys.join(", ")}`;
			}
			return this.createError({
				path: this.path,
				message: message
			});
		}
		return true;
	});
});

/**
 * @param {TestContext} thisObj
 * @param {any[]} list 
 * @param {string} field
 * @param {object} options 
 * @param {any => string} options.mapper
 * @param {string} message
 */
function unique(thisObj, list, field, options, message) {
	if (list) {
		const { mapper } = options;
		const set = new Set();

		for (let i = 0; i < list.length; i++) {
			let value;
			if (mapper) value = mapper(list[i]);
			else if (field) value = yup.ref(field).getter(list[i]);
			else value = list[i];

			if (!value) continue;

			if (set.has(value)) {
				return thisObj.createError({
					path: `${thisObj.path}[${i}].${field}`,
					message: message,
					params: {
						field: field
					},
					type: "unique"
				});
				return false;
			}
			set.add(value);
		}
	}
	return true;
}

/**
 * 
 * @param {string} field 
 * @param {object} options 
 * @param {(any) => string} options.mapper
 * @param {string} message
 * @this import("yup/lib/array").OptionalArraySchema
 */
unique.addTest = function (field, options, message) {
	if (typeof options === "string") {
		message = options;
		options = null;
	}
	if (!message) message = "yup.array.unique";
	if (!options) options = {};

	if (message) {
		return this.test("unique", message, function (list) {
			return unique(this, list, field, options, message);
		});
	}
	return this.test("unique", function () { return this.createError() }, function (list) {
		return unique(this, list, field, options, message);
	});
}

yup.addMethod(yup.array, "unique", unique.addTest);

export function stringEnum<Enum>(enumType: Enum) {
	const keys = Object.values(enumType);
	return yup.mixed<Enum>().oneOf(keys).nullable();
}

export function numberRangeStart(maxField: string, minValue: number) {
	return yup.number().moreThan(minValue)

		// DO NOT IMPLEMENT BELOW: will cause Cyclic dependency when used in tandum with numberRangeEnd
		// .when(maxField, {
		//   is: v => v != null && +v > minValue,
		//   then: yup.number().lessThan(yup.ref(maxField)).nullable()
		// })
		.nullable()
}

export function numberRangeEnd(minField: string, minValue: number, inclusive?: boolean) {
	if (inclusive) {
		return yup.number().when(minField, {
			is: v => v != null && +v > minValue,
			then: yup.number().min(yup.ref(minField)).nullable(),
			otherwise: yup.number().moreThan(minValue).nullable()
		}).nullable()
	}
	return yup.number().when(minField, {
		is: v => v != null && +v > minValue,
		then: yup.number().moreThan(yup.ref(minField)).nullable(),
		otherwise: yup.number().moreThan(minValue).nullable()
	}).nullable()
}

export function cityRegexValidation() {
	const { t } = useTranslation();

	return yup.string().matches(/^[^0-9]+$/, t("CITY_REGEX_VALIDATION_MESSAGE")).nullable();
}

export function zipCodeRegexValidation() {
	const { t } = useTranslation();

	return yup.string()
		.matches(/^[0-9]+$/, t("ZIP_CODE_REGEX_VALIDATION_MESSAGE"))
		.min(5, t("ZIP_CODE_MIN_VALIDATION_MESSAGE"))
		.max(5, t("ZIP_CODE_MAX_VALIDATION_MESSAGE"))
		.nullable();
}

// export default {
//   object: yup.object,
//   string: yup.string,
//   number: yup.number,

//   entity: (schema) => yup.mixed().when({
//     is: v => !!v,
//     then: schema
//   })
// };