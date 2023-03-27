import axios from "axios";
import React from "react";

export default class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseURL: "https://us-east1-serverless-306422.cloudfunctions.net/exchangerates",
      sourceCurrency: "",
      destinationCurrency: "",
      date: "",
      conversionRate: "",
      error: "",
    };
  }

  
  handleSourceCurrencyChange = (event) => {
    const sourceCurrency = event.target.value
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .slice(0, 3);
    this.setState({ sourceCurrency });
  };

  handleDestinationCurrencyChange = (event) => {
    const destinationCurrency = event.target.value
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .slice(0, 3);
    this.setState({ destinationCurrency });
  }; 

  handleDateChange = (event) => {
    const date = event.target.value
      .replace(/[^\d-]/g, "")
      .slice(0, 10);
    this.setState({ date });
  };

  handleFindRateClick = () => {
    const { sourceCurrency, destinationCurrency, date } = this.state;
    if (!sourceCurrency || !destinationCurrency || !date) {
      this.setState({ error: "Please complete each field" });
      return;
    }
    axios
      .get(`${this.state.baseURL}/${date}?base=${sourceCurrency}`)
      .then((response) => {
        if (response.data.error) {
          this.setState({ error: response.data.error });
        } else {
          const conversionRate = response.data.rates[destinationCurrency];
          this.setState({ conversionRate, error: "" });
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error: "An unexpected error occurred" });
      });
  };

  handleResetFieldsClick = () => {
    this.setState({
      sourceCurrency: "",
      destinationCurrency: "",
      date: "",
      conversionRate: "",
      error: "",
    });
  };

  render() {
    const { sourceCurrency, destinationCurrency, date, conversionRate, error } = this.state;
    return (
      <>
        <label>
          Source Currency:
          <input
            className="currency-source"
            type="text"
            value={sourceCurrency}
            onChange={this.handleSourceCurrencyChange}
          />
        </label>
        <label>
          Destination Currency:
          <input
            className="currency-destination"
            type="text"
            value={destinationCurrency}
            onChange={this.handleDestinationCurrencyChange}
          />
        </label>
        <label>
          Date:
          <input
            className="currency-date"
            type="text"
            placeholder="yyyy-mm-dd"
            value={date}
            onChange={this.handleDateChange}
          />
        </label>
        <button className="find-rate" onClick={this.handleFindRateClick}>
          Find Rate
        </button>
        <button className="reset-fields" onClick={this.handleResetFieldsClick}>
          Reset Fields
        </button>
        <div className="conversion-result">
          {conversionRate ? `${conversionRate}` : error}
        </div>
      </>
    );
  }
}
