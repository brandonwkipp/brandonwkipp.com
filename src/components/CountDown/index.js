import React, { Component } from 'react';
import moment from 'moment';
import 'moment-countdown';
import './index.css';

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: null,
    };

    this.getTime = this.getTime.bind(this);
  }

  componentDidMount() {
    this.getTime();
  }

  getTime() {
    setInterval(() => {
      this.setState({
        time: moment('2071-04-24 13:17:00').countdown().toString(),
      });
    }, 1000);
  }

  render() {
    const { time } = this.state;
    return (
      <div id="timeContainer">
        <div id="time" className="mt-5 text-center">
          {time}
        </div>
      </div>
    );
  }
}

export default Time;
