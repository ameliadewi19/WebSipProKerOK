import React, { useState, useRef } from 'react';
import axios from 'axios';

const TambahKetuaOrmawaModal = ({ showModal, setShowModal, reloadData }) => {
  const [formData, setFormData] = useState({
    nim_ketua: '',
    nama_ketua: '',
    tahun_jabatan: '',
    email_pengguna: '',
    id_pengguna: '',
    id_ormawa: '',
  });
  const modalRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/ketua-ormawa', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error submitting acc:', error);
      });

    modalRef.current.click();
    reloadData();
  };

  return (
    <div className={`modal fade`} id="addAkunModal" tabIndex="-1" aria-labelledby="addAkunModalLabel" aria-hidden={!showModal}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addAkunModalLabel">Tambah Ormawa</h5>
            <button type="button" className="d-none" ref={modalRef} data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="nimKetua" className="form-label">NIM Ketua</label>
                <input
                  type="text"
                  className="form-control"
                  id="nimKetua"
                  name="nim_ketua"
                  placeholder="NIM Ketua"
                  value={formData.nim_ketua}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="namaKetua" className="form-label">Nama Ketua</label>
                <input
                  type="text"
                  className="form-control"
                  id="namaKetua"
                  name="nama_ketua"
                  placeholder="Nama Ketua"
                  value={formData.nama_ketua}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tahunJabatan" className="form-label">Tahun Jabatan</label>
                <input
                  type="text"
                  className="form-control"
                  id="tahunJabatan"
                  name="tahun_jabatan"
                  placeholder="Tahun Jabatan"
                  value={formData.tahun_jabatan}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="emailKetua" className="form-label">Email Ketua</label>
                <input
                  type="text"
                  className="form-control"
                  id="emailKetua"
                  name="email_ketua"
                  placeholder="Email Ketua"
                  value={formData.email_ketua}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="idPengguna" className="form-label">ID Pengguna</label>
                <input
                  type="text"
                  className="form-control"
                  id="idPengguna"
                  name="id_pengguna"
                  placeholder="ID Pengguna"
                  value={formData.id_pengguna}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="idOrmawa" className="form-label">ID Ormawa</label>
                <input
                  type="text"
                  className="form-control"
                  id="idOrmawa"
                  name="id_ormawa"
                  placeholder="ID Ormawa"
                  value={formData.id_ormawa}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Tutup</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Simpan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahKetuaOrmawaModal;
