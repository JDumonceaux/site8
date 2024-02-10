import HelperText, { IHelperTextProps } from './HelperText';
import TextInput, { ITextInputProps } from './TextInput';
import TextLabel, { ITextLabelProps } from './TextLabel';

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
