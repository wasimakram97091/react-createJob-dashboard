import React from "react";

function InputField({ type, label, placeholder, inputStyles, imp, getData, parentStyle, name, radioName, value, error, err }) {
  return (
    <>
      <div className={parentStyle}>
        <label className="text-sm font-semibold mb-1 ">
          {label}
          <span className="text-red-600">{imp}</span>
        </label>
        <input type={type} placeholder={placeholder} className={inputStyles} onChange={getData} name={name} value={value} /> {radioName}
        {error && <p className="text-red-700 z-20 text-sm ">{error}</p>}
      </div>
      {err && <p className="text-red-700 z-20 text-sm">{err}</p>}
    </>
  );
}

export default InputField;
