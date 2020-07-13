import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { baseUrl } from '../../services/api';

import './styles.css';

import Button from '../Button';

function AppointmentModal({ action, day, appointmentId }) {
  const [status] = useState(action);
  const [procedures, setProcedures] = useState([]);
  const [clients, setClients] = useState([]);
  const [appointment, setAppointment] = useState({});

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

  useEffect(() => {
    if (appointmentId) {
      fetch(`${baseUrl}/appointments/${appointmentId}`)
        .then(res => res.json())
        .then(data => setAppointment(data));
    }
  }, []);

  const hourMask = input => {
    setTimeout(function() {
      let value = input.target.value;
      value = value.replace(/\D/g, "");

      return value;         // FAZER MASCARA DA HORA
    }, 1)
  }

  return (
    <div className="modal-overlay">
      <form className="modal">
        <header className="modal__header">
          <h1 className="modal__title">
            {status === 'new'
              ? 'Agendar para'
              : 'Editar agendamento para'
            }
          </h1>
          <h2 className="modal__date">
            {status === 'new'
              ? format(day, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
              : ''
            }
          </h2>
        </header>

        <main className="modal__content">

          <div className="modal__field">
            <label className="modal__label">Procedimento</label>
            <select name="procedure_id" className="modal__input">
              {procedures.map(procedure => (
                <option key={procedure.id} value={procedure.id}>
                  {procedure.name}
                </option>
              ))}
            </select>
          </div>

          <div className="modal__field">
            <label className="modal__label">Paciente</label>
            <select name="client_id" className="modal__input">
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
                  value={appointment.hour}
                  onKeyDown={e => hourMask(e)}
                  className="modal__input"
                />
                <span className="input__units">hs</span>
              </div>
            </div>

            <div className="modal__field modal__field--duration">
              <label className="modal__label">Duração</label>
              <div className="field__input">
                <input
                  type="number"
                  name="duration"
                  value={appointment.duration}
                  className="modal__input"
                />
                <span className="input__units">min</span>
              </div>
            </div>

          </div>

          <div className="modal__field">  
            <label className="modal__label">Comentários</label>
            <textarea name="comments" className="modal__input modal__input--comments">
              {appointment.comments}
            </textarea>
          </div>

        </main>

        <footer className="modal__footer">
          {status === 'new'
            ? <Button text={'Agendar'}/>
            : <Button text={'Salvar'}/>
          }
          <Button text={'Cancelar'} className="button__cancel"/>
        </footer>
      </form>
    </div>
  );
}

export default AppointmentModal;