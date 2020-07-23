import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl } from '../../services/api';
import { setClients } from '../../actions/clientsList';

import './styles.css';

import ClientsList from '../../components/ClientsList';
import ClientProfile from '../../components/ClientProfile';
import Search from '../../components/Search';
import Loading from '../../components/Loading';

function Clients() {
  const dispatch = useDispatch();
  const { modalActive } = useSelector(state => state.modal);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`${baseUrl}/clients`)
      .then(res => res.json())
      .then(data => {
        dispatch(setClients(data));
        setLoading(false);
      });

  }, [dispatch, modalActive]);

  return (
    <div className="clients container">
      <ClientProfile />

      <Search />

      {loading
        ? <Loading />
        : <ClientsList />
      }
    </div>  
  );
}

export default Clients;