import React, { Component } from "react";

class Converter extends Component {
  state = {
    currencies: ["USD", "RUB", "KGS", "EUR", "JPY"],
    base: "USD",
    amount: "",
    convertTo: "EUR",
    result: "",
    date: "",
  };

  handleSelect = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
        result: null,
      },
      this.calculate
    );
  };

  handleInput = (e) => {
    this.setState(
      {
        amount: e.target.value,
        result: null,
        date: null,
      },
      this.calculate
    );
  };

  calculate = () => {
    const amount = this.state.amount;
    if (amount === isNaN) {
      return;
    } else {
      fetch(
        `https://freecurrencyapi.net/api/v2/latest?apikey=46918410-8a55-11ec-b4f3-79fff4a13bdf${this.state.base}`
      )
        .then((res) => res.json())
        .then((data) => {
          const date = data.date;
          const result = (data.rates[this.state.convertTo] * amount).toFixed(4);
          this.setState({
            result,
            date,
          });
        });
    }
  };


  render() {
    const { currencies, base, amount, convertTo, result } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="column">
            <div className="card card-body">
              <div className="row">
                {/*=================start of top inputs===============================*/}

                <div className="top-input">
                  <select
                    name="base"
                    value={base}
                    onChange={this.handleSelect}
                    className="form-currency left"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>

                  <select
                    name="convertTo"
                    value={convertTo}
                    onChange={this.handleSelect}
                    className="form-currency right"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
                {/* =======================end of top inputs============================== */}

                {/* ========================start of bottom input========================= */}
                <div className="form-block">
                  <form className="bottom-input">
                    <input
                      type="number"
                      value={amount}
                      onChange={this.handleInput}
                      className="bottom-input left currency"
                    />
                  </form>

                  <form className="bottom-input right mb-4">
                    <input
                      disabled={true}
                      value={
                        amount === ""
                          ? "0"
                          : result === null
                          ? "..."
                          : result
                      }
                      className="form-control right"
                    />
                  </form>
                </div>
                {/* ===================end of bottom input=============================== */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Converter;
