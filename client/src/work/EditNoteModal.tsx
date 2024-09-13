import { showEditNoteModal } from 'actions/InteractionActions';
import {
  addNoteTemplate,
  saveNote,
  updateNoteTemplate,
} from 'actions/QuoteActions';
import { msgFormatter } from 'app/util';
import NoteTemplates from 'components/notes/NoteTemplates';
import AppCheckBox from 'components/util/AppCheckBox';
import clone from 'lodash/clone';
import includes from 'lodash/includes';
import sortBy from 'lodash/sortBy';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { FormatMessage } from 'react-globalize';
import { connect } from 'react-redux';

export const actionType = {
  add: 'add',
  update: 'update',
  edit: 'edit',
};

class EditNoteModal extends React.Component {
  state = {
    note: null,
    noteType: undefined,
    prevNoteForEdit: null,
    currentTemplate: null,
    isNewTemplate: false,
    isUpdateTemplate: false,
    saveMessage: false,
  };

  componentDidMount() {
    if (this.state.note) return;

    let note = null,
      noteType = this.state.noteType ? this.state.noteType : 'quote';

    if (this.props.actionType === 'add' && this.props.page === 'notes') {
      note = {
        NoteCategoryID: 1,
        Note: null,
        QuoteItemID: null,
        QuoteID: null,
        ProductFamily: null,
      };
    } else if (this.props.actionType === 'edit' && this.state.prevNoteForEdit) {
      note = this.state.prevNoteForEdit;
    } else {
      note = this.props.note;
    }

    if (this.props.selectedCategory) {
      note.NoteCategoryID = this.props.selectedCategory;
    }

    let outputDescription;

    if (note) {
      for (let i = 0; i < this.props.noteCategories.length; i++) {
        if (this.props.noteCategories[i].ID === note.NoteCategoryID) {
          outputDescription = this.props.noteCategories[i].OutputDescription;
          break;
        }
      }
    }

    if (this.props.selectedItem) {
      noteType = this.props.selectedItem;
    }

    this.setState({
      note: {
        ...note,
        OutputDescription: outputDescription,
      },
      noteType,
    });
  }

  setCurrentTemplate = (template) => {
    const note = clone(this.state.note);
    note.Note = template.Note;

    this.setState({
      currentTemplate: template,
      note: note,
      saveMessage: false,
    });
  };

  handleCloseClick = () => {
    this.setState({
      note: null,
      noteType: null,
      prevNoteForEdit: null,
      currentTemplate: null,
      isNewTemplate: false,
      isUpdateTemplate: false,
      saveMessage: true,
    });

    this.props.showEditNoteModal(false, null, null);
  };

  handleNoteCategoryChange = () => {
    const catId = +this.refs.noteCategory.value;
    const note = clone(this.state.note);
    note.NoteCategoryID = catId;

    for (let i = 0; i < this.props.noteCategories.length; i++) {
      if (this.props.noteCategories[i].ID === catId) {
        note.OutputDescription = this.props.noteCategories[i].OutputDescription;
        break;
      }
    }

    this.setState({
      note: note,
      saveMessage: false,
    });
  };

  handleNoteChange = (e) => {
    const text = e.target.value,
      note = clone(this.state.note);

    note.Note = text;

    this.setState({
      note: note,

      saveMessage: false,
    });
  };

  handleNoteTypeChange = (e) => {
    this.setState({
      noteType: e.target.value,

      saveMessage: false,
    });
  };

  handleSaveClick = (saveType) => {
    const note = clone(this.state.note);

    if (
      (this.props.actionType === 'add' && this.props.page === 'notes') ||
      (this.props.page === 'notes' &&
        (saveType === 'Save and New' || saveType === 'Save and Copy'))
    ) {
      note.QuoteID = this.props.quote.QuoteID;

      if (this.state.noteType !== 'quote') {
        const quoteItemIDs = this.props.quote.QuoteItems.map(
          (item) => item.QuoteItemID,
        );

        const isProductFamily = !quoteItemIDs.includes(this.state.noteType);

        if (isProductFamily) {
          note.ProductFamily = this.state.noteType;
          note.QuoteItemID = null;
        } else {
          note.QuoteItemID = this.state.noteType;
        }
      }
    }

    const editNote = Object.assign({}, note);

    switch (saveType) {
      case 'Save and New':
        editNote.Note = '';
        this.props.saveNote(note);

        if (this.props.actionType === 'edit') {
          editNote.NoteID = null;
          this.setState({
            prevNoteForEdit: Object.assign({}, editNote),
            note: editNote,
          });
        } else {
          this.setState({ note: editNote });
        }

        this.setState({ saveMessage: true });
        break;

      case 'Save and Copy':
        this.props.saveNote(note);

        if (this.props.actionType === 'edit') {
          editNote.NoteID = null;
          this.setState({
            prevNoteForEdit: Object.assign({}, editNote),
            note: editNote,
          });
        }

        this.setState({ saveMessage: true });
        break;

      case 'Save and Close':
        this.props.saveNote(note);
        this.handleCloseClick();
        break;

      case 'Just Save':
        if (this.props.actionType === 'edit') {
          note.QuoteID = this.props.quote.QuoteID;
          note.NoteID = this.props.note.NoteID;
        }

        this.props.saveNote(note, true);
        this.setState({ saveMessage: true });
        break;

      default:
        break;
    }

    if (this.state.isNewTemplate && note.Note) {
      this.props.addNoteTemplate({ Note: note.Note });
    }

    if (
      this.state.isUpdateTemplate &&
      this.state.currentTemplate &&
      note.Note
    ) {
      const template = clone(this.state.currentTemplate);
      template.Note = note.Note;
      this.props.updateNoteTemplate(template);
    }

    if (this.state.currentTemplate) {
      this.clearRadioButton.checked = true;
    }

    this.setState({
      currentTemplate: null,
      isNewTemplate: false,
      isUpdateTemplate: false,
    });
  };

  render() {
    const { quote, noteTemplates } = this.props;
    let itemList = null;
    let quoteItems = null;
    let textQuote = msgFormatter('quote')();
    let productFamilies = [];
    let familyItems = null;

    if (quote && quote.QuoteItems) {
      quoteItems = quote.QuoteItems.map((item) => (
        <option key={item.QuoteItemID} value={item.QuoteItemID}>
          {item.Sequence} - {item.ProductDescription}
          {item.Marks !== null ? ' | ' + item.Marks : ''}
        </option>
      ));

      quote.QuoteItems.forEach((category) => {
        if (!includes(productFamilies, category.ProductFamily)) {
          productFamilies.push(category.ProductFamily);
        }
      });

      familyItems = productFamilies.map((family, i) => (
        <option key={i} value={family}>
          {family}
        </option>
      ));
    }
    if (
      (this.props.actionType === 'add' || this.props.actionType === 'edit') &&
      this.props.page === 'notes'
    ) {
      itemList = (
        <li className="col-xs-12 col-lg-7">
          <span
            className="text-bold"
            style={{ paddingRight: '5px', display: 'block' }}>
            Assign your note to
          </span>

          <div className="form-group" style={{ display: 'inline-block' }}>
            <select
              className="form-control notes-type-select"
              value={this.state.noteType}
              onChange={this.handleNoteTypeChange}>
              <option value="quote">{textQuote}</option>

              {familyItems}

              {quoteItems}
            </select>
          </div>
        </li>
      );
    }

    let categories = sortBy(this.props.noteCategories, 'ID');

    var noteCategories = categories.map(function (cat) {
      return (
        <option key={cat.ID} value={cat.ID}>
          {cat.Name}
        </option>
      );
    }, this);

    var catId = this.state.note ? this.state.note.NoteCategoryID : -1;

    var noteText =
      this.state.note && this.state.note.Note ? this.state.note.Note : '';

    var notePlaceholder = msgFormatter('notePlaceholder')(); //Add your note here...

    const showCheckbox =
      this.state.currentTemplate &&
      this.state.currentTemplate.Note !== noteText;

    return (
      <Modal
        show={this.props.show}
        id="add-new-note-modal"
        onHide={this.handleCloseClick}
        backdrop="static"
        dialogClassName="note-modal-dialog">
        <div className="modal-header">
          <h4 className="modal-title">
            {this.props.actionType === 'add' ? (
              <FormatMessage path="addNoteTitle">Add New Note</FormatMessage>
            ) : (
              <FormatMessage path="editNoteTitle">Edit Note</FormatMessage>
            )}
          </h4>
        </div>

        <div className="modal-body">
          <div className="modal-info-detail">
            <ul
              className="row config-row"
              style={{ padding: '15px 15px 0px 15px' }}>
              {itemList}

              <li className="col-xs-12 col-lg-5">
                <span
                  className="text-bold"
                  style={{
                    paddingRight: '5px',

                    display: 'block',
                  }}>
                  Select your note type
                </span>

                <div className="form-group" style={{ display: 'inline-block' }}>
                  <select
                    ref="noteCategory"
                    className="form-control notes-category-select"
                    value={catId}
                    onChange={this.handleNoteCategoryChange}>
                    {noteCategories}
                  </select>
                </div>
              </li>

              {this.state.noteType === 'quote' && (
                <li className="col-xs-12 ">
                  <div className="label-red">
                    <span className="label-bold">NOTE: </span>

                    <FormatMessage path="noteInstructions">
                      Quote notes will appear on All VERSIONS and all documents
                      of quote.
                    </FormatMessage>
                  </div>
                </li>
              )}

              {this.state.note && this.state.note.OutputDescription ? (
                <li className="col-xs-12">
                  <div style={{ padding: '10px 0px 20px 0px' }}>
                    <FormatMessage path="noteOutputDescription">
                      In Proposals and Submittals generated in Documents, the
                      following text will be displayed before your note:
                    </FormatMessage>
                  </div>

                  <div>
                    <span className="text-bold">
                      "{this.state.note.OutputDescription}"
                    </span>
                  </div>
                </li>
              ) : null}

              <li className="col-xs-12" style={{ marginBottom: '10px' }}>
                <NoteTemplates
                  templates={noteTemplates}
                  onSelectTemplate={this.setCurrentTemplate}
                />

                <input
                  type="radio"
                  name="note-templates"
                  id="clearRadioButton"
                  ref={(input) => (this.clearRadioButton = input)}
                  style={{
                    visibility: 'hidden',

                    position: 'absolute',
                  }}
                />
              </li>

              <li className="col-xs-12 note-modal-input">
                <div className="form-group">
                  <textarea
                    value={noteText ? noteText : ''}
                    className="form-control"
                    onChange={this.handleNoteChange}
                    placeholder={notePlaceholder}
                  />
                </div>
              </li>

              <li className="col-xs-12">
                <div className="form-group">
                  <span>* </span>

                  <FormatMessage path="noteDescription">
                    Private Notes are viewable only within the quote and are not
                    available for use in proposal or submittal documents.
                  </FormatMessage>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <div className="footer-modal-notes">
            <div>
              <div className="btn-group">
                <button
                  onClick={() => this.handleSaveClick('Just Save')}
                  type="button"
                  className="btn btn-primary save-note-btn">
                  <FormatMessage path="save">Save</FormatMessage>
                </button>

                <button
                  type="button"
                  className="btn btn-primary dropdown-toggle"
                  data-toggle="dropdown"
                  aria-expanded="true">
                  <span className="caret" />
                </button>

                <ul
                  className="dropdown-menu save-dropdown-menu ddown-up"
                  role="menu">
                  <li>
                    <a
                      role="presentation"
                      onClick={() => this.handleSaveClick('Save and Close')}>
                      <FormatMessage path="saveAndClose">
                        Save & Close
                      </FormatMessage>
                    </a>
                  </li>

                  <li>
                    <a
                      role="presentation"
                      onClick={() => this.handleSaveClick('Save and New')}>
                      <FormatMessage path="saveAndNew">
                        Save & New
                      </FormatMessage>
                    </a>
                  </li>

                  <li>
                    <a
                      role="presentation"
                      onClick={() => this.handleSaveClick('Save and Copy')}>
                      <FormatMessage path="saveAndCopy">
                        Save & Copy
                      </FormatMessage>
                    </a>
                  </li>
                </ul>
              </div>

              <button
                onClick={this.handleCloseClick}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal">
                <FormatMessage path="cancel">Cancel</FormatMessage>
              </button>

              {this.state.saveMessage ? (
                <React.Fragment>
                  <i
                    style={{
                      color: 'green',

                      paddingRight: '5px',
                    }}
                    className="fas fa-check"
                  />

                  <span style={{ color: 'green' }}>
                    <FormatMessage path="noteSaved">Note Saved</FormatMessage>
                  </span>
                </React.Fragment>
              ) : null}
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              {showCheckbox && (
                <div style={{ marginRight: '20px' }}>
                  <AppCheckBox
                    id="updateCurrentTemplate"
                    labelPath="updateCurrentTemplate"
                    customClass="edit-note-check"
                    onChange={(e) =>
                      this.setState({
                        isUpdateTemplate: e.target.checked,
                      })
                    }
                    checked={this.state.isUpdateTemplate}
                  />
                </div>
              )}

              <div>
                <AppCheckBox
                  id="addNewTemplate"
                  labelPath="addNewTemplate"
                  customClass="edit-note-check"
                  onChange={(e) =>
                    this.setState({
                      isNewTemplate: e.target.checked,
                    })
                  }
                  checked={this.state.isNewTemplate}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

class EditNoteModalContainer extends React.Component {
  render() {
    if (this.props.show) {
      return <EditNoteModal {...this.props} />;
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = (state) => ({
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
