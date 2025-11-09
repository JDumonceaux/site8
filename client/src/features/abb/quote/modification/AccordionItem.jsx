"use strict";
import React, { useState } from "react";
import RadioButton from "empower-components/RadioButton";
import InputForm from "empower-components/InputForm";
import { FormatMessage } from "react-globalize";
import styled from "styled-components";

const AccordionItem = ({
    blankItem,
    setValueActive,
    updateBlankValue,
    valueList
}) => {
    const [toggleUI, setToggleUI] = useState(
        blankItem[0] && blankItem[0].value !== "" ? true : false
    );
    const [value, setValue] = useState(
        blankItem[0] && blankItem[0].value !== "" ? blankItem[0].value : ""
    );

    const setListCheck = index => {
        setValueActive(index);
    };

    const handleSaveValue = (index, btnPath) => {
        if (value !== "") {
            setToggleUI(!toggleUI);
        }
        btnPath === "edit"
            ? updateBlankValue(index, "")
            : updateBlankValue(index, value);
    };

    const handleDescriptionChange = val => {
        setValue(val);
    };

    let btnPath = toggleUI ? "edit" : "save";

    return (
        <>
            {valueList.map((item, index) => (
                <RowDiv key={item.Sequence}>
                    {item.Description === "" ? (
                        // Description is missing. User can add it.
                        <>
                            <div>
                                <InputForm
                                    id="description"
                                    inputText={value || ""}
                                    handleChange={val =>
                                        handleDescriptionChange(val)
                                    }
                                    required
                                />
                            </div>
                            <div
                                className="pt-5 pl-5"
                                onClick={() => handleSaveValue(index, btnPath)}
                            >
                                <a>
                                    <FormatMessage path={btnPath}>
                                        Save
                                    </FormatMessage>
                                </a>
                            </div>
                        </>
                    ) : blankItem.length > 0 ? (
                        // Item isn't blank.  Select radio and save
                        <div>
                            <RadioButton
                                handleSelect={() =>
                                    handleSaveValue(index, btnPath)
                                }
                                label={item.Description}
                                checked={value || false}
                                size="small"
                            />
                            <span
                                className="pl-15"
                                onClick={() => handleSaveValue(index, btnPath)}
                            >
                                <a>
                                    <FormatMessage path={btnPath}>
                                        Save
                                    </FormatMessage>
                                </a>
                            </span>
                        </div>
                    ) : (
                        // Normal radio buttons
                        <div onClick={() => setListCheck(index)}>
                            <RadioButton
                                handleSelect={() => setListCheck(index)}
                                label={item.Description}
                                checked={item.toggle || false}
                                size="small"
                            />
                        </div>
                    )}
                    {/* Status */}
                    <div>
                        {item.spinner ? (
                            <div className="acc-list"></div>
                        ) : (
                            <div>
                                <div className="label-green">
                                    {item.successFeedback || ""}
                                </div>
                                <div className="label-red">
                                    {item.failedFeedback || ""}
                                </div>
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
