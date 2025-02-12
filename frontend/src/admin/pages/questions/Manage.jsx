//Main.js

import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DataTable from "react-data-table-component";
const Manage = () => {
  const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  // Table columns
  const columns = [
    // { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Question", selector: (row) => row.questiontext, sortable: true }, 
    { name: "Course Name", selector: (row) => row.coursename, sortable: true }, 
    { name: "Subject Name", selector: (row) => row.subjectname, sortable: true }, 
    { name: "Status", selector: (row) => (row.status==1 ? "Active" : "Inactive"), sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex">
          <a href={`/questions/view/${row.id}`}>
            <button className="btn btn-voilate m-1" title="View">
            <i className="bi bi-eye"></i>
            </button>
          </a>
          <a href={`/questions/edit/${row.id}`}>
            <button className="btn btn-primary m-1" title="Edit">
            <i className="bi bi-pencil-square"></i>
            </button>
          </a>
          <button
            onClick={() => handleDeleteSubject(row.id)}
            className="btn btn-danger m-1"
            title="Delete"
            disabled={loading}
          >
           {loading ? "..." : <i className="bi bi-trash2"></i>}
          </button>
        </div>
      ),
    },
  ];

  
  // Delete employee function

const handleDeleteSubject = async (id) => {
  if (!window.confirm("Are you sure you want to delete this question?")) return;
  setLoading(true);
  try {
    const { data } = await axios.delete(`${BACKEND_BASE_URL}/api/question/delete/${id}`);
    if (data?.success) {
      toast.success(data.message);
      const studentData = records.filter(std => std.id !== id);
      // setEmployeeData(updatedEmployees);
      setRecords(studentData);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Failed to delete student");
  } finally {
    setLoading(false);
  }
};

//  get all the student list 

  const fetchAllQuestion = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_BASE_URL}/api/question/get-all`);
      
      if (data?.success) {

        const formattedData = data.question.map((question) => ({
          id: question._id,
          questiontext: question.questiontext,
          coursename: question.courseDetails.length > 0 ? question.courseDetails[0].coursename : "N/A",
          subjectname: question.subjectDetails.length > 0 ? question.subjectDetails[0].subjectname : "N/A",
          status: question.status,
        }));
        setRecords(formattedData);  // Initialize records with fetched data
      }

    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    fetchAllQuestion();

  }, []);
  return (
    <div className="main">
      <div className="report-container">
        <div className="report-header">
          <h1 className="recent-Articles"><i className="bi bi-journal-text"></i> Questions</h1>
          <a href="/questions/add">
            <button className="btn-voilate"><i className="bi bi-plus-lg"></i> Add</button>
          </a>
        </div>

        <div className="report-body">
          {/* <div className="report-topic-heading">
            <h3 className="t-op">S.N</h3>
            <h3 className="t-op">Name</h3>
            <h3 className="t-op">Email</h3>
            <h3 className="t-op">Mobile</h3>
            <h3 className="t-op">Status</h3>
            <h3 className="t-op">Action</h3>
          </div> */}

          {/* <div className="items"> */}

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