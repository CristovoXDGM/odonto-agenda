import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl } from '../../services/api';
import { setClients } from '../../actions/clientsList';

import './styles.css';

import ClientsList from '../../components/ClientsList';
import ClientProfile from '../../components/ClientProfile';
import Search from '../../components/Search';

function Clients() {
  const dispatch = useDispatch();
  const { modalActive } = useSelector(state => state.modal);

  useEffect(() => {
    fetch(`${baseUrl}/clients`)
      .then(res => res.json())
      .then(data => {
        dispatch(setClients(data));
      });
  }, [dispatch, modalActive]);

  return (
    <div className="clients container">
      <ClientProfile />

      <Search />

      <ClientsList />
    </div>  
  );
}

export default Clients;