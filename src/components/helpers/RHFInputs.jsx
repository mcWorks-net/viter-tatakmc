export const InputTextRHF = ({ label, errors, ...props }) => {
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input
        type={props.type}
        {...props.register(props.name)}
        id={props.name}
      />
      <small>{errors?.message}</small>
    </>
  );
};

export const SelectRHF = ({ label, errors, options, onChange, ...props }) => {
  let list = Object.entries(options);

  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <select name="" id="" {...props.register(props.name)}>
        {list.map(([key, val], index) => (
          <option value={key} key={index}>
            {val}
          </option>
        ))}
      </select>
      <small>{errors?.message}</small>
    </>
  );
};

export const TextAreaRHF = ({ label, errors, ...props }) => {
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <textarea
        type={props.type}
        {...props.register(props.name)}
        id={props.name}
      ></textarea>
      <small>{errors?.message}</small>
    </>
  );
};
