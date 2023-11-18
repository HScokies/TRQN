
import "./style.scss";
import React, { useState } from 'react';

interface Props {
  label: string,
  type : string,
  pattern? : string
}

const Input = ({ label, type, pattern = '[a-zA-Z0-9]+' } : Props) => {

  return (
    <div>
      <label className="label">{label}</label>
      <input className="input" type={type}  pattern={pattern} />
    </div>
  );
};
export default Input;

