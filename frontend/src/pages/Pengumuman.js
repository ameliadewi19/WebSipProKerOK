import React, { useState, useEffect } from 'react';
import axios from 'axios';
import feather from 'feather-icons';
import Swal from 'sweetalert2';
import TambahPengumumanModal from '../components/Modals/TambahPengumumanModal.js';

const Pengumuman = () => {
    const [pengumuman, setPengumuman] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        feather.replace(); // Replace the icons after component mounts
        fetchPengumuman();
    }, []);

    const fetchPengumuman = async () => {
        try {
            const res = await axios.get('/api/pengumuman');
            setPengumuman(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleUpdate = (id) => {

    };

    const handleDelete = async (id) => {
      try {
          // Show a confirmation dialog using SweetAlert
          const confirmDelete = await Swal.fire({
              title: 'Are you sure?',
              text: 'You will not be able to recover this pengumuman!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, delete it!'
          });
  
          // If the user confirms the deletion
          if (confirmDelete.isConfirmed) {
              // Send a DELETE request to your API endpoint
              await axios.delete(`/api/pengumuman/${id}`);
  
              // Handle the successful deletion, e.g., update the state or show a success message
              console.log(`Pengumuman with id ${id} deleted successfully`);
  
              // Fetch updated data after deletion
              fetchPengumuman();
  
              // Show a success message
              Swal.fire('Deleted!', 'Pengumuman has been deleted.', 'success');
          }
      } catch (error) {
          // Handle errors, e.g., show an error message
          console.error(`Error deleting pengumuman with id ${id}:`, error);
  
          // Show an error message
          Swal.fire('Error', 'Failed to delete pengumuman.', 'error');
      }
    };
  

    return (
        <main className="content">
            <div className="container-fluid p-0">

                <h1 className="h3 mb-3"><strong>Pengumuman</strong></h1>

                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="card-title">Pengumuman</h5>
                                <button className="btn btn-primary mt-2" onClick={handleShowModal} data-bs-toggle="modal" data-bs-target="#addPengumumanModal">
                                    <i className="align-middle" data-feather="plus"></i> <span className="align-middle">Tambah Pengumuman</span>
                                </button>
                                {/* Add your Tambah Pengumuman modal component here */}
                                <TambahPengumumanModal showModal={showModal} setShowModal={setShowModal} fetchPengumuman={fetchPengumuman}/>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Slug</th>
                                                <th>Judul Konten</th>
                                                <th>Isi Konten</th>
                                                <th>Gambar</th>
                                                <th>Tanggal</th>
                                                <th>Action</th>
                                                {/* Add more table headers as needed */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pengumuman.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.slug}</td>
                                                    <td>{item.judul_konten}</td>
                                                    <td>{item.isi_konten}</td>
                                                    <td>{item.gambar}</td>
                                                    <td>{new Date(item.tanggal).toLocaleDateString('id-ID', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-sm btn-primary" onClick={() => handleUpdate(item.id_pengumuman)}>Update</button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id_pengumuman)}>Delete</button>
                                                    </td>
                                                    {/* Add more table data cells as needed */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Pengumuman;
