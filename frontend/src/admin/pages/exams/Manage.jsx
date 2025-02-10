//Main.js

import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DataTable from "react-data-table-component";
import { useAuth } from '../../../auth/AuthProvider';


const Manage = ({getRole,roleAuth}) => {
const [records, setRecords] = useState([]);
const [loading, setLoading] = useState(false);
const { token } = useAuth();


    useEffect(() => {
        getRole();
    }, [roleAuth])

  // Table columns
  const columns = [
    // { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Student Name", selector: (row) => row.studentid, sortable: true }, 
    { name: "Marks", selector: (row) => row.totalmarks, sortable: true }, 
    { name: "Total Question", selector: (row) => row.totalquestion, sortable: true }, 
   { 
  name: "Status", 
  selector: (row) => row.status, 
  sortable: true,
  cell: (row) => (
    <span className={`badge ${row.status === 'Pass' ? 'bg-success' : 'bg-danger'}`}>
      {row.status}
    </span>
  )
},
 
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex">
          <a href={`/exams/view/${row.id}`}>
            <button className="btn btn-voilate m-1" title="View">
            <i className="bi bi-eye"></i>
            </button>
          </a>
         {roleAuth &&
          <button
            onClick={() => handleDeleteSubject(row.id)}
            className="btn btn-danger m-1"
            title="Delete"
            disabled={loading}
          >
           {loading ? "..." : <i className="bi bi-trash2"></i>}
          </button>
        }
        </div>
      ),
    },
  ];

  
  // Delete employee function

const handleDeleteSubject = async (id) => {
  if (!window.confirm("Are you sure you want to delete this employee?")) return;
  setLoading(true);
  try {
    const { data } = await axios.delete(`/api/exam/delete/${id}`);
    if (data?.success) {
      toast.success(data.message);
      const courseData = records.filter(cid => cid.id !== id); 
      setRecords(courseData);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Failed to delete course");
  } finally {
    setLoading(false);
  }
};

//  get all the student list 

  const fetchAllStudent = async () => {
    try {
      const { data } = await axios.get("/api/exam/get-all");

      if (data?.success) {
        setRecords(data?.exam);

        const formattedData = data.exam.map((exam, index) => ({
          id: exam._id,
          studentid: exam.studentid.name,
          totalquestion: exam.totalquestion,
          totalmarks: exam.totalmarks,
          status: exam.totalmarks*100/exam.totalquestion >= 33.33 ? 'Pass' : 'Fail'
        }));
        // setstudentsData(formattedData);
        setRecords(formattedData);  // Initialize records with fetched data


      }

    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    fetchAllStudent();

  }, []);
  return (
    <div className="main">
      <div className="report-container">
        <div className="report-header">
          <h1 className="recent-Articles"><i className="bi bi-pc-display"></i> Exams</h1>
          <a href="/exams/add">
            <button className="btn-voilate"><i className="bi bi-plus-lg"></i> Start</button>
          </a>
        </div>

        <div className="report-body">
      

              <DataTable
              columns={columns}
              data={records}
              selectableRows
              fixedHeader
              pagination
            />

          {/* </div> */} 
        </div>
      </div>
    </div>
  );
};

export default Manage;