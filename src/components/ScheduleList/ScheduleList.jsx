import React from 'react';

import './styles.css';

import Schedule from '../Schedule';

const ScheduleList = ({ appointments }) => {
  return (
    <section className="schedule-list">
      {appointments.length
        ? appointments.map(appointment => (
            <Schedule key={appointment.id} appointment={appointment}/>
        ))
        : <p className="schedule-list__empty">Não há nada agendado nesta data :)</p>
      }
    </section>
  );
}

export default ScheduleList;