import React, { Component } from 'react';
import moment from 'moment';
import 'moment-countdown';
import './index.css';

class TimeLeft extends Component {
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
      <div id="time" className="p-5 text-center">
        <h1 className="mt-5">Alleged Time left</h1>
        {time}
      </div>
    );
  }
}

export default TimeLeft;
