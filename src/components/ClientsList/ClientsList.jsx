import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActive, setType } from '../../actions/modal';

import'./styles.css';

import Client from '../Client';
import Button from '../Button';
import Modal from '../Modal';
import ClientModal from '../ClientModal';

function ClientList() {
  const dispatch = useDispatch();

  const { clients, searchedClients } = useSelector(state => state.clients);
  const { modalActive } = useSelector(state => state.modal);

  const clientsList = searchedClients.length ? searchedClients : clients;

  const handleClickNew = e => {
    e.preventDefault();
  
    dispatch(setActive(true));
    dispatch(setType('new'));
  }

  return (
    <section className="client-list">

      <header className="client-list__header">
        <Button type={'primary'} text={'Novo'} icon={'add'} handleClick={handleClickNew} />
      </header>

      <main className="client-list__content">
        {clientsList
          ? clientsList.map(client => (
              <Client key={client.id} client={client} />
            ))
          : 'Carregando...'
        }
      </main>

      {modalActive && 
        <Modal>
          <ClientModal />
        </Modal>
      }

    </section>
  );
}

export default ClientList;