import { FC, ChangeEventHandler } from "react";
import { models } from "./models";

interface ModelSelectorProps {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  index: number;
}

export const ModelSelector: FC<ModelSelectorProps> = ({ onChange, index }) => {
  return (
    <select
      onChange={onChange}
      value={index}
    >
      {models.map(({ name }, i) => (
        <option
          key={i}
          value={i}
        >
          {name}
        </option>
      ))}
    </select>
  );
};
