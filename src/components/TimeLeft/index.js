import moment from 'moment';
import 'moment-countdown';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';

import './index.scss';

const TimeLeft = () => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment('2071-04-24 13:17:00').countdown().toString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="time" className="p-5 text-center">
      <h1 className="mt-5">Alleged Time left</h1>
      {(time === null) ? <Spinner /> : time}
    </div>
  );
};

export default TimeLeft;
