
import "./style.scss";
import { useState } from 'react';

interface Props {
  label: string,
  type : string,
  name : string,
  pattern? : string,
  defaultValue? : string
}

const Input = ({ label, type, defaultValue, name, pattern = '[a-zA-Z0-9 ]+' } : Props) => {
  const [value, setValue] = useState<undefined | string>(defaultValue)
  return (
    <div>
      <label className="label">{label}</label>
      <input className="input" name={name} type={type}  pattern={pattern} value={value} onChange={(e) => {setValue(e.target.value)}} />
    </div>
  );
};
export default Input;

