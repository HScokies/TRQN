
import "./style.scss";
import { useEffect, useState } from 'react';

interface Props {
  label: string,
  type: string,
  name: string,
  pattern?: string,
  defaultValue?: string,
  setChanged: React.Dispatch<React.SetStateAction<boolean>>
}

const Input = ({ label, type, defaultValue = "", name, pattern = '[a-zA-Z0-9 ]+', setChanged}: Props) => {
  const [value, setValue] = useState<string>("")
  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setValue(val)
    if (val!=defaultValue) setChanged(true)
  }

  return (
    <div>
      <label className="label">{label}</label>
      <input className="input" name={name} type={type} pattern={pattern} value={value} onChange={(e) => handleChange(e)} />
    </div>
  );
};
export default Input;

