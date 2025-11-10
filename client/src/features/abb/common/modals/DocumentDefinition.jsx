import React from 'react';

import { msgFormatter } from 'app/util';
import Button from 'empower-components/Button';
import InputForm from 'empower-components/InputForm';
import SelectForm from 'empower-components/SelectForm';
import styled from 'styled-components';

const DocumentDefinition = ({
  docFormat,
  docFormatOptions,
  docName,
  docType,
  docTypeOptions,
  onDocChange,
  onFormatChange,
  onNameChange,
  onSave,
}) => {
  // Remove any entries where show === false
  const filteredDocumentTypeOptions = docTypeOptions
    .map((x) => ({ ...x, show: x.show !== false }))
    .filter((option) => option.show !== false);
  const filteredDocumentFormatOptions = docFormatOptions
    .map((x) => ({ ...x, show: x.show !== false }))
    .filter((option) => option.show !== false);

  return (
    <RowDiv>
      <InputDiv>
        <InputForm
          handleChange={(value) => onNameChange(value)}
          id="docName"
          inputText={docName}
        />
        <SelectForm
          handleChange={(value) => onDocChange(value.key)}
          id="docType"
          value={docType}
          dropdownIcon="fal fa-chevron-down"
          inModal
          options={filteredDocumentTypeOptions}
        />
        <SelectForm
          handleChange={(value) => onFormatChange(value.key)}
          id="docFormat"
          value={docFormat}
          dropdownIcon="fal fa-chevron-down"
          inModal
          options={filteredDocumentFormatOptions}
        />
      </InputDiv>
      <Button
        handleClick={onSave}
        title={msgFormatter('generateNow')()}
        buttonType="primary"
      />
    </RowDiv>
  );
};

export default DocumentDefinition;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 10px;
  margin-bottom: 20px;
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 10px;
  > div:first-child {
    width: 400px;
    max-width: 400px;
  }
  > div:nth-child(2) {
    width: 300px;
  }
`;
