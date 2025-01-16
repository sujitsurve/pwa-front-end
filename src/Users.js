import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
// import swDev from './swDev';

export default function Users() {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState('online');

  useEffect(() => {
    let url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)?.then((response) => {
      response.json().then((result) => {
        setData(result);
        localStorage.setItem("users", JSON.stringify(result));
      });
    }).catch(err => {
      setMode('offline');
      let collection = localStorage.getItem('users');
      setData(JSON.parse(collection));
    });

    // Call the function to handle push notifications
    // swDev();
  }, []);

  return (
    <div>
      {mode === 'offline' && (
        <div className="alert alert-warning" role="alert">
          You are in offline mode or there is some issue with your connection.
        </div>
      )}
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id a</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.address.street}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
