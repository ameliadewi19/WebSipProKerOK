import React, { useState, useEffect, Profiler } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import axios from 'axios'; // Add this line
import { useNavigate } from 'react-router-dom';

import Sidebar from './components/Sidebar.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

import Login from './pages/Login.js';
import Pergerakan from './pages/Pergerakan.js';
import PergerakanAdmin from './pages/PergerakanAdmin.js';
import Dashboard from './pages/Dashboard.js';
import DashboardAdmin from './pages/DashboardAdmin.js';
import KAK from './pages/KAK.js';
import KAKAdmin from './pages/KAKAdmin.js';
import ProgramKerja from './pages/ProgramKerja.js';
import ProgramKerjaAdmin from './pages/ProgramKerjaAdmin.js';
import Timeline from './pages/Timeline.js';
import Pengumuman from './pages/Pengumuman.js';
import KalenderAkademik from './pages/KalenderAkademik.js';
import UploadKAK from './components/SubMenu/UploadKAK.js';
import LPJ from './pages/LPJ.js';
import LPJAdmin from './pages/LPJAdmin.js';
import Ormawa from './pages/Ormawa.js';
import KelolaAkun from './pages/KelolaAkun.js';
import KetuaOrmawa from './pages/KetuaOrmawa.js';
import Profil from './pages/Profil.js';
import EditKAK from './components/SubMenu/EditKAK.js';
import Landing from './pages/Landing.js';
import MorePengumuman from './pages/MorePengumuman.js';

import PeminjamanSarpras from './pages/PeminjamanSarpras.js';
import PengelolaanSarpras from './pages/PengelolaanSarpras.js';
import ListPengajuan from './pages/ListPengajuan.js';
import PengajuanSarpras from './components/SubMenu/PengajuanSarpras.js';
import ReviewPengajuan from './components/SubMenu/ReviewPengajuan.js';
import Sarpras from './pages/CardSarpras.js'

function checkAuthorization() {
  const token = localStorage.getItem('token');
  console.log("token lokal:", token);
  
  if (!token) {
    return false;
    }
    return true;
  }

  function checkRole() {
    const role = localStorage.getItem('role');
    console.log("role:", role);

    return role;
  }

  function ProtectedRoute({ children }) {

    const userHasAuthorization = checkAuthorization(); 

    if (!userHasAuthorization) {
      return <Navigate to={`/login`} />;
    }

    return children;
  }

function App() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // New state to track loading
  const [token, setToken] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }
  
  // const refreshAuthToken = async (e) => {
  //   try {  
  //     // Only attempt to refresh if there is a token
  //     if (e) {
  //       const response = await axios.post('/api/auth/refresh');
  //       const refreshedToken = response.data.access_token;
  
  //       localStorage.setItem('token', refreshedToken);
  //       axios.defaults.headers.common['Authorization'] = `Bearer ${refreshedToken}`;
  //       console.log("Token refreshed:", refreshedToken);
  //     }
  //   } catch (error) {
  //     console.error('Error refreshing token:', error);
  
  //     // If there is an error, or token is not available, handle the error or redirect to login
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('role');
  //     // Use the navigate function to perform the redirection if you are inside a component that has access to it
  //     return <Navigate to={`/`} />;
  //   }
  // };

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = checkRole();
      setUserRole(role);
      setLoading(false);
      setToken(localStorage.getItem('token'));

      // Call the refreshAuthToken function
      // await refreshAuthToken(token);
    };

    fetchUserRole();
  }, [token]);
  

  // Show loading indicator while waiting for userRole
  if (loading) {
    return <p></p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Landing />
          </>
        }/>
        <Route path="/pengumuman-more" element={
          <>
            <MorePengumuman />
          </>
        }/>
        <Route path="/login" element={
          <>
            <Login />
          </>
        }/>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <div className="wrapper">
              <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
                <Sidebar />
              </nav>
              <div className="main">
                <Navbar toggleSidebar={toggleSidebar}/>
                {userRole === 'ormawa' ? <Dashboard /> : <DashboardAdmin />}
                <Footer />
              </div>
            </div>
          </ProtectedRoute>
        }/>
        <Route path="/kak" element={
          <ProtectedRoute>
            <div className="wrapper">
              <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
                <Sidebar />
              </nav>
              <div className="main">
                <Navbar toggleSidebar={toggleSidebar}/>
                {userRole === 'ormawa' ? <KAK /> : <KAKAdmin />}
                <Footer />
              </div>
            </div>
          </ProtectedRoute>
        }/>
        <Route path="/program-kerja" element={
          <ProtectedRoute>
            <div className="wrapper">
              <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
                <Sidebar />
              </nav>
              <div className="main">
                <Navbar toggleSidebar={toggleSidebar}/>
                {userRole === 'ormawa' ? <ProgramKerja /> : <ProgramKerjaAdmin />}
                <Footer />
              </div>
            </div>
          </ProtectedRoute>
        }/>
        <Route path="/lpj" element={
          <ProtectedRoute>
            <div className="wrapper">
              <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
                <Sidebar />
              </nav>
              <div className="main">
                <Navbar toggleSidebar={toggleSidebar}/>
                {userRole === 'ormawa' ? <LPJ /> : <LPJAdmin />}
                <Footer />
              </div>
            </div>
          </ProtectedRoute>
        }/>
        <Route path="/pergerakan" element={
          <ProtectedRoute>
            <div className="wrapper">
              <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
                <Sidebar />
              </nav>
              <div className="main">
                <Navbar toggleSidebar={toggleSidebar}/>
                {userRole === 'ormawa' ? <Pergerakan /> : <PergerakanAdmin />}
                <Footer />
              </div>
            </div>
          </ProtectedRoute>
        }/>
        <Route path="/timeline" element={
          <div className="wrapper">
            <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
              <Sidebar />
            </nav>
            <div className="main">
              <Navbar toggleSidebar={toggleSidebar}/>
              <Timeline />
              <Footer />
            </div>
          </div>
        }/>
        <Route path="/pengumuman" element={
          <div className="wrapper">
            <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
              <Sidebar />
            </nav>
            <div className="main">
              <Navbar toggleSidebar={toggleSidebar}/>
              <Pengumuman />
              <Footer />
            </div>
          </div>
        }/>
        <Route path="/kalender-akademik" element={
          <div className="wrapper">
            <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
              <Sidebar />
            </nav>
            <div className="main">
              <Navbar toggleSidebar={toggleSidebar}/>
              <KalenderAkademik />
              <Footer />
            </div>
          </div>
        }/>
        <Route path="/ormawa" element={
          <div className="wrapper">
            <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
              <Sidebar />
            </nav>
            <div className="main">
              <Navbar toggleSidebar={toggleSidebar}/>
              <Ormawa />
              <Footer />
            </div>
          </div>
        }/>
        <Route path="/upload-kak" element={
          <div className="wrapper">
            <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
              <Sidebar />
            </nav>
            <div className="main">
              <Navbar toggleSidebar={toggleSidebar}/>
              <UploadKAK />
              <Footer />
            </div>
          </div>
        }/>
        <Route path="/kelola-akun" element={
          <div className="wrapper">
            <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
              <Sidebar />
            </nav>
            <div className="main">
              <Navbar toggleSidebar={toggleSidebar}/>
              <KelolaAkun />
              <Footer />
            </div>
          </div>
        }/>
        <Route path="/profil" element={
          <div className="wrapper">
            <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
              <Sidebar />
            </nav>
            <div className="main">
              <Navbar toggleSidebar={toggleSidebar}/>
              <Profil />
              <Footer />
            </div>
          </div>
        }/>
        
        <Route path="/edit-kak/:kakId" element={
          <div className="wrapper">
            <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
              <Sidebar />
            </nav>
            <div className="main">
              <Navbar toggleSidebar={toggleSidebar}/>
              <EditKAK />
              <Footer />
            </div>
          </div>
        }/>

        <Route path="/ketua-ormawa" element={
          <div className="wrapper">
            <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
              <Sidebar />
            </nav>
            <div className="main">
              <Navbar toggleSidebar={toggleSidebar}/>
              <KetuaOrmawa />
              <Footer />
            </div>
          </div>
        }/>

<Route path="/peminjaman-sarpras" element={
          <ProtectedRoute>
            <div className="wrapper">
              <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
                <Sidebar />
              </nav>
              <div className="main">
                <Navbar toggleSidebar={toggleSidebar}/>
                <PeminjamanSarpras />
                <Footer />
              </div>
            </div>
          </ProtectedRoute>
      }/>

      <Route path="/pengelolaan-sarana-prasarana" element={
          <ProtectedRoute>
            <div className="wrapper">
              <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
                <Sidebar />
              </nav>
              <div className="main">
                <Navbar toggleSidebar={toggleSidebar}/>
                <PengelolaanSarpras />
                <Footer />
              </div>
            </div>
          </ProtectedRoute>
      }/>

      <Route path="/peminjaman-sarpras-pengajuan" element={
          <ProtectedRoute>
            <div className="wrapper">
              <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
                <Sidebar />
              </nav>
              <div className="main">
                <Navbar toggleSidebar={toggleSidebar}/>
                <PengajuanSarpras />
                <Footer />
              </div>
            </div>
          </ProtectedRoute>
      }/>

      <Route path="/review-pengajuan" element={
          <ProtectedRoute>
            <div className="wrapper">
              <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
                <Sidebar />
              </nav>
              <div className="main">
                <Navbar toggleSidebar={toggleSidebar}/>
                <ReviewPengajuan />
                <Footer />
              </div>
            </div>
          </ProtectedRoute>
      }/>

      <Route path="/list-pengajuan" element={
          <ProtectedRoute>
            <div className="wrapper">
              <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
                <Sidebar />
              </nav>
              <div className="main">
                <Navbar toggleSidebar={toggleSidebar}/>
                <ListPengajuan />
                <Footer />
              </div>
            </div>
          </ProtectedRoute>
      }/>

      <Route path="/sarpras" element={
          <ProtectedRoute>
            <div className="wrapper">
              <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
                <Sidebar />
              </nav>
              <div className="main">
                <Navbar toggleSidebar={toggleSidebar}/>
                <Sarpras />
                <Footer />
              </div>
            </div>
          </ProtectedRoute>
      }/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App; 

