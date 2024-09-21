import { showPriceAppealModal } from 'actions/InteractionActions';
import { postPriceAppeal } from 'actions/QuoteActions';
import { msgFormatter } from 'app/util';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { FormatCurrency, FormatMessage } from 'react-globalize';
import { connect } from 'react-redux';

const PriceAppealModal = ({
  show,
  priceData,
  currentQuote,
  message,
  showPriceAppealModal,
  postPriceAppeal,
}) => {
  const [Industry, setIndustry] = useState('');
  const [SalesPricingStrategy, setSalesPricingStrategy] = useState('');
  const [CompetitiveSituation, setCompetitiveSituation] = useState('');
  const [modalCollapse, setModalCollapse] = useState(false);

  const toggleModalCollapse = () => setModalCollapse(!modalCollapse);
  const handleCloseClick = () => showPriceAppealModal(false, null);
  const handleIndustryChange = (e) => setIndustry(e.target.value);

  const handleSalesPricingStrategyChange = (e) =>
    setSalesPricingStrategy(e.target.value);

  const handleCompetitiveSituationChange = (e) =>
    setCompetitiveSituation(e.target.value);

  const handleSubmitAppealClick = () => {
    const quoteID = priceData.QuoteID;
    const priceAppeal = {
      QuoteID: priceData.QuoteID,
      RequestedPrice: priceData.ItemizedTotalNetPrice,
      ChannelType: currentQuote.ChannelType || null,
      Industry,
      SalesPricingStrategy,
      CompetitiveSituation,
    };
    postPriceAppeal(quoteID, priceAppeal);
  };

  const industryOptions = [
    {
      key: 'Electric Utility / IPP / NUG',
      value: 'Ele_Electric Utility/IPP/NUG',
    },
    { key: 'E-Mobility', value: 'E-Mobility' },
    { key: '', value: 'Foo_Food & Beverage' },
    // Add more options here...
  ];

  const priceStrategyOptions = [
    { key: 'buy', value: 'Buy' },
    { key: 'bid', value: 'Bid' },
    { key: 'offerOfBusiness', value: 'Offer of Business' },
    { key: 'meetCompetition', value: 'Meet Competition' },
  ];

  const renderOptions = (options) =>
    options.map((option) => (
      <GblOption
        key={option.key}
        value={option.value}
        defaultText={option.value}
      />
    ));

  const renderEmpty = () => (
    <Modal
      show={show}
      onHide={handleCloseClick}
      bsSize="large"
      id="price-appeal-modal"
      backdrop="static">
      <div className="modal-header">
        <h4 className="modal-title">
          <FormatMessage path="priceAppeal">Price Appeal</FormatMessage>
        </h4>
      </div>
      <div className="modal-body">
        <h4>
          <FormatMessage path="priceAppeal">Price Appeal</FormatMessage>
        </h4>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmitAppealClick}>
          <FormatMessage path="submitAppeal">Submit Appeal</FormatMessage>
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleCloseClick}>
          <FormatMessage path="close">Close</FormatMessage>
        </button>
      </div>
    </Modal>
  );

  if (!show) {
    return renderEmpty();
  }

  const dataNotEntered =
    isEmpty(Industry) ||
    isEmpty(SalesPricingStrategy) ||
    isEmpty(CompetitiveSituation);

  const messageClass = classNames('alert alert-danger', {
    hidden: message === null,
  });

  const collapseIcon = {
    float: 'right',
    cursor: 'pointer',
    marginTop: modalCollapse ? 4 : 0,
  };

  return (
    <Modal
      show={show}
      onHide={handleCloseClick}
      bsSize="large"
      id="price-appeal-modal"
      backdrop="static">
      <div className="modal-header">
        <h4 className="modal-title">
          <FormatMessage path="priceAppeal">Price Appeal</FormatMessage>
        </h4>
        <div style={collapseIcon} onClick={toggleModalCollapse}>
          <i
            className={
              modalCollapse ? 'fa fa-window-maximize' : 'fa fa-window-minimize'
            }
            aria-hidden="true"
          />
        </div>
      </div>
      {!modalCollapse && (
        <>
          <div className="modal-body">
            <div>
              <div className={messageClass} role="alert">
                <i className="fal fa-exclamation-circle" />{' '}
                <span className="line-break-text">{message}</span>
              </div>
              <form className="price-appeal-form">
                <ul className="row config-row">
                  <li className="col-xs-12 col-sm-8">
                    <div className="form-group">
                      <label>
                        <FormatMessage path="appealStatus">
                          Appeal Status
                        </FormatMessage>
                      </label>
                      <p>{msgFormatter('notSubmitted')()}</p>
                    </div>
                  </li>
                  <li className="col-xs-12 col-sm-4">
                    <div className="form-group">
                      <label>
                        <FormatMessage path="requestedPrice">
                          Requested Price
                        </FormatMessage>
                      </label>
                      <p>
                        <FormatCurrency currency={priceData.CurrencyCode}>
                          {priceData.ItemizedTotalNetPrice}
                        </FormatCurrency>
                      </p>
                    </div>
                  </li>
                </ul>
                <ul className="row config-row">
                  <li className="col-xs-12 col-sm-6">
                    <div className="form-group">
                      <label>
                        <FormatMessage path="industry">Industry</FormatMessage>
                      </label>
                      <select
                        className="form-control"
                        onChange={handleIndustryChange}
                        value={Industry}>
                        <option value="">&nbsp;</option>
                        {renderOptions(industryOptions)}
                      </select>
                    </div>
                  </li>
                  <li className="col-xs-12 col-sm-6">
                    <div className="form-group">
                      <label>
                        <FormatMessage path="pricingStrategy">
                          Pricing Strategy
                        </FormatMessage>
                      </label>
                      <select
                        className="form-control"
                        onChange={handleSalesPricingStrategyChange}
                        value={SalesPricingStrategy}>
                        <option value="">&nbsp;</option>
                        {renderOptions(priceStrategyOptions)}
                      </select>
                    </div>
                  </li>
                  <li className="col-xs-12 col-sm-12">
                    <div className="form-group">
                      <label>
                        <FormatMessage path="competitiveSituation">
                          Competitive Situation
                        </FormatMessage>
                      </label>
                      <textarea
                        className="form-control resize-vertical"
                        onChange={handleCompetitiveSituationChange}
                        maxLength="32000"
                        rows="2"
                        value={CompetitiveSituation}
                      />
                    </div>
                  </li>
                </ul>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmitAppealClick}
              disabled={dataNotEntered}>
              <FormatMessage path="submitAppeal">Submit Appeal</FormatMessage>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseClick}>
              <FormatMessage path="close">Close</FormatMessage>
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  show: state.Interaction.priceAppealModal.show,
  priceData: state.Quote.priceData,
  message: state.Interaction.priceAppealModal.message,
  currentQuote: state.Quote.currentQuote,
});

export default connect(mapStateToProps, {
  postPriceAppeal,
  showPriceAppealModal,
})(PriceAppealModal);
