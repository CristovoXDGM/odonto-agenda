import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { baseUrl } from '../../services/api';
import { setAppointments } from '../../actions/appointments';
import { setActive, setType } from '../../actions/modal';

import 'react-calendar/dist/Calendar.css';
import './styles.css';

import ScheduleList from '../../components/ScheduleList';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import AppointmentModal from '../../components/AppointmentModal';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { modalActive } = useSelector(state => state.modal);

  const [date, setDate] = useState(new Date());

  const choosenDay = format(date, 'yyyy-MM-dd');

  useEffect(() => {
    fetch(`${baseUrl}/appointments?schedule=${choosenDay}`)
      .then(res => res.json())
      .then(data => {
        dispatch(setAppointments(data));
      });
  }, [choosenDay, dispatch, modalActive]);

  const handleChangeDate = event => {
    setDate(event);
  }

  const handleClickNew = e => {
    e.preventDefault();

    dispatch(setActive(true));
    dispatch(setType('new'));
  }

  return (
    <div className="dashboard container">
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
            <Button type={'primary'} text={'Novo'} icon={'add'} handleClick={handleClickNew} />
          </div>
        </div>

        <ScheduleList />
        
        {modalActive &&
          <Modal>
            <AppointmentModal 
              choosenDate={choosenDay} 
              date={date} 
            />
          </Modal>
        }
      </div>
    </div>
  );
}

export default Dashboard;