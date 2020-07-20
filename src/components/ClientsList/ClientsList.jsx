import React from 'react';
import { useSelector } from 'react-redux';

import'./styles.css';

import Client from '../Client';

function ClientList() {
  const { clients, searchedClients } = useSelector(state => state.clients);

  const list = searchedClients.length > 0 ? searchedClients : clients;

  return (
    <section className="client-list">
      {list
        ? list.map(client => (
            <Client key={client.id} client={client} />
          ))
        : 'Carregando...'
      }
    </section>
  );
}

export default ClientList;