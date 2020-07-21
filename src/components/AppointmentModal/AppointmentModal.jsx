import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { baseUrl } from '../../services/api';

import { resetAppointment } from '../../actions/appointment';
import { setActive } from '../../actions/modal';

import Button from '../Button';

function AppointmentModal({ choosenDate, date }) {
  const dispatch = useDispatch();
  const { id, procedure_id, client_id, hour, duration, comments } = useSelector(state => state.appointment);
  const { modalType } = useSelector(state => state.modal);

  const [procedures, setProcedures] = useState([]);
  const [clients, setClients] = useState([]);

  const [procedureId, setProcedureId] = useState(procedure_id || 1);
  const [clientId, setClientId] = useState(client_id || 1);
  const [formHour, setFormHour] = useState(hour);
  const [formDuration, setFormDuration] = useState(duration);
  const [formComments, setFormComments] = useState(comments);
  
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
    
    if(formHour.length === 1) {
      setFormHour(`${value}:`)
    } else {
      setFormHour(value);
    }

    if (formHour === ':') {
      setFormHour('');
    }

    // setFormHour(value
    //   .replace(/\D/g, '')
    //   .replace(/(\d{2})/, '$1:')
    // )
  }

  const handleClickCancel = e => {
    e.preventDefault();

    dispatch(resetAppointment());
    dispatch(setActive(false));
  }

  const validate = hour => {
    if (
      hour.length < 5 ||
      hour[0] > 2 ||
      hour[3] > 5
      ) {
        return alert('Digite um horario válido');
    }
  }

  const handleSubmit = async (e, method, id) => {
    e.preventDefault();

    validate(formHour);
    
    let fetchUrl = `${baseUrl}/appointments`;
    
    if (id) {
      fetchUrl = `${fetchUrl}/${id}`;
    }

    const postObject = JSON.stringify({
      procedure_id: Number(procedureId),
      client_id: Number(clientId),
      choosenDate,
      hour: formHour,
      duration: formDuration,
      comments: formComments
    });

    try {
      await fetch(fetchUrl, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: postObject,
      });

      dispatch(setActive(false));
      dispatch(resetAppointment());

    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (e, id) => {
    e.preventDefault();

    try {
      const canDelete = window.confirm('Tem certeza que deseja excluir essa consulta?');

      if(canDelete) {
        await fetch(`${baseUrl}/appointments/${id}`, {
          method: 'DELETE'
        });

        dispatch(setActive(false));
        dispatch(resetAppointment());
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
      <>
      
        <header className="modal__header">
          <h1 className="modal__title">
            {modalType === 'new'
              ? 'Agendar para'
              : 'Editar agendamento para'
            }
          </h1>
          <h2 className="modal__subtitle">
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
                  name="formHour"
                  maxLength="5"
                  value={formHour}
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
                  value={formDuration}
                  onChange={e => setFormDuration(e.target.value)}
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
              value={formComments}
              onChange={e => setFormComments(e.target.value)}
            />
          </div>

          <input type="hidden" name="choosenDate" value={choosenDate}/>

        </main>

        <footer className="modal__footer">
          {modalType === 'new'
            ? <div className="footer__new">
                <Button type={'primary'} text={'Agendar'}  handleClick={e => handleSubmit(e, 'POST')}/>
                <Button type={'cancel'} text={'Cancelar'} className="button__cancel" handleClick={handleClickCancel}/>
              </div>
            : <div className="footer__edit">
                <Button type={'save'} text={'Salvar'} handleClick={e => handleSubmit(e, 'PUT', id)}/>
                <div className="footer__edit footer__edit--bottom">
                  <Button type={'cancel'} text={'Cancelar'} handleClick={handleClickCancel}/>
                  <Button type={'delete'} text={'Excluir'} handleClick={e => handleDelete(e, id)}/>
                </div>
              </div>
          }
        </footer>

      </>
  );
}

export default AppointmentModal;