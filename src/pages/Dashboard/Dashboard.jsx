import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { baseUrl } from '../../services/api';

import 'react-calendar/dist/Calendar.css';
import './styles.css';

import Schedule from '../../components/Schedule';
import Button from '../../components/Button';

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
  }, [choosenDay]);

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

      <div className="schedules">

        <div className="schedules__header">
          {/* MOBILE DATE */}
          {choosenDay === format(new Date(), 'yyyy-MM-dd')
            ? <h2 className="schedules__header__date">Hoje</h2>
            : <h2 className="schedules__header__date">{format(date, "dd/MM")}</h2>
          }

          {/* DESKTOP DATE */}
          <h2 className="schedules__header__date schedules__header__date--desktop">
            {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </h2>
          
          <div className="add-appointment">
            <Button text={'Agendar'} icon={'add'}/>
          </div>
        </div>

        <section className="schedules__content">
          {appointments.length
            ? appointments.map(appointment => (
                <Schedule key={appointment.id} appointment={appointment}/>
            ))
            : <p className="schedules__content__empty">Não há nada agendado nesta data :)</p>
          }
        </section>
        
      </div>
    </div>
  );
}

export default Dashboard;