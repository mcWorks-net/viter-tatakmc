import { useField } from "formik";
import React from "react";

export const InputTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "custom error-show" : "custom"}
      >
        {label}
      </label>
      <textarea
        className={meta.touched && meta.error ? "error-show" : null}
        {...field}
        {...props}
        autoComplete="off"
      ></textarea>
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputText = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "custom error-show" : "custom"}
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={meta.touched && meta.error ? "error-show" : null}
        autoComplete="off"
      />
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputSelect = ({ label, onChange, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "custom error-show" : "custom"}
      >
        {label}
      </label>

      <select
        {...field}
        {...props}
        className={meta.touched && meta.error ? "error-show" : null}
        onChange={(e) => {
          onChange(e);
          field.onChange(e);
        }}
      />

      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputFileUpload = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <span className="error--msg">{meta.error}</span>
      ) : null}
    </>
  );
};

export const MyRadio = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <input {...field} {...props} />
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "error-show" : ""}
      >
        {label}
      </label>

      {/* {meta.touched && meta.error ? (
        <p className="error-msg">{meta.error}</p>
      ) : null} */}
    </>
  );
};

export const MyCheckbox = ({ label, open, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <input
        {...field}
        {...props}
        className={
          meta.touched && meta.error
            ? "w-auto h-auto error-show"
            : "w-auto h-auto"
        }
      />
      <label className="label" htmlFor={props.id || props.name}>
        {label}
      </label>
      {/* <span htmlFor={props.id || props.name}>{label}</span> */}
      {meta.touched && meta.error ? (
        <small className="msg--error">{meta.error}</small>
      ) : null}
    </>
  );
};
