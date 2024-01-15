import React from "react";

import TextInput, { ITextInputProps } from "./TextInput";
import HelperText, { IHelperTextProps } from "./HelperText";
import TextLabel, { ITextLabelProps } from "./TextLabel";

export interface IProps {
  LabelProps?: ITextLabelProps;
  TextInput?: ITextInputProps;
  HelperTextProps?: IHelperTextProps;
}

export default function TextField(props: ITextInputProps) {
  return (
    <div>
      <TextLabel {...props} />
      <TextInput {...props} />
      <HelperText {...props} />
    </div>
  );
}
