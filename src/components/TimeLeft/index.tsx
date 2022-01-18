import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';

import './index.scss';

const TimeLeft = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const end = moment('2071-04-24 13:17:00');
      const duration = moment.duration(end.diff(now));
      const years = duration.years();
      const days = duration.days();
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      setTime(`${years} years, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
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
