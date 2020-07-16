import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { baseUrl } from '../../services/api';
import { resetAppointment } from '../../actions/appointment';

import './styles.css';

import Button from '../Button';

function AppointmentModal({ setModal, action, choosenDate, date, handleCancel }) {
  const dispatch = useDispatch();
  const appointment = useSelector(state => state.appointment);

  const [procedures, setProcedures] = useState([]);
  const [clients, setClients] = useState([]);

  const [procedureId, setProcedureId] = useState(appointment.procedure_id || 1);
  const [clientId, setClientId] = useState(appointment.client_id || 1);
  const [hour, setHour] = useState(appointment.hour || '');
  const [duration, setDuration] = useState(appointment.duration || '');
  const [comments, setComments] = useState(appointment.comments || '');
  
  console.log(appointment)
  useEffect(() => {
    fetch(`${baseUrl}/procedures`)
      .then(res => res.json())
      .then(data => setProcedures(data));
  }, []);

  useEffect(() => {
    fetch(`${baseUrl}/clients`)
      .then(res => res.json())
      .then(data => setClients(data));
  }, []);

  const hourMask = input => {
    let value = input.target.value;

    setHour(value
      .replace(/\D/g, '')
      .replace(/(\d{2})/, '$1:')
    )
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const postObject = JSON.stringify({
      procedure_id: Number(procedureId),
      client_id: Number(clientId),
      choosenDate,
      hour,
      duration,
      comments
    });

    try {
      await fetch(`${baseUrl}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: postObject,
      });

      setModal(false);
      dispatch(resetAppointment());

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">

        <header className="modal__header">
          <h1 className="modal__title">
            {action === 'new'
              ? 'Agendar para'
              : 'Editar agendamento para'
            }
          </h1>
          <h2 className="modal__date">
            {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </h2>
        </header>

        <main className="modal__content">

          <div className="modal__field">
            <label className="modal__label">Procedimento</label>
            <select name="procedure_id" className="modal__input" value={procedureId} onChange={e => setProcedureId(e.target.value)}>
              {procedures.map(procedure => (
                <option key={procedure.id} value={procedure.id}>
                  {procedure.name}
                </option>
              ))}
            </select>
          </div>

          <div className="modal__field">
            <label className="modal__label">Paciente</label>
            <select name="client_id" className="modal__input" value={clientId} onChange={e => setClientId(e.target.value)}>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div className="modal__time">

            <div className="modal__field modal__field--hour">
              <label className="modal__label">Hora</label>
              <div className="field__input">
                <input
                  type="text"
                  name="hour"
                  maxLength="5"
                  value={hour}
                  onChange={e => hourMask(e)}
                  className="modal__input"
                />
                <span className="input__units">hs</span>
              </div>
            </div>

            <div className="modal__field modal__field--duration">
              <label className="modal__label">Duração</label>
              <div className="field__input">
                <input
                  type="text"
                  name="duration"
                  maxLength="3"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  className="modal__input"
                />
                <span className="input__units">min</span>
              </div>
            </div>

          </div>

          <div className="modal__field">  
            <label className="modal__label">Comentários</label>
            <textarea 
              name="comments" 
              className="modal__input modal__input--comments"
              value={comments}
              onChange={e => setComments(e.target.value)}
            />
          </div>

          <input type="hidden" name="choosenDate" value={choosenDate}/>

        </main>

        <footer className="modal__footer">
          {action === 'new'
            ? <Button type={'primary'} text={'Agendar'}  handleClick={handleSubmit}/>
            : <Button type={'primary'} text={'Salvar'}/>
          }
          <Button type={'secondary'} text={'Cancelar'} className="button__cancel" handleClick={handleCancel}/>
        </footer>

      </div>
    </div>
  );
}

export default AppointmentModal;