import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [{
        id: 1,
        title: 'Salário dev',
        type: 'deposit',
        category: 'Salário',
        amount: 6000,
        createdAt: new Date('2022-06-04 10:00:00'),
      }, {
        id: 2,
        title: 'Contas',
        type: 'withdraw',
        category: 'Despesas',
        amount: 600,
        createdAt: new Date('2022-06-05 1:00:00'),
      }]
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);