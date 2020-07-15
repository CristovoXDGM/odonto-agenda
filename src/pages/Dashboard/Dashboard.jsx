import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { baseUrl } from '../../services/api';

import 'react-calendar/dist/Calendar.css';
import './styles.css';

import ScheduleList from '../../components/ScheduleList';
import Button from '../../components/Button';
import AppointmentModal from '../../components/AppointmentModal';

const Dashboard = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const choosenDay = format(date, 'yyyy-MM-dd');

  useEffect(() => {
    fetch(`${baseUrl}/appointments?schedule=${choosenDay}`)
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
      });
  }, [choosenDay, activeModal]);

  const handleChangeDate = event => {
    setDate(event);
  }

  const handleClickNew = e => {
    e.preventDefault();

    setActiveModal(true);
  }

  const handleClickCancel = e => {
    e.preventDefault();

    setActiveModal(false);
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
            <Button text={'Novo'} icon={'add'} handleClick={handleClickNew} />
          </div>
        </div>

        <ScheduleList appointments={appointments}/>
        
        {activeModal &&
          <AppointmentModal 
            setModal={setActiveModal}
            action={'new'} 
            choosenDate={choosenDay} 
            date={date} 
            handleCancel={handleClickCancel} 
          />
        }
      </div>
    </div>
  );
}

export default Dashboard;