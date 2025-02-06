//Main.js

import React, {useState,useEffect } from 'react';
import DataTable from "react-data-table-component";
import toast from 'react-hot-toast';
import axios from 'axios';
export const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  // Table columns
  const columns = [
    // { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true,
      cell: (row) => (
        <div title={row.email} className="emailCell">
          {row.email}
        </div>
      ),
     },
    { name: "Mobile", selector: (row) => row.mobile, sortable: true },
    // { name: "Role", selector: (row) => row.role==1? "Employee": row.role==2 ? "Project Manager"  : row.role==3 ? "SEO Manager" : row.role==4 ? "Development Manager" : "Admin", sortable: true },
    { name: "Status", selector: (row) => (row.status==1 ? "Active" : "Inactive"), sortable: true },
    // { name: "Created", selector: (row) => row.createdAt, sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex">
          <a href={`/students/view/${row.id}`}>
            <button className="btn btn-voilate m-1" title="View">
            <i className="bi bi-eye"></i>
            </button>
          </a>
          <a href={`/students/edit/${row.id}`}>
            <button className="btn btn-primary m-1" title="Edit">
            <i className="bi bi-pencil-square"></i>
            </button>
          </a>
          <button
            onClick={() => handleDeleteStudent(row.id)}
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

const handleDeleteStudent = async (id) => {
  if (!window.confirm("Are you sure you want to delete this employee?")) return;
  setLoading(true);
  try {
    const { data } = await axios.delete(`/api/student/delete/${id}`);
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

  const fetchAllStudent = async () => {
    try {
      const { data } = await axios.get("/api/student/get-all");
console.log(data);

      if (data?.success) {
        setRecords(data?.students);

        const formattedData = data.students.map((students, index) => ({
          id: students._id,
          name: students.name,
          email: students.email,
          mobile: students.mobile,
          status: students.status
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
      <div className="searchbar2">
        <input type="text" name="" id="" placeholder="Search" />
        <div className="searchbtn">
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
            className="icn srchicn"
            alt="search-button"
          />
        </div>
      </div>

      <div className="box-container">
        <div className="box box1">
          <div className="text">
            <h2 className="topic-heading">60.5k</h2>
            <h2 className="topic">Article Views</h2>
          </div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(31).png"
            alt="Views"
          />
        </div>

        <div className="box box2">
          <div className="text">
            <h2 className="topic-heading">150</h2>
            <h2 className="topic">Likes</h2>
          </div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210185030/14.png"
            alt="likes"
          />
        </div>

        <div className="box box3">
          <div className="text">
            <h2 className="topic-heading">320</h2>
            <h2 className="topic">Comments</h2>
          </div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(32).png"
            alt="comments"
          />
        </div>

        <div className="box box4">
          <div className="text">
            <h2 className="topic-heading">70</h2>
            <h2 className="topic">Published</h2>
          </div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210185029/13.png"
            alt="published"
          />
        </div>
      </div>

      <div className="report-container">
        <div className="report-header">
          <h1 className="recent-Articles"><i className="bi bi-people"></i> Stutents</h1>
          <button className="view">View All</button>
        </div>

        <div className="report-body">
        <DataTable
              columns={columns}
              data={records}
              selectableRows
              fixedHeader
              pagination
            />
        </div>
      </div>
    </div>
  );
};

