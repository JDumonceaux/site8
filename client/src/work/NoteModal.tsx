import { showEditNoteModal } from 'actions/InteractionActions';
import {
  addNoteTemplate,
  saveNote,
  updateNoteTemplate,
} from 'actions/QuoteActions';
import { msgFormatter } from 'app/util';
import Dialog from 'components/modals/Dialog';
import NoteTemplates from 'components/notes/NoteTemplates';
import clone from 'lodash/clone';
import includes from 'lodash/includes';
import sortBy from 'lodash/sortBy';
import React, { useEffect, useRef, useState } from 'react';
import { FormatMessage } from 'react-globalize';
import { connect } from 'react-redux';
import styled from 'styled-components';

export const actionType = {
  add: 'add',
  update: 'update',
  edit: 'edit',
};

interface Note {
  NoteCategoryID: number;
  Note: string | null;
  NoteID?: string | null;
  QuoteItemID: string | null;
  QuoteID: string | null;
  ProductFamily: string | null;
  OutputDescription?: string;
}

interface EditNoteModalProps {
  readonly actionType: string;
  readonly page: string;
  readonly note: Note | null;
  readonly selectedCategory: number | null;
  readonly selectedItem: string | null;
  readonly noteCategories: {
    ID: number;
    Name: string;
    OutputDescription: string;
  }[];
  readonly quote: {
    readonly QuoteID: string;
    readonly QuoteItems: {
      readonly QuoteItemID: string;
      readonly Sequence: number;
      readonly ProductDescription: string;
      readonly Marks: string | null;
      readonly ProductFamily: string;
    }[];
  };
  readonly noteTemplates: { Note: string }[];
  readonly show: boolean;
  readonly saveNote: (note: Note, justSave?: boolean) => void;
  readonly addNoteTemplate: (template: { Note: string }) => void;
  readonly updateNoteTemplate: (template: { Note: string }) => void;
  readonly showEditNoteModal: (
    show: boolean,
    note: Note | null,
    actionType: string | null,
  ) => void;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({
  actionType,
  page,
  note: propNote,
  selectedCategory,
  selectedItem,
  noteCategories,
  quote,
  noteTemplates,
  show,
  saveNote,
  addNoteTemplate,
  updateNoteTemplate,
  showEditNoteModal,
}) => {
  const [note, setNote] = useState<Note | null>(null);
  const [noteType, setNoteType] = useState<string | undefined>(undefined);
  const [prevNoteForEdit, setPrevNoteForEdit] = useState<Note | null>(null);
  const [currentTemplate, setCurrentTemplate] = useState<{
    Note: string;
  } | null>(null);
  const [isNewTemplate, setIsNewTemplate] = useState<boolean>(false);
  const [isUpdateTemplate, setIsUpdateTemplate] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<boolean>(false);
  const clearRadioButton = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (note) return;

    const initialNote = getInitialNote();
    const initialNoteType = selectedItem || 'quote';

    setNote({
      ...initialNote,
      OutputDescription: getOutputDescription(initialNote.NoteCategoryID),
    });
    setNoteType(initialNoteType);
  }, [note, noteType, prevNoteForEdit, propNote, selectedItem, noteCategories]);

  const getInitialNote = (): Note => {
    if (actionType === 'add' && page === 'notes') {
      return {
        NoteCategoryID: 1,
        Note: null,
        QuoteItemID: null,
        QuoteID: null,
        ProductFamily: null,
      };
    } else if (actionType === 'edit' && prevNoteForEdit) {
      return prevNoteForEdit;
    } else {
      return propNote!;
    }
  };

  const getOutputDescription = (categoryId: number): string | undefined => {
    const category = noteCategories.find((cat) => cat.ID === categoryId);
    return category?.OutputDescription;
  };

  const resetState = () => {
    setNote(null);
    setNoteType(null);
    setPrevNoteForEdit(null);
    setCurrentTemplate(null);
    setIsNewTemplate(false);
    setIsUpdateTemplate(false);
    setSaveMessage(true);
  };

  const handleSetCurrentTemplate = (template: { Note: string }) => {
    const updatedNote = clone(note);
    updatedNote.Note = template.Note;
    setCurrentTemplate(template);
    setNote(updatedNote);
    setSaveMessage(false);
  };

  const handleCloseClick = () => {
    resetState();
    showEditNoteModal(false, null, null);
  };

  const handleNoteCategoryChange = () => {
    const catId = +clearRadioButton.current!.value;
    const updatedNote = clone(note);
    updatedNote.NoteCategoryID = catId;
    updatedNote.OutputDescription = getOutputDescription(catId);
    setNote(updatedNote);
    setSaveMessage(false);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const updatedNote = clone(note);
    updatedNote.Note = text;
    setNote(updatedNote);
    setSaveMessage(false);
  };

  const handleNoteTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNoteType(e.target.value);
    setSaveMessage(false);
  };

  const handleSaveClick = (saveType: string) => {
    const updatedNote = clone(note);

    if (shouldUpdateQuoteID(saveType)) {
      updatedNote.QuoteID = quote.QuoteID;
      updateQuoteItemID(updatedNote);
    }

    saveNoteBasedOnType(saveType, updatedNote);
  };

  const shouldUpdateQuoteID = (saveType: string): boolean => {
    return (
      (actionType === 'add' && page === 'notes') ||
      (page === 'notes' &&
        (saveType === 'Save and New' || saveType === 'Save and Copy'))
    );
  };

  const updateQuoteItemID = (updatedNote: Note) => {
    if (noteType !== 'quote') {
      const quoteItemIDs = quote.QuoteItems.map((item) => item.QuoteItemID);
      const isProductFamily = !quoteItemIDs.includes(noteType!);

      if (isProductFamily) {
        updatedNote.ProductFamily = noteType;
        updatedNote.QuoteItemID = null;
      } else {
        updatedNote.QuoteItemID = noteType;
      }
    }
  };

  const saveNoteBasedOnType = (saveType: string, updatedNote: Note) => {
    const editNote = { ...updatedNote };

    switch (saveType) {
      case 'Save and New':
        handleSaveAndNew(editNote, updatedNote);
        break;
      case 'Save and Copy':
        handleSaveAndCopy(editNote, updatedNote);
        break;
      case 'Save and Close':
        saveNote(updatedNote);
        handleCloseClick();
        break;
      case 'Just Save':
        handleJustSave(updatedNote);
        break;
      default:
        break;
    }
    handleTemplateUpdates(updatedNote);
  };

  const handleSaveAndNew = (editNote: Note, updatedNote: Note) => {
    editNote.Note = '';
    saveNote(updatedNote);
    if (actionType === 'edit') {
      editNote.NoteID = null;
      setPrevNoteForEdit({ ...editNote });
      setNote(editNote);
    } else {
      setNote(editNote);
    }
    setSaveMessage(true);
  };

  const handleSaveAndCopy = (editNote: Note, updatedNote: Note) => {
    saveNote(updatedNote);
    if (actionType === 'edit') {
      editNote.NoteID = null;
      setPrevNoteForEdit({ ...editNote });
      setNote(editNote);
    }
    setSaveMessage(true);
  };

  const handleJustSave = (updatedNote: Note) => {
    if (actionType === 'edit') {
      updatedNote.QuoteID = quote.QuoteID;
      updatedNote.NoteID = propNote!.NoteID;
    }
    saveNote(updatedNote, true);
    setSaveMessage(true);
  };

  const handleTemplateUpdates = (updatedNote: Note) => {
    if (isNewTemplate && updatedNote.Note) {
      addNoteTemplate({ Note: updatedNote.Note });
    }

    if (isUpdateTemplate && currentTemplate && updatedNote.Note) {
      const template = clone(currentTemplate);
      template.Note = updatedNote.Note;
      updateNoteTemplate(template);
    }

    if (currentTemplate) {
      clearRadioButton.current!.checked = true;
    }

    setCurrentTemplate(null);
    setIsNewTemplate(false);
    setIsUpdateTemplate(false);
  };

  const itemList = getItemList();
  const noteCategoriesOptions = getNoteCategories();
  const catId = note ? note.NoteCategoryID : -1;
  const noteText = note && note.Note ? note.Note : '';
  const notePlaceholder = msgFormatter('notePlaceholder')(); // Add your note here...

  return (
    <Dialog
      isOpen={show}
      size="lg"
      onClose={handleCloseClick}
      label={
        actionType === 'add' ? (
          <FormatMessage path="addNoteTitle">Add New Note</FormatMessage>
        ) : (
          <FormatMessage path="editNoteTitle">Edit Note</FormatMessage>
        )
      }>
      <TopRow>
        <div>{itemList}</div>
        <div>
          <span
            className="text-bold"
            style={{ paddingRight: '5px', display: 'block' }}>
            Select your note type
          </span>
          <div className="form-group" style={{ display: 'inline-block' }}>
            <select
              ref={clearRadioButton}
              className="form-control notes-category-select"
              value={catId}
              onChange={handleNoteCategoryChange}>
              {noteCategoriesOptions}
            </select>
          </div>
        </div>
      </TopRow>

      {noteType === 'quote' && (
        <StyledMessage1>
          <span>NOTE:</span>
          <FormatMessage path="noteInstructions">
            Quote notes will appear on All VERSIONS and all documents of quote.
          </FormatMessage>
        </StyledMessage1>
      )}

      {note && note.OutputDescription ? (
        <>
          <StyledMessage2>
            <FormatMessage path="noteOutputDescription">
              In Proposals and Submittals generated in Documents, the following
              text will be displayed before your note:
            </FormatMessage>
          </StyledMessage2>
          <StyledMessage3>"{note.OutputDescription}"</StyledMessage3>
        </>
      ) : null}

      <TemplateRow>
        <NoteTemplates
          templates={noteTemplates}
          onSelectTemplate={handleSetCurrentTemplate}
        />
        <input
          type="radio"
          name="note-templates"
          id="clearRadioButton"
          ref={clearRadioButton}
          style={{ visibility: 'hidden', position: 'absolute' }}
        />
      </TemplateRow>

      <StyledTextArea
        value={noteText ? noteText : ''}
        className="form-control"
        onChange={handleNoteChange}
        placeholder={notePlaceholder}
      />

      <StyledMessage4>
        <span>* </span>
        <FormatMessage path="noteDescription">
          Private Notes are viewable only within the quote and are not available
          for use in proposal or submittal documents.
        </FormatMessage>
      </StyledMessage4>
    </Dialog>
  );

  function getItemList() {
    if (quote && quote.QuoteItems) {
      const quoteItems = quote.QuoteItems.map((item) => (
        <option key={item.QuoteItemID} value={item.QuoteItemID}>
          {item.Sequence} - {item.ProductDescription}
          {item.Marks !== null ? ' | ' + item.Marks : ''}
        </option>
      ));

      const productFamilies: string[] = [];
      quote.QuoteItems.forEach((category) => {
        if (!includes(productFamilies, category.ProductFamily)) {
          productFamilies.push(category.ProductFamily);
        }
      });

      const familyItems = productFamilies.map((family, i) => (
        <option key={i} value={family}>
          {family}
        </option>
      ));

      if ((actionType === 'add' || actionType === 'edit') && page === 'notes') {
        return (
          <div>
            <span
              className="text-bold"
              style={{ paddingRight: '5px', display: 'block' }}>
              Assign your note to
            </span>
            <div className="form-group" style={{ display: 'inline-block' }}>
              <select
                className="form-control notes-type-select"
                value={noteType}
                onChange={handleNoteTypeChange}>
                <option value="quote">{msgFormatter('quote')()}</option>
                {familyItems}
                {quoteItems}
              </select>
            </div>
          </div>
        );
      }
    }
    return null;
  }

  function getNoteCategories() {
    const categories = sortBy(noteCategories, 'ID');
    return categories.map((cat) => (
      <option key={cat.ID} value={cat.ID}>
        {cat.Name}
      </option>
    ));
  }
};

const EditNoteModalContainer: React.FC<EditNoteModalProps> = (props) => {
  if (props.show) {
    return <EditNoteModal {...props} />;
  } else {
    return null;
  }
};

const mapStateToProps = (state: any) => ({
  show: state.Interaction.editNoteModal.show,
  note: state.Interaction.editNoteModal.note,
  actionType: state.Interaction.editNoteModal.actionType,
  page: state.Interaction.editNoteModal.page,
  selectedItem: state.Interaction.editNoteModal.selectedItem,
  selectedCategory: state.Interaction.editNoteModal.selectedCategory,
  quote: state.Quote.currentQuote,
  noteTemplates: state.Quote.noteTemplates,
  noteCategories: state.App.filters.noteCategories,
});

export default connect(mapStateToProps, {
  saveNote,
  addNoteTemplate,
  updateNoteTemplate,
  showEditNoteModal,
})(EditNoteModalContainer);

const TopRow = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 50% 50%;
`;

const StyledMessage1 = styled.div`
  color: #ff000f;
  span {
    font-family: 'abbvoice-bold', Verdana, sans-serif;
    margin-right: 1rem;
  }
`;

const StyledMessage2 = styled.div`
  padding: 16px 0px 16px 0px;
`;

const StyledMessage3 = styled.div`
  font-family: 'abbvoice-bold', Verdana, sans-serif;
`;

const StyledMessage4 = styled.div`
  margin-bottom: 16px;
`;

const TemplateRow = styled.div`
  margin: 16px 0;
`;

const StyledTextArea = styled.textarea`
  all: revert;
  margin-bottom: 16px;
  min-height: 20vh;
  width: 100%;
  padding: 8px 16px;
  border: 1px solid #d2d2d2;
`;
