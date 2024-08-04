import * as Form from '@radix-ui/react-form';
import React, {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  memo,
} from 'react';
import { styled } from 'styled-components';
import LabelBase from '../LabelBase/LabelBase';
import ValidityState from '../ValidityState/ValidityState';

// Most attributes have an effect on only
// a specific subset of input types. In addition, the way some
// attributes impact an input depends on the input type,
// impacting different input types in different ways.

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
//
// ACCESSIBILITY: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-readonly
//
// accept - file - Hint for expected file type in file upload controls
// accesskey - all - Keyboard shortcut to activate or focus element
//     accessibility - don't use
//     Firefox for Mac, pressing Control-Option-S triggers the Send button, while Chrome on Windows uses Alt+S.
// alt - image - alt attribute for the image type. Required for accessibility
// autocapitalize - all except url, email, and password - Controls automatic capitalization in inputted text.
// autocomplete - all except checkbox, radio, and buttons - Hint for form autofill feature
//     keyword off or on, or an ordered list of space-separated tokens.
//     element has no autocomplete attribute, the browser will use the autocomplete attribute of the element's owning form.
//     user-agents might require <input>/<select>/<textarea> elements to: name and/or id, within form, submit button
// autocorrect - ???, tele - on, off
// autofocus - all except hidden - Automatically focus the form control when the page is loaded
//      accessibility - avoid using autofocus
// capture - file - Media capture input method in file upload controls
//      microphone, video, or camera
// checked - checkbox, radio - Whether the control is checked by default
//      checkboxes and radio buttons value are only included in the submitted data if they are currently checked.
// dirname - hidden, text, search, url, tel, email - Name of form field to use for sending the element's directionality in form submission
//      ltr or rtl
// disabled - all - Whether the form control is disabled
//    accessibilty - only use when submitting a form (see readonly)
//    aria-disabled="true" - the element is disabled and cannot be interacted with
//      disable parent:  form or fieldset
//      recommended: reset after x seconds?
//      button.disabled = true;
//      setTimeout(() => {
//        button.disabled = false;
//        button.value = "Enabled";
//      }, 2000);
//     The input will not have a tab stop.
//     The input will not be focusable.
//     The input value cannot be changed without JavaScript.
//     The input cannot be submitted in a form.

// enterkeyhint - ???, tele - Hints what action label (or icon) to present for the enter key on virtual keyboards.
//      enter, done, go, next, previous, search, send
// form - all - Associates the control with a form element
//      The form attribute lets you place an input anywhere in the document but have it included with a form elsewhere in the document.
// formaction - image, submit - URL to use for form submission
// formenctype - image, submit - Form data set encoding type to use for form submission
//      application/x-www-form-urlencoded, multipart/form-data, or text/plain
// formmethod - image, submit - HTTP method to use for form submission
//      get, post, dialog (for a <dialog> element - form not submitted)
// formnovalidate - image, submit - Bypass form control validation for form submission
// formtarget - image, submit - Browsing context for form submission
//      _self, _blank, _parent, _top, or a name
// height - image - Vertical dimension of the image type
// inputmode - all - This allows a browser to display an appropriate virtual keyboard.
//      none, text (default), decimal, numeric, tel, search, email, url
// list - all except hidden, password, checkbox, radio, and buttons - Value of the id attribute of the <datalist> of autocomplete options
// max - date, month, week, time, datetime-local, number, range - Maximum value for the control
// maxlength - text, search, url, tel, email, password - Maximum length of the inputted data
// min - date, month, week, time, datetime-local, number, range - Minimum value for the control
// minlength - text, search, url, tel, email, password - Minimum length of the inputted data
// mozactionhint - ???, tele - deprecated use enterkeyhint
// multiple - email, file - Boolean. Whether to allow multiple values
// name - all - Name of the form control. If omitted, the control's value is not submitted with the form.
// pattern - text, search, url, tel, email, password - Pattern to be matched by the input
// placeholder - text, search, url, tel, email, password, number - Hint to the user of what can be entered in the control
// popovertarget - button - Designates an <input type="button"> as a control for a popover element
// popovertargetaction - button - Specifies the action that a popover control should perform
// readonly - all except hidden, range, color, checkbox, radio, and buttons - Whether the control is read-only
//   accessibilty - use for already submitted data (see disabled)
//   aria-readonly="true" - the element is read-only
//   The input will have a tab stop
//   The input will be focusable.
//   The input value cannot be changed without JavaScript.
//   The input can be submitted in a form.
// required - all except hidden, range, color, and buttons - Whether the control is required for form submission
// size - text, search, url, tel, email, password - Size of the control
// spellcheck - ???, text
//    It can be used on any editable content
//    The default value of the spellcheck attribute varies depending on the element type; for instance,
//    it's typically set to false for most elements except for editable elements, where it defaults to true.
// src - image - Address of the image type
// step - date, month, week, time, datetime-local, number, range - Incremental step for "number" and "range" controls
// type - all - Type of the form control
// value - all except image - Value of the form control
// width - image - Horizontal dimension (width) of the image type

// button
//    Buttons don't participate in constraint validation; they have no real value to be constrained.
// checkbox
//    default as boxes that are checked (ticked)
//    you can toggle a checkbox by clicking on its associated <label> element as well as on the checkbox itself.
//    Validation - ValidityState.valueMissing = true if not checked
// color
// date
// datetime-local
// email
// file
// hidden
// image
// month
// number
// password
// radio
// range
// reset
// search
// submit
// tel - the input value is not automatically validated to a particular format before the form can be submitted,
//    because formats for telephone numbers vary so much around the world.
//    pattern - the 'u' flag is specified when compiling the regular expression so that the pattern is treated as a sequence of Unicode code points,
//    instead of as ASCII.No forward slashes should be specified around the pattern text.
//    autocorrect - on, off
// text
// time
// url
// week

export type InputBaseProps = {
  readonly id: string;
  readonly label?: string;
  readonly type?: HTMLInputTypeAttribute | undefined;
  readonly inputRef?: React.RefObject<HTMLInputElement>;
  readonly labelRef?: React.RefObject<HTMLLabelElement>;
  readonly errorText?: React.ReactNode | string[] | string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'>;

const InputBase = ({
  id,
  label,
  inputRef,
  labelRef,
  type,

  ...rest
}: InputBaseProps): JSX.Element => (
  <StyledFormField id={id} name={id}>
    <LabelBase label={label} ref={labelRef}>
      <ValidityState />
    </LabelBase>
    <Form.Control asChild>
      <StyledInput type={type} {...rest} ref={inputRef} />
    </Form.Control>
  </StyledFormField>
);

InputBase.displayName = 'InputBase';

export default memo(InputBase);

const StyledFormField = styled(Form.Field)`
  display: grid;
  margin-bottom: 10px;
`;
const StyledInput = styled.input`
  color: var(--input-color, '#ffffff');
  background-color: var(--input-background, '#00000');
  border-radius: var(--input-border-radius, 0);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  line-height: 1;
  padding: 0 10px;
  height: 35px;
  font-size: 15px;
  box-shadow: 0 0 0 1px var(--input-border-color, '#d4d4d4');
  &:hover {
    box-shadow: 0 0 0 1px var(--input-border-hover-color);
  }
  &:focus {
    box-shadow: 0 0 0 1px var(--input-border-focus-color);
  }
  &:selection {
    //  Accessibility don't override unless you have a good reason
  }
  &:spelling-error {
    text-decoration: wavy underline var(--input-error);
  }
  &:grammar {
    text-decoration: underline var(--input-error);
  }
  &:placeholder {
    font-size: 0.9rem;
    color: var(--input-placeholder-color, '#d4d4d4');
  }
  &:user-invalid {
    color: var(--input-error);
  }
`;
