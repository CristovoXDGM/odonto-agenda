import React from 'react';
import { addMinutes, format, parseISO } from 'date-fns';
import { useDispatch } from 'react-redux';
import { baseUrl } from '../../services/api';

import { setAppointment } from '../../actions/appointment';
import { setActive, setType } from '../../actions/modal';

import './styles.css';

const Appointment = ({ appointment }) => {
  const dispatch = useDispatch();

  const startHour = parseISO(appointment.date);
  const finishHour = addMinutes(startHour, appointment.duration);

  const formatHour = date => {
    return format(date, 'HH:mm');
  }

  const color = procedure => {
    if (procedure.toLowerCase() === 'consulta') {
      return {
        color: 'var(--consultation-color)',
        border: '4px solid var(--consultation-color)'
      }
    }
    if (procedure.toLowerCase() === 'limpeza') {
      return {
        color: 'var(--cleaning-color)',
        border: '4px solid var(--cleaning-color)'
      }
    }
    if (procedure.toLowerCase() === 'extração') {
      return {
        color: 'var(--extraction-color)',
        border: '4px solid var(--extraction-color)'
      }
    }
  }

  const handleClick = async () => {
    const results = await fetch(`${baseUrl}/appointments/${appointment.id}`);
    const data = await results.json();

    dispatch(setAppointment(data));
    dispatch(setActive(true));
    dispatch(setType('edit'));
  }

  return (
    <div 
      className="schedule-wrapper"
      onClick={handleClick}
    >
      {appointment && 
      <div 
        className="schedule" 
        style={{ borderLeft: color(appointment.procedure).border }}
      >

        <div className="schedule__info-top">
          <h3 
            className="schedule__procedure" 
            style={{ color: color(appointment.procedure).color }}
          >
            {appointment.procedure}
          </h3>
          <p className="schedule__hour">{formatHour(startHour)}</p>
        </div>
        
        <div className="schedule__info-bottom">
          <p>{appointment.client}</p>
          <p>--{formatHour(finishHour)}</p>
        </div>

      </div>
      }
    </div>
  );
}

export default Appointment;