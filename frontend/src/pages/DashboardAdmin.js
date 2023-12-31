import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyChart from './myChart';

const DashboardAdmin = () => {
  const [role, setRole] = useState(null);
  const [roleCapital, setRoleCapital] = useState(null);
  const history = useNavigate();
  const [jumlahUnggah, setJumlahUnggah] = useState('Load..');
  const [jumlahBelumUnggah, setJumlahBelumUnggah] = useState('Load..');
  const [jumlahBelumReview, setJumlahBelumReview] = useState('Load..');

  useEffect(() => {
    const role = localStorage.getItem('role');
    setRole(role);
    const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1);
    setRoleCapital(capitalizedRole);
    getCountKAK();
  }, []);

  const getCountKAK = () => {
    const jenis = "1"; // Set jenis based on your requirement

    if (role === "sekumbem") {
      jenis = "1";
    } else if (role === "admin") {
      jenis = "2";
    } else if (role === "kli") {
      jenis = "3";
    } else if (role === "wd3") {
      jenis = "4";
    }

    axios.post('/api/kak/detail/jumlah', { jenis })
      .then(response => {
        console.log(response.data);

        setJumlahUnggah(response.data.count_sudah);
        setJumlahBelumUnggah(response.data.count_belum);
        setJumlahBelumReview(response.data.count_review);

        // Perform actions with the received data
      })
      .catch(error => {
        console.error('Error fetching KAK data:', error);
      });
  };
  

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <h1 className="h3 mb-3"><strong>{roleCapital}</strong> Dashboard</h1>
        {role && role !== 'ormawa' &&
          <>
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Jumlah Ormawa Sudah Unggah KAK</h5>
                    <h1 className="mt-3 mb-1">{jumlahUnggah}</h1>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Jumlah Ormawa Belum Unggah KAK</h5>
                    <h1 className="mt-3 mb-1">{jumlahBelumUnggah}</h1>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Jumlah KAK Belum di Review</h5>
                    <h1 className="mt-3 mb-1">{jumlahBelumReview}</h1>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </div>
      {role && role !== 'ormawa' &&
      <>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <MyChart/>
            </div>
          </div>
        </div>
      </div>
      </> 
      }
    </main>
  );
};

export default DashboardAdmin;
