import React from 'react';

import { msgFormatter } from 'app/util';
import styled from 'styled-components';
import AccordionItem from './AccordionItem';

const Accordion = ({
  headerToggle,
  mods,
  updateBlankValue,
  updatedBlankMods,
  valueToggle,
}) => {
  const setActive = (category, flag) => {
    headerToggle(category, flag);
  };

  const setValueActive = (valIndex) => {
    const index = mods.findIndex((item) => item.toggle);
    const category = mods[index].Category;
    valueToggle(category, valIndex);
  };

  const handleUpdateBlankValue = (valIndex, textInput) => {
    const index = mods.findIndex((item) => item.toggle);
    const category = mods[index].Category;
    updateBlankValue(category, index, valIndex, textInput);
  };

  if (mods.length === 0) {
    return <div>{msgFormatter('noDataToDisplay')()}</div>;
  }

  return (
    <ContainerDiv>
      {mods.map((item, index) => {
        const blankItem = updatedBlankMods.filter(
          (blank) => blank.category === item.Category,
        );

        return (
          <ItemDiv key={index}>
            <div
              className={item.toggle ? 'active' : ''}
              onClick={() => setActive(item.Category, item.toggle)}
            >
              {item.Category}
              <i
                aria-hidden="true"
                className="fa fa-chevron-down pull-right"
                style={{ marginTop: '3px' }}
              />
              {item.toggle ? (
                ''
              ) : (
                <div className="pull-right">
                  <span className="label-green">
                    {item.successFeedback || ''}
                  </span>
                  <span className="label-red">{item.failedFeedback || ''}</span>
                </div>
              )}
            </div>
            {item.toggle ? (
              <AccordionItem
                blankItem={blankItem}
                itemData={item}
                setValueActive={setValueActive}
                updateBlankValue={handleUpdateBlankValue}
                valueList={item.Values}
              />
            ) : (
              ''
            )}
          </ItemDiv>
        );
      })}
    </ContainerDiv>
  );
};

export default Accordion;

const ContainerDiv = styled.div`
  height: 290px;
  overflow: auto;
`;
const ItemDiv = styled.div`
  > div:first-child {
    cursor: pointer;
    transition: 0.4s;
    padding: 5px;
  }
  > div:first-child.active {
    border-bottom: 1px solid #333;
  }
  > div:nth-child(2) {
    transition: 0.4s ease-out;
    background-color: #f2f2f2;
    height: auto;
  }
`;
