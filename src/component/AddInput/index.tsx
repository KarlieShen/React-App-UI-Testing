import React, { useState } from "react";
import "./index.scss";

interface IAddInputProps {
  onAdd: (info: IInputInfo) => void;
}

export interface IInputInfo {
  title: string;
  link: string;
  linkTitle: string;
}

const defaultInputInfo = {
  title: "",
  link: "",
  linkTitle: "",
};
export default function AddInput(props: IAddInputProps) {
  const { onAdd } = props;
  const [info, setInfo] = useState<IInputInfo>(defaultInputInfo);

  return (
    <form
      className="form-section"
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(info);
        setInfo(defaultInputInfo);
      }}>

      <input
        type="text"
        name="title"
        value={info.title}
        placeholder="add new title"
        onChange={(e) => {
          setInfo(info => ({
            ...info,
            title: e.target.value,
          }));
        }}
      />

      <input
        type="text"
        name="link"
        value={info.link}
        placeholder="add new link"
        onChange={(e) => {
          setInfo(info => ({
            ...info,
            link: e.target.value,
          }));
        }}
      />

      <input
        type="text"
        name="linkTitle"
        value={info.linkTitle}
        placeholder="add new link title"
        onChange={(e) => {
          setInfo(info => ({
            ...info,
            linkTitle: e.target.value,
          }));
        }}
      />

      <button type="submit" className='submit-btn'>
        Add
      </button>
    </form>
  );
}
