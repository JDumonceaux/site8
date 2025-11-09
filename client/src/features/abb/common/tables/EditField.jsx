import React, { useState } from 'react';

import { msgFormatter } from 'app/util';
import InputForm from 'empower-components/InputForm';
import styled from 'styled-components';

const EditField = ({ id, onSave, text, value }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [isEdit, setIsEdit] = useState(false);

  const handleShowEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const handleSave = (error) => {
    error.preventDefault();
    if (onSave) {
      onSave(inputValue);
    }
    setIsEdit((prev) => !prev);
  };

  const handleCancel = () => {
    setInputValue(value || '');
    setIsEdit((prev) => !prev);
  };

  return isEdit ? (
    <InputDiv>
      <InputForm
        handleChange={(value_) => setInputValue(value_)}
        id={id}
        inputText={inputValue}
      />
      <ActionsDiv>
        <a onClick={handleSave}>{msgFormatter('save')()}</a>
        <span> | </span>
        <a onClick={handleCancel}>{msgFormatter('cancel')()}</a>
      </ActionsDiv>
    </InputDiv>
  ) : (
    <TextDiv>
      <div>{text}</div>
      <div>
        <EditDiv onClick={handleShowEdit}>
          <i className="fal fa-pencil" />
        </EditDiv>
      </div>
    </TextDiv>
  );
};

EditField.displayName = 'EditField';
export default EditField;

const ActionsDiv = styled.div`
  a {
    cursor: pointer;
  }
  white-space: nowrap;
  padding: 5px 0px 5px 15px;
`;
const InputDiv = styled.div`
  display: block;

  align-items: center;
`;
const TextDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  column-gap: 5px;
  align-items: center;
  &:active,
  &:focus,
  &:hover {
    i {
      visibility: visible;
    }
  }
  i {
    visibility: hidden;
  }
`;
const EditDiv = styled.div`
  cursor: pointer;
  font-size: 20px;
  i {
    color: var(--abb-red);
  }
`;
