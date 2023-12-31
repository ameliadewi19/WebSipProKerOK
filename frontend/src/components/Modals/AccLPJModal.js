import React, { useState, useRef, useEffect  } from 'react';
import axios from 'axios';

const AccLPJModal = ({ showModal, setShowModal, handleSubmit, selectedLPJId, selectedStatus, reloadData }) => {
    const [catatan, setCatatan] = useState('');
    const [tahap, setTahap] = useState('');
    const role = localStorage.getItem('role');
    const modalRef = useRef();

    console.log(selectedLPJId);

    const handleCatatanChange = (e) => {
        setCatatan(e.target.value);
    }

    const handleAccSubmit = (e) => {
        e.preventDefault();
        let tahapValue; // Define a variable to store the value of tahap
    
        if (role === "sekumbem") {
            tahapValue = 1;
        } else if (role === "admin") {
            tahapValue = 2;
        } else if (role === "kli") {
            tahapValue = 3;
        } else if (role === "wd3") {
            tahapValue = 4;
        }
    
        console.log("Tahap: ", tahapValue);
        axios.post('/api/lpj/verifikasi/acc', {
            id_lpj: selectedLPJId,
            catatan: catatan,
            tahap: tahapValue // Use the updated value
        })
        .then((response) => {
            console.log(response.data.message);
            // setShowModal(false);
            modalRef.current.click();
            reloadData(); 
        })
        .catch((error) => {
            console.error('Error submitting acc:', error);
        });
        // setShowModal(false); // Tutup modal setelah berhasil mengirim formulir
        modalRef.current.click();
        reloadData(); 
    }

    const handleRevisiSubmit = (e) => {
        e.preventDefault();
        let tahapValue; // Define a variable to store the value of tahap
    
        if (role === "sekumbem") {
            tahapValue = 1;
        } else if (role === "admin") {
            tahapValue = 2;
        } else if (role === "kli") {
            tahapValue = 3;
        } else if (role === "wd3") {
            tahapValue = 4;
        }
    
        console.log("Tahap: ", tahapValue);
        axios.post('/api/lpj/verifikasi/revisi', {
            id_lpj: selectedLPJId,
            catatan: catatan,
            tahap: tahapValue // Use the updated value
        })
        .then((response) => {
            console.log(response.data.message);
            modalRef.current.click();
            reloadData(); 
        })
        .catch((error) => {
            console.error('Error submitting acc:', error);
        });
        modalRef.current.click();
        reloadData();  // Tutup modal setelah berhasil mengirim formulir
    }

    const handleTolakSubmit = (e) => {
        e.preventDefault();
        let tahapValue; // Define a variable to store the value of tahap
    
        if (role === "sekumbem") {
            tahapValue = 1;
        } else if (role === "admin") {
            tahapValue = 2;
        } else if (role === "kli") {
            tahapValue = 3;
        } else if (role === "wd3") {
            tahapValue = 4;
        }
    
        console.log("Tahap: ", tahapValue);
        axios.post('/api/lpj/verifikasi/tolak', {
            id_lpj: selectedLPJId,
            catatan: catatan,
            tahap: tahapValue // Use the updated value
        })
        .then((response) => {
            console.log(response.data.message);
            modalRef.current.click();
            reloadData(); 
        })
        .catch((error) => {
            console.error('Error submitting acc:', error);
        });
        modalRef.current.click();
        reloadData();  // Tutup modal setelah berhasil mengirim formulir
    }
    

    const renderButton = () => {
        if (selectedStatus === 'acc') {
            return (
                <button type="submit" className="btn btn-primary">Konfirmasi Acc</button>
            );
        } else if (selectedStatus === 'revisi') {
            return (
                <button type="submit" className="btn btn-primary">Konfirmasi Revisi</button>
            );
        } else if (selectedStatus === 'tolak') {
            return (
                <button type="submit" className="btn btn-primary">Konfirmasi Tolak</button>
            );
        }
    
        return null; 
    }
    
    const getSubmitFunction = () => {
        if (selectedStatus === 'acc') {
            return handleAccSubmit;
        } else if (selectedStatus === 'revisi') {
            return handleRevisiSubmit;
        } else if (selectedStatus === 'tolak') {
            return handleTolakSubmit;
        }
    }
    
    return (
        <div className={`modal fade ${showModal ? 'show' : ''} mt-5`} id="pesanModal" tabIndex="-1" aria-labelledby="pesanModalLabel" aria-hidden={!showModal}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="pesanModalLabel">Masukan Catatan untuk LPJ</h5>
                        
                        <button type="button" className="btn-close" ref={modalRef} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h6>Status : {selectedStatus}</h6>
                        <form onSubmit={getSubmitFunction()}>
                            <div className="mb-3">
                                <label htmlFor="catatan" className="form-label">Catatan</label>
                                <textarea
                                    className="form-control"
                                    id="catatan"
                                    value={catatan}
                                    onChange={handleCatatanChange}
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                                {renderButton()}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccLPJModal;
