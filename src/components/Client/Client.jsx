import React from 'react';

import'./styles.css';

function Client({ client }) {
  return (
    <div className="client">
      <h3 className="client__name">{client.name}</h3>
    </div>
  );
}

export default Client;