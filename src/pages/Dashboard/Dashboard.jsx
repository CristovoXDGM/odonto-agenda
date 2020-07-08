import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { baseUrl } from '../../services/api';

import 'react-calendar/dist/Calendar.css';
import './styles.css';

import Hour from '../Hour';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const choosenDay = format(date, 'yyyy-MM-dd');

  useEffect(() => {
    fetch(`${baseUrl}/appointments?schedule=${choosenDay}`)
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
      });
  }, [date]);

  const handleChangeDate = event => {
    setDate(event);
  }

  return (
    <div className="dashboard">
      <section className="calendar">
        <Calendar 
          value={date}
          onChange={event => {handleChangeDate(event)}}
        />
      </section>

      <section className="schedules">
        {choosenDay === format(new Date(), 'yyyy-MM-dd')
          ? <h2 className="schedules__date">Hoje</h2>
          : <h2 className="schedules__date">{format(date, 'dd/MM')}</h2>
        }
        {appointments.map(appointment => (
          <Hour key={appointment.id} appointment={appointment}/>
        ))}
      </section>
    </div>
  );
}

export default Dashboard;