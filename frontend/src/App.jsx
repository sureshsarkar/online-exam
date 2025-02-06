import { useState } from 'react'
import './App.css'
import { Dashboard } from './admin/pages/Dashboard'
import { Login } from './admin/pages/Login'
import Nav from './admin/includes/Nav'
import Header from './admin/includes/Header'
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import   Students  from './admin/pages/students/Manage';
import   AddStudents   from './admin/pages/students/Add';
import   EditStudents   from './admin/pages/students/Edit';
import   ViewStudents   from './admin/pages/students/View';

import   Subjects  from './admin/pages/subjects/Manage';
import   AddSubject   from './admin/pages/subjects/Add';
import   EditSubject   from './admin/pages/subjects/Edit';
import   ViewSubject   from './admin/pages/subjects/View';

import   Courses  from './admin/pages/courses/Manage';
import   AddCourse   from './admin/pages/courses/Add';
import   EditCourse   from './admin/pages/courses/Edit';
import   ViewCourse   from './admin/pages/courses/View';


import   Questions  from './admin/pages/questions/Manage';
import   AddQuestion   from './admin/pages/questions/Add';
import   EditQuestion   from './admin/pages/questions/Edit';
import   ViewQuestion   from './admin/pages/questions/View';


import   Exams  from './admin/pages/exams/Manage';
import   AddExam   from './admin/pages/exams/Add';
import   EditExam   from './admin/pages/exams/Edit';
import   ViewExam   from './admin/pages/exams/View';


function App() {

  return (
    <Router>
      <Header/>
      <div className="main-container">
      <Nav/>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/add" element={<AddStudents />} />
          <Route path="/students/edit/:id" element={<EditStudents />} />
          <Route path="/students/view/:id" element={<ViewStudents />} />

          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/add" element={<AddSubject/>} />
          <Route path="/subjects/edit/:id" element={<EditSubject />} />
          <Route path="/subjects/view/:id" element={<ViewSubject />} />

          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/add" element={<AddCourse/>} />
          <Route path="/courses/edit/:id" element={<EditCourse />} />
          <Route path="/courses/view/:id" element={<ViewCourse />} />

          <Route path="/questions" element={<Questions/>} />
          <Route path="/questions/add" element={<AddQuestion/>} />
          <Route path="/questions/edit/:id" element={<EditQuestion />} />
          <Route path="/questions/view/:id" element={<ViewQuestion />} />

          <Route path="/exams" element={<Exams/>} />
          <Route path="/exams/add" element={<AddExam/>} />
          <Route path="/exams/edit/:id" element={<EditExam/>} />
          <Route path="/exams/view/:id" element={<ViewExam/>} />
      </Routes>
      </div>
      </Router>
  )
}

export default App
