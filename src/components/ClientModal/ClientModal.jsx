import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl } from '../../services/api';
import { resetClient } from '../../actions/client';

import { setActive } from '../../actions/modal';

import Button from '../Button';

function ClientModal() {
  const dispatch = useDispatch();
  const { id, name } = useSelector(state => state.client);
  const { modalType } = useSelector(state => state.modal);

  const [formName, setFormName] = useState(name);

  const handleClickCancel = e => {
    e.preventDefault();

    dispatch(resetClient());
    dispatch(setActive(false));
  }

  const handleSubmit = async (e, method, id) => {
    e.preventDefault();
    
    let fetchUrl = `${baseUrl}/clients`;
    
    if (id) {
      fetchUrl = `${fetchUrl}/${id}`;
    }

    const postObject = JSON.stringify({
      name: formName,
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
      dispatch(resetClient());

    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (e, id) => {
    e.preventDefault();

    try {
      const canDelete = window.confirm('Tem certeza que deseja excluir esse paciente?');

      if(canDelete) {
        await fetch(`${baseUrl}/clients/${id}`, {
          method: 'DELETE'
        });

        dispatch(setActive(false));
        dispatch(resetClient());
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">

        <header className="modal__header">
          <h1 className="modal__title">
            {modalType === 'new'
              ? 'Novo paciente'
              : 'Editar paciente'
            }
          </h1>
          <h2 className="modal__subtitle">
            {name}
          </h2>
        </header>

        <main className="modal__content">

          <div className="modal__field">
            <label className="modal__label">Nome</label>
            <div className="field__input">
              <input
                type="text"
                name="name"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                className="modal__input"
              />
            </div>
          </div>

        </main>

        <footer className="modal__footer">
          {modalType === 'new'
            ? <div className="footer__new">
                <Button type={'primary'} text={'Registrar'}  handleClick={e => handleSubmit(e, 'POST')}/>
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

      </div>
    </div>
  );
}

export default ClientModal;