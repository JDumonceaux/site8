import React, { useState } from 'react';
import { FormatMessage } from 'react-globalize';

import InputForm from 'empower-components/InputForm';
import RadioButton from 'empower-components/RadioButton';
import styled from 'styled-components';

const AccordionItem = ({
  blankItem,
  setValueActive,
  updateBlankValue,
  valueList,
}) => {
  const [toggleUI, setToggleUI] = useState(
    !!(blankItem[0] && blankItem[0].value !== ''),
  );
  const [value, setValue] = useState(
    blankItem[0] && blankItem[0].value !== '' ? blankItem[0].value : '',
  );

  const setListCheck = (index) => {
    setValueActive(index);
  };

  const handleSaveValue = (index, buttonPath) => {
    if (value !== '') {
      setToggleUI(!toggleUI);
    }
    buttonPath === 'edit'
      ? updateBlankValue(index, '')
      : updateBlankValue(index, value);
  };

  const handleDescriptionChange = (val) => {
    setValue(val);
  };

  const buttonPath = toggleUI ? 'edit' : 'save';

  return (
    <>
      {valueList.map((item, index) => (
        <RowDiv key={item.Sequence}>
          {item.Description === '' ? (
            // Description is missing. User can add it.
            <>
              <div>
                <InputForm
                  required
                  handleChange={(val) => handleDescriptionChange(val)}
                  id="description"
                  inputText={value || ''}
                />
              </div>
              <div
                className="pt-5 pl-5"
                onClick={() => handleSaveValue(index, buttonPath)}
              >
                <a>
                  <FormatMessage path={buttonPath}>Save</FormatMessage>
                </a>
              </div>
            </>
          ) : blankItem.length > 0 ? (
            // Item isn't blank.  Select radio and save
            <div>
              <RadioButton
                checked={value || false}
                handleSelect={() => handleSaveValue(index, buttonPath)}
                label={item.Description}
                size="small"
              />
              <span
                className="pl-15"
                onClick={() => handleSaveValue(index, buttonPath)}
              >
                <a>
                  <FormatMessage path={buttonPath}>Save</FormatMessage>
                </a>
              </span>
            </div>
          ) : (
            // Normal radio buttons
            <div onClick={() => setListCheck(index)}>
              <RadioButton
                checked={item.toggle || false}
                handleSelect={() => setListCheck(index)}
                label={item.Description}
                size="small"
              />
            </div>
          )}
          {/* Status */}
          <div>
            {item.spinner ? (
              <div className="acc-list" />
            ) : (
              <div>
                <div className="label-green">{item.successFeedback || ''}</div>
                <div className="label-red">{item.failedFeedback || ''}</div>
              </div>
            )}
          </div>
        </RowDiv>
      ))}
    </>
  );
};

export default AccordionItem;

const RowDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;
