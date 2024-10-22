
import React, { Component } from "react";
import "./seats.css";

class Seatbooking1 extends React.Component {
  constructor() {
    super();
    this.state = {
      seat: [
        "x1",
        "x2",
        "x3",
        "x4",
        "x5",
        "x6",
        "x7",
        "y1",
        "y2",
        "y3",
        "y4",
        "y5",
        "y6",
        "y7",
        "z1",
        "z2",
        "z3",
        "z4",
        "z5",
        "z6",
        "z7"
      ],
      seatAvailable: [
        "A1",
        "A2",
        "A3",
        "A4",
        "A5",
        "A6",
        "A7",
        "B1",
        "B2",
        "B3",
        "B4",
        "B5",
        "B6",
        "B7",
        "C1",
        "C2",
        "C3",
        "C4",
        "C5",
        "C6",
        "C7"
      ],
      seatReserved: [],
      seatSelected: ["x7", "y7", "z7"]
    };
  }

  onClickData(seat) {
    if (this.state.seatReserved.indexOf(seat) > -1) {
      this.setState({
        seatAvailable: this.state.seatAvailable.concat(seat),
        seatReserved: this.state.seatReserved.filter(res => res != seat)
        //seatSelected: this.state.seatSelected.filter(res => res != seat)
      });
    } else {
      this.setState({
        seatReserved: this.state.seatReserved.concat(seat),
        //seatSelected: this.state.seatSelected.concat(seat),
        seatAvailable: this.state.seatAvailable.filter(res => res != seat)
      });
    }
  }
  checktrue(row) {
    if (this.state.seatSelected.indexOf(row) > -1) {
      return false;
    } else {
      return true;
    }
  }

  handleSubmited() {
    this.setState({
      seatSelected: this.state.seatSelected.concat(this.state.seatReserved)
    });
    this.setState({
      seatReserved: []
    });
  }

  render() {
    return (
      <div>
        <h1>Seat Reservation System</h1>
        <DrawGrid
          seat={this.state.seat}
          available={this.state.seatAvailable}
          reserved={this.state.seatReserved}
          selected={this.state.seatSelected}
          onClickData={this.onClickData.bind(this)}
          checktrue={this.checktrue.bind(this)}
          handleSubmited={this.handleSubmited.bind(this)}
        />
      </div>
    );
  }
}

class DrawGrid extends React.Component {
  render() {
    return (
      <div className="container">
        <h2 />
        <table className="grid">
          <tbody>
            <tr>
              {this.props.seat.map(row => (
                <td
                  className={
                    this.props.selected.indexOf(row) > -1
                      ? "reserved"
                      : this.props.reserved.indexOf(row) > -1
                      ? "selected"
                      : "available"
                  }
                  key={row}
                  onClick={
                    this.props.checktrue(row)
                      ? e => this.onClickSeat(row)
                      : null
                  }
                >
                  {row}{" "}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <button
          type="button"
          className="btn-success btnmargin"
          onClick={() => this.props.handleSubmited()}
        >
          Confirm Booking
        </button>
      </div>
    );
  }

  onClickSeat(seat) {
    this.props.onClickData(seat);
  }
}
export default Seatbooking1;
