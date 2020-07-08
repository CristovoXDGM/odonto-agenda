import React from 'react';
import { addMinutes, format, parseISO } from 'date-fns';

import './styles.css';

const Hour = ({ appointment }) => {
  const limit = addMinutes(parseISO(appointment.date), appointment.duration)

  return (
    <div className="schedule-wrapper">
      {appointment && 
      <div className="schedule">
        <div className="schedule__info-top">
          <h3 className="schedule__procedure">{appointment.procedure}</h3>
          <p className="schedule__hour">{appointment.appointmentSchedule}</p>
        </div>
        <div className="schedule__info-bottom">
          <p>{appointment.client}</p>
          <p>--{format(limit, 'HH:mm')}</p>
        </div>
      </div>
      }
    </div>
  );
}

export default Hour;