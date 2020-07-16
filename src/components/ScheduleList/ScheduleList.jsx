import React from 'react';
import { useSelector } from 'react-redux';

import './styles.css';

import Appointment from '../Appointment';

const ScheduleList = ({ setModal }) => {
  const { appointments } = useSelector(state => state.appointments);

  return (
    <section className="schedule-list">
      {appointments.length
        ? appointments.map(appointment => (
            <Appointment key={appointment.id} appointment={appointment} setModal={setModal}/>
        ))
        : <p className="schedule-list__empty">Não há nada agendado nesta data :)</p>
      }
    </section>
  );
}

export default ScheduleList;