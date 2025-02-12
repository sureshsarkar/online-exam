//Main.js

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const Edit = () => {
  const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(0);
  const [courses,setCourses] = useState([]);
  const [subjects,setSubjects] = useState([]);
  const [inputs ,setInputs] = useState({
    questiontext: "",
      subjectid: "",
      courseid: "",
      status: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctoption: "",
  });

  const getQuestionById = async()=>{
    try {
      const {data} = await axios.put(`${BACKEND_BASE_URL}/api/question/edit/${id}`);
      
      if(data?.success){
        setInputs({
          questiontext: data.question.questiontext,
          subjectid: data.question.subjectid,
          courseid: data.question.courseid,
          option1: data.question.option1,
          option2: data.question.option2,
          option3: data.question.option3,
          option4: data.question.option4,
          correctoption: data.question.correctoption,
          status: data.question.status,
          
        });
        // console.log(inputs);
      }
    } catch (error) {
      toast.error(error)
    }
  }
  const getCourse = async()=>{
    try {
      const {data} = await axios.get(`${BACKEND_BASE_URL}/api/course/get-all`);
      setCourses(data.course)
      setLoading(1)
      // console.log(courses);
    } catch (error) {
      toast.error(error)
    }
  }
  const getSubject = async()=>{
    try {
      const {data} = await axios.get(`${BACKEND_BASE_URL}/api/subject/get-all`);
      setSubjects(data.subjects)
    } catch (error) {
      toast.error(error)
    }
  }

  const handleSubmit  = async (e)=>{
    e.preventDefault();
    const formData =  {
      questiontext: inputs.questiontext,
      subjectid: inputs.subjectid,
      courseid: inputs.courseid,
      status: inputs.status,
      option1: inputs.option1,
      option2: inputs.option2,
      option3: inputs.option3,
      option4: inputs.option4,
      correctoption: inputs.correctoption,
    }

    // console.log(formData);
    // return false;
    
    try {
    const {data} = await axios.put(`${BACKEND_BASE_URL}/api/question/edit/${id}`,formData);
    if (data?.success) {
      toast.success(data.message);
      navigate('/questions')
    }else{
      toast.error(data.message);
    }
  } catch (error) {
    toast.success(error);
  }
  }
  const handleChange = (e)=>{
       setInputs({
        ...inputs,
        [e.target.name]:e.target.value
       })
  }


  useEffect(()=>{
    getCourse();
    getSubject();
    getQuestionById();
  },[loading])
  return (
    <div className="main">
      <div className="report-container-1">
        <div className="report-header">
          <h1 className="recent-Articles"><i className="bi bi-plus-lg"></i> Edit Question</h1>
          <a href="/questions">
          <button className="btn-voilate"><i className="bi bi-arrow-left"></i> Back</button>
          </a>
        </div>

        <div className="report-body">
        <form onSubmit={handleSubmit}>
          <div className="row">

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                Question Text <span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="questiontext"
                  onChange={handleChange}
                  value={inputs.questiontext}
                  placeholder="Ex. What is the value of 5+9 ?"
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                Subject Name <span className="text-success"><b>*</b></span>
                </label>
                <select className="form-select" name="subjectid" required onChange={handleChange} value={inputs.subjectname}>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.subjectname}
                  </option>
                ))}
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                Course Name <span className="text-success"><b>*</b></span>
                </label>
                <select className="form-select" name="courseid" required onChange={handleChange} value={inputs.courseid}>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.coursename}
                  </option>
                ))}
                </select>
              </div>
            </div>
 
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Status
                </label>
                <select className="form-select form-controle" name="status" onChange={handleChange} value={inputs.status}>
                  <option value="1">Active</option>
                  <option value="2">InActive</option>
                </select>
              </div>
            </div>


            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                Option 1<span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="option1"
                  onChange={handleChange}
                  value={inputs.option1}
                  placeholder="Ex. 234"
                  required
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                Option 2<span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="option2"
                  onChange={handleChange}
                  value={inputs.option2}
                  placeholder="Ex. 234"
                  required
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                Option 3<span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="option3"
                  onChange={handleChange}
                  value={inputs.option3}
                  placeholder="Ex. 234"
                  required
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                Option 4<span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="option4"
                  onChange={handleChange}
                  value={inputs.option4}
                  placeholder="Ex. 234"
                  required
                />
              </div>
            </div>


             

       

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                Correct Option <span className="text-success"><b>*</b></span>
                </label>
                <select className="form-select form-controle" name="correctoption" onChange={handleChange} required value={inputs.correctoption}>
                  <option value="option1">Option1</option>
                  <option value="option2">Option2</option>
                  <option value="option3">Option3</option>
                  <option value="option4">Option4</option>
                </select>
              </div>
            </div>



          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Edit