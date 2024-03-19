import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../hooks/use-translation';
import BaseControl, { BaseControlProps } from './base-control';
import { Eye, EyeFill, EyeSlash, QuestionCircle } from 'react-bootstrap-icons';

export interface BaseInputProps extends BaseControlProps {
  accept?: string;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: string;
  min?: string | number;
  max?: string | number;
  step?: number;
  placeholder?: string | boolean;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  labelTextColor?: string;
  hideErrors?: Boolean | (() => boolean);
  tooltip?: boolean;
  tooltipText?: string;
  showPasswordToggle?: boolean;
}

function BaseInput({
  formik,
  accept,
  required,
  className,
  label,
  handleBlur,
  type,
  min,
  max,
  step,
  placeholder,
  value,
  onChange,
  onKeyDown,
  readOnly,
  name,
  touched,
  error,
  append,
  prepend,
  labelTextColor,
  hideErrors,
  tooltip,
  tooltipText,
  showPasswordToggle = false,
}: BaseInputProps) {
  const { t } = useTranslation();
  const [showEye, setShowEye] = useState(false);

  if (formik) {
    /**
     * @type {import('formik').FieldMetaProps}
     */
    const meta = formik.getFieldMeta(name);

    if (meta) {
      value = meta.value;
      touched = meta.touched;
      error = meta.error;
    }
    onChange = onChange || formik.handleChange;
    handleBlur = handleBlur || formik.handleBlur;
  }

  if (type === 'date' && typeof value === 'string' && value?.includes('T')) {
    value = value.split('T')[0];
  }

  if (type === 'int' || type === 'integer') {
    type = 'number';
    step = 1;
    onKeyDown =
      onKeyDown ||
      /**
       * @param {React.KeyboardEvent<HTMLInputElement} e
       */
      function (e) {
        // prevent negative if the min value is set to 0
        if (min != null && +min >= 0 && e.key === '-') e.preventDefault();

        if (e.key === '.') {
          e.preventDefault();
        }
      };
  } else if (type === 'number') {
    onKeyDown =
      onKeyDown ||
      /**
       * @param {React.KeyboardEvent<HTMLInputElement} e
       */
      function (e) {
        // prevent negative if the min value is set to 0
        if (min != null && +min >= 0 && e.key === '-') e.preventDefault();
      };
  }

  if (type === 'number') {
    let currentOnChange = onChange;

    /**
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    onChange = e => {
      const { value } = e.target;

      if (value && value.startsWith('.')) {
        e.target.value = `0${value}`;
      }

      if (currentOnChange) currentOnChange(e);
    };
  }

  const onToggleEye = () => setShowEye(!showEye);
  return (
    <BaseControl
      className={className}
      name={name}
      label={label}
      required={required}
      formik={formik}
      touched={touched}
      error={error}
      hideErrors={hideErrors}
      prepend={prepend}
      append={append}
      labelTextColor={labelTextColor}
      tooltip={tooltip}
      tooltipText={tooltipText}
    >
      <input
        accept={type == 'file' ? accept : null}
        onBlur={handleBlur}
        type={showPasswordToggle && showEye ? 'text' : type || 'text'}
        min={min}
        max={max}
        step={step}
        placeholder={
          placeholder === true ? label || name : (placeholder || '').toString()
        }
        value={value == null ? '' : value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        readOnly={readOnly}
        name={name}
        className={`${error ? 'is-invalid' : ''} ${
          readOnly ? 'bg-gray-200' : ''
        }  focus:outline-none w-full font-normal `}
      />

      <div className='absolute top-[30%] right-[2%]'>
        {showPasswordToggle ? (
          showEye ? (
            <EyeSlash onClick={onToggleEye} />
          ) : (
            <Eye onClick={onToggleEye} />
          )
        ) : null}
      </div>
    </BaseControl>
  );
}

export default BaseInput;
