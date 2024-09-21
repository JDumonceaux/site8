import { showPriceAppealModal } from 'actions/InteractionActions';
import { postPriceAppeal } from 'actions/QuoteActions';
import { msgFormatter } from 'app/util';
import classNames from 'classnames';
import GblOption from 'components/util/GblOption';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { FormatCurrency, FormatMessage } from 'react-globalize';
import { connect } from 'react-redux';

class PriceAppealModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Industry: undefined,
      SalesPricingStrategy: undefined,
      CompetitiveSituation: undefined,
      modalCollapse: false,
    };
  }

  modalCollapseToggle = () => {
    let modalCollapse = !this.state.modalCollapse;
    this.setState({ modalCollapse });
  };
  handleCloseClick = (e) => {
    this.props.showPriceAppealModal(false, null);
  };

  handleCompetitiveSituationChange = (e) => {
    this.setState({ CompetitiveSituation: e.target.value });
  };

  handleIndustryChange = (e) => {
    this.setState({ Industry: e.target.value });
  };

  handleSalesPricingStrategyChange = (e) => {
    this.setState({ SalesPricingStrategy: e.target.value });
  };

  handleSumbitAppealClick = (e) => {
    var quoteID = this.props.priceData.QuoteID;
    var priceAppeal = {
      QuoteID: this.props.priceData.QuoteID,
      RequestedPrice: this.props.priceData.ItemizedTotalNetPrice,
      ChannelType: this.props.currentQuote.ChannelType
        ? this.props.currentQuote.ChannelType
        : null,
      Industry: this.state.Industry,
      SalesPricingStrategy: this.state.SalesPricingStrategy,
      CompetitiveSituation: this.state.CompetitiveSituation,
    };
    this.props.postPriceAppeal(quoteID, priceAppeal);
  };

  renderEmpty = () => {
    return (
      <Modal
        show={this.props.show}
        onHide={this.handleCloseClick}
        bsSize="large"
        id="price-appeal-modal"
        backdrop="static">
        <div className="modal-header">
          <h4 className="modal-title">
            <FormatMessage path="priceAppeal">Price Appeal</FormatMessage>
          </h4>
        </div>
        <div className="modal-body">
          <div>
            <h4>
              <FormatMessage path="priceAppeal">Price Appeal</FormatMessage>
            </h4>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleSumbitAppealClick}>
            <FormatMessage path="submitAppeal">Submit Appeal</FormatMessage>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleCloseClick}>
            <FormatMessage path="close">Close</FormatMessage>
          </button>
        </div>
      </Modal>
    );
  };

  render() {
    if (!this.props.show) {
      return this.renderEmpty();
    }

    //var dataNotEntered = (isEmpty(this.state.ChannelType) || isEmpty(this.state.Industry) || isEmpty(this.state.SalesPricingStrategy) || isEmpty(this.state.CompetitiveSituation));
    var dataNotEntered =
      isEmpty(this.state.Industry) ||
      isEmpty(this.state.SalesPricingStrategy) ||
      isEmpty(this.state.CompetitiveSituation);

    var messageClass = classNames('alert alert-danger', {
      hidden: this.props.message === null,
    });
    var govtFunded = msgFormatter('govtFunded')(); //Government Funded
    var collapseIcon = { float: 'right', cursor: 'pointer' };
    collapseIcon = this.state.modalCollapse
      ? { float: 'right', cursor: 'pointer', marginTop: 4 }
      : collapseIcon;
    return (
      <Modal
        show={this.props.show}
        onHide={this.handleCloseClick}
        bsSize="large"
        id="price-appeal-modal"
        backdrop="static">
        <div className="modal-header">
          <h4 className="modal-title">
            <FormatMessage path="priceAppeal">Price Appeal</FormatMessage>
          </h4>
          <div style={collapseIcon} onClick={this.modalCollapseToggle}>
            <i
              className={
                this.state.modalCollapse
                  ? 'fa fa-window-maximize'
                  : 'fa fa-window-minimize'
              }
              aria-hidden="true"
            />
          </div>
        </div>
        {!this.state.modalCollapse ? (
          <div className="modal-body">
            <div>
              <div className={messageClass} role="alert">
                <i className="fal fa-exclamation-circle" />{' '}
                <span className="line-break-text">{this.props.message}</span>
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
                      <p>
                        {msgFormatter('notSubmitted')()}
                        &nbsp;
                      </p>
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
                        <FormatCurrency
                          currency={this.props.priceData.CurrencyCode}>
                          {this.props.priceData.ItemizedTotalNetPrice}
                        </FormatCurrency>
                      </p>
                    </div>
                  </li>
                </ul>
                <ul className="row config-row">
                  {/*
                                <li className="col-xs-12 col-sm-4">
                                    <div className="form-group">
                                        <label><FormatMessage path="channelType">Channel Type</FormatMessage></label>
                                        <select className="form-control" onChange={this.handleChannelTypeChange} value={this.state.ChannelType}>
                                            <option value="">&nbsp;</option>
                                            <GblOption value="Distributor" gblKey="distributor" defaultText="Distributor" />
                                            <GblOption value="OEM" gblKey="oem" defaultText="OEM" />
                                            <GblOption value="User" gblKey="user" defaultText="User" />
                                            <GblOption value="Engineer Constructor" gblKey="engineerConstructor" defaultText="Engineer Constructor" />
                                            <GblOption value="Retail" gblKey="retail" defaultText="Retail" />
                                            <GblOption value="Unknown" gblKey="unknown" defaultText="Unknown" />
                                        </select>
                                    </div>
                                </li>
                                */}
                  <li className="col-xs-12 col-sm-6">
                    <div className="form-group">
                      <label>
                        <FormatMessage path="industry">Industry</FormatMessage>
                      </label>
                      <select
                        className="form-control"
                        onChange={this.handleIndustryChange}
                        value={this.state.Industry}>
                        <option value="">&nbsp;</option>
                        <GblOption
                          value="Ele_Electric Utility/IPP/NUG"
                          gblKey="electricUtility"
                          defaultText="Electric Utility / IPP / NUG"
                        />
                        <GblOption
                          value="E-Mobility"
                          gblKey="emobility"
                          defaultText="E-Mobility"
                        />
                        <GblOption
                          value="Foo_Food & Beverage"
                          gblKey="foodBeverage"
                          defaultText="Food & Beverage"
                        />
                        <GblOption
                          value="Gov_Government/Public Authority"
                          gblKey="govtPublicAuth"
                          defaultText="Government / Public Authority"
                        />
                        <GblOption
                          value="Hea_Healthcare"
                          gblKey="healthcare"
                          defaultText="Healthcare"
                        />
                        <GblOption
                          value="Mar_Marine/Transportation"
                          gblKey="marineTrans"
                          defaultText="Marine / Transportation"
                        />
                        <GblOption
                          value="Ind_Mining"
                          gblKey="mining"
                          defaultText="Mining"
                        />
                        <GblOption
                          value="Pet_Petrochemical/Chemical"
                          gblKey="oilGas"
                          defaultText="Oil, Gas and Petrochemical / Chemical"
                        />
                        <GblOption
                          value="Ind_UNKNOWN"
                          gblKey="otherIndustrial"
                          defaultText="Other Industrial"
                        />
                        <GblOption
                          value="Pul_Pulp and paper"
                          gblKey="pulpPaper"
                          defaultText="Pulp and Paper"
                        />
                        <GblOption
                          value="Wat_Water"
                          gblKey="water"
                          defaultText="Water"
                        />
                        <GblOption
                          value="Com_UNKNOWN"
                          gblKey="construction"
                          defaultText="Construction"
                        />
                        <GblOption
                          value="Unk_Unknown"
                          gblKey="renewables"
                          defaultText="Renewables"
                        />
                        <GblOption
                          value="Ind_Telecommunications"
                          gblKey="telecomm"
                          defaultText="Telecommunications / Data center"
                        />
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
                        onChange={this.handleSalesPricingStrategyChange}
                        value={this.state.SalesPricingStrategy}>
                        <option value="">&nbsp;</option>
                        <GblOption value="Buy" gblKey="buy" defaultText="Buy" />
                        <GblOption value="Bid" gblKey="bid" defaultText="Bid" />
                        <GblOption
                          value="Offer of Business"
                          gblKey="offerOfBusiness"
                          defaultText="Offer of Business"
                        />
                        <GblOption
                          value="Meet Competition"
                          gblKey="meetCompetition"
                          defaultText="Meet Competition"
                        />
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
                        onChange={this.handleCompetitiveSituationChange}
                        maxLength="32000"
                        rows="2"
                        value={this.state.CompetitiveSituation}
                      />
                    </div>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        ) : (
          ''
        )}
        {!this.state.modalCollapse ? (
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleSumbitAppealClick}
              disabled={dataNotEntered}>
              <FormatMessage path="submitAppeal">Submit Appeal</FormatMessage>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.handleCloseClick}>
              <FormatMessage path="close">Close</FormatMessage>
            </button>
          </div>
        ) : (
          ''
        )}
      </Modal>
    );
  }
}

class PriceAppealModalContainer extends React.Component {
  render() {
    if (this.props.show) {
      return <PriceAppealModal {...this.props} />;
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = (state) => ({
  show: state.Interaction.priceAppealModal.show,
  priceAppeal: state.Quote.priceAppeal,
  priceData: state.Quote.priceData,
  currentUser: state.Quote.currentUser,
  message: state.Interaction.priceAppealModal.message,
  currentQuote: state.Quote.currentQuote,
});

export default connect(mapStateToProps, {
  postPriceAppeal,
  showPriceAppealModal,
})(PriceAppealModalContainer);
