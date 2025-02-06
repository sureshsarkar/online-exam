//Main.js

import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DataTable from "react-data-table-component";
const Manage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  // Table columns
  const columns = [
    // { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Course Name", selector: (row) => row.coursename, sortable: true }, 
    { name: "Status", selector: (row) => (row.status==1 ? "Active" : "Inactive"), sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex">
          <a href={`/courses/view/${row.id}`}>
            <button className="btn btn-voilate m-1" title="View">
            <i className="bi bi-eye"></i>
            </button>
          </a>
          <a href={`/courses/edit/${row.id}`}>
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
  if (!window.confirm("Are you sure you want to delete this employee?")) return;
  setLoading(true);
  try {
    const { data } = await axios.delete(`/api/course/delete/${id}`);
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
      const { data } = await axios.get("/api/course/get-all");
console.log(data);

      if (data?.success) {
        setRecords(data?.course);

        const formattedData = data.course.map((course, index) => ({
          id: course._id,
          coursename: course.coursename,
          status: course.status
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
          <h1 className="recent-Articles"><i className="bi bi-bookshelf"></i> Courses</h1>
          <a href="/courses/add">
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