import React, { useState, useEffect } from 'react';
import axios from 'axios';
import feather from 'feather-icons';
import 'bootstrap/dist/js/bootstrap.bundle';
import FileKAKModal from '../components/Modals/FileKAKModal';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'simple-datatables';
import FileRABModal from '../components/Modals/FileRABModal';

// Using Arrow Function
const KAK = () => {

    const navigate = useNavigate();
    const [role, setRole] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [fileData, setFileData] = useState(null);

    const [dataKak, setDataKak] = useState([]);
    const [isDataAvailable, setIsDataAvailable] = useState(false);

    const [idUser, setIdUser] = useState(null);
    const [idKetua, setIdKetua] = useState(null);

    useEffect(() => {
        feather.replace(); // Replace the icons after component mounts
        const role = localStorage.getItem('role');
        const idUser = localStorage.getItem('idUser');
        setIdUser(idUser);
        console.log("idUser:", idUser);
        setRole(role);
        fetchOrmawa(idUser);
        fetchDataKAK();
    }, [idKetua]);

    const fetchOrmawa = (id) => {
        console.log("idUser fetchormawa:", id);
        axios.get(`/api/auth/get-ketua/${id}`)
            .then((res) => {
                setIdKetua(res.data.data.id_ketua);
            })
            .catch((err) => {
                console.log(err);
            });
        
        console.log("idKetua ormawa:", idKetua);
    }

    const fetchDataKAK = () => {
        console.log("idKetua:", idKetua);
        axios.get(`/api/kak/`)
        .then((res) => {
            const data = res.data.filter((kak) => kak.id_ketua === idKetua);
            setDataKak(data);
            console.log(data);
            setIsDataAvailable(data.length > 0);
        })
        .catch((err) => {
            console.log(err);
        });
        console.log(dataKak);
    }

    useEffect(() => {
        if (dataKak.length > 0) {
            const table = new DataTable('.datatable', {
                columns : [
                    { select : 4, sortable : false },
                ]
            });
        }
    }, [dataKak]);

    const handleShowModal = async (file) => {
        setFileData(file);
        // Tampilkan modal
        setShowModal(true);
    };

    const handleUpload = () => {
        navigate('/upload-kak');
    };

    const handleEdit = (idKak) => {
        navigate(`/edit-kak/${idKak}`);
    };

    return (
      <main class="content">
        <div class="container-fluid p-0">

          <h1 class="h3 mb-3">Pengajuan<strong> KAK</strong></h1>

          <div className="row">
            <div className="col-xl-12">
                <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="card-title">KAK</h5>
                    <button class="btn btn-primary mt-2" onClick={handleUpload} disabled={isDataAvailable}><i className='bi-upload'></i> <span className="align-middle">Upload KAK</span></button>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                    <table className="table datatable table-striped">
                        <thead>
                        <tr>
                            <th scope='col'>Dokumen KAK</th>
                            <th scope='col'>Dokumen RAB</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Catatan</th>
                            <th scope='col'>Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                            {dataKak.map((kak) =>(
                                <tr key={kak.id_kak}>
                                    <td>
                                        <a onClick={() => handleShowModal(kak.file_kak)} data-bs-toggle="modal" data-bs-target="#FileKAKModal" href='#'>
                                            Dokumen KAK
                                        </a>
                                        <FileKAKModal pdfData={fileData} showModal={showModal} setShowModal={setShowModal} />
                                    </td>
                                    <td>
                                        <a onClick={() => handleShowModal(kak.file_rab)} data-bs-toggle="modal" data-bs-target="#FileRABModal" href='#'>
                                            Dokumen RAB
                                        </a>
                                        <FileRABModal pdfData={fileData} showModal={showModal} setShowModal={setShowModal} />
                                    </td>
                                    <td>{kak.status}</td>
                                    <td>{kak.catatan}</td>
                                    <td>
                                        <button class="btn btn-primary mt-2" onClick={() => handleEdit(kak.id_kak)} style={{marginRight: '5px'}}><i className='bi-pencil-square'></i></button>
                                    </td>
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

export default KAK;
