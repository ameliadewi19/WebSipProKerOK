import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Using Arrow Function
const Dashboard = () => {
    const [role, setRole] = useState(null);
    const [roleCapital, setRoleCapital] = useState(null);
    const history = useNavigate();
    const [status, setStatus] = useState('Load..');
    const [proker, setProker] = useState('Load..');

    useEffect(() => {
      const role = localStorage.getItem('role');
      setRole(role);
      const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1);
      setRoleCapital(capitalizedRole);
      getDetail();
    }, []);

    const getDetail = () => {
      const id = "1"; // Set jenis based on your requirement

      axios.post('/api/kak/detail/ormawa', { id })
          .then(response => {
              console.log(response.data);
  
              setStatus(response.data.status);
              setProker(response.data.count_proker);

              // Perform actions with the received data
          })
          .catch(error => {
              console.error('Error fetching KAK data:', error);
          });
    };

    // Function to determine the Bootstrap class based on the status
    const getStatusClass = () => {
      if (status.includes('Acc')) {
        return 'text-success';
      } else if (status.includes('Tolak')) {
        return 'text-danger';
      } else if (status.includes('Revisi')) {
        return 'text-warning';
      } else {
        return ''; // Default class or no class
      }
    };

    return (
      <main class="content">
        <div class="container-fluid p-0">
          <h1 class="h3 mb-3"><strong>{roleCapital}</strong> Dashboard</h1>
          {role && role === 'ormawa' &&
            <>
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Status Pengajuan KAK</h5>
                    <h1 className={`mt-3 mb-1 ${getStatusClass()}`}>
                      {status}
                    </h1>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Jumlah Proker Diajukan</h5>
                    <h1 class="mt-3 mb-1">{proker}</h1>
                  </div>
                </div>
              </div>
            </div>
            </>
          }
        </div>
      </main>
    );
};

export default Dashboard;
