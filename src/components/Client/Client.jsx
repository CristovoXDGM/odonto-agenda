import React from 'react';
import { useDispatch } from 'react-redux';
import { baseUrl } from '../../services/api';

import { setClient } from '../../actions/client';
import { setActive, setType } from '../../actions/modal';

import'./styles.css';

function Client({ client }) {
  const dispatch = useDispatch();

  const handleClick = async () => {
    const results = await fetch(`${baseUrl}/clients/${client.id}`);
    const data = await results.json();

    dispatch(setClient(data));
    dispatch(setActive(true));
    dispatch(setType('edit'));
  }

  return (
    <div className="client" onClick={handleClick}>
      <h3 className="client__name">{client.name}</h3>
    </div>
  );
}

export default Client;