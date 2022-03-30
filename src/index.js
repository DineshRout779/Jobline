import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppContextProvider } from './context/AppContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import CompanyDashboard from './pages/company/CompanyDashboard';
import ApplicantDashboard from './pages/applicant/ApplicantDashboard';
import CompanyDetails from './pages/company/CompanyDetails';
import CompanyLogin from './pages/company/CompanyLogin';
import CompanyRegister from './pages/company/CompanyRegister';
import ApplicantDetails from './pages/applicant/ApplicantDetails';
import ApplicantLogin from './pages/applicant/ApplicantLogin';
import ApplicantRegister from './pages/applicant/ApplicantRegister';
import AddJob from './pages/job/AddJob';
import Job from './pages/job/Job';
import Jobs from './pages/job/Jobs';

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<Welcome />} />
            <Route path='company'>
              <Route index element={<CompanyDashboard />} />
              <Route path=':id' element={<CompanyDetails />} />
              <Route path='login' element={<CompanyLogin />} />
              <Route path='register' element={<CompanyRegister />} />
            </Route>
            <Route path='applicant'>
              <Route index element={<ApplicantDashboard />} />
              <Route path=':id' element={<ApplicantDetails />} />
              <Route path='login' element={<ApplicantLogin />} />
              <Route path='register' element={<ApplicantRegister />} />
            </Route>
            <Route path='jobs'>
              <Route index element={<Jobs />} />
              <Route path=':id' element={<Job />} />
              <Route path='add' element={<AddJob />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
