import React, { useState, useEffect } from "react";
import Axios from "../config/Axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [feedback, setFeedback] = useState({
    category: "Product Features",
    feedback: "",
  });

  const [category, setCategory] = useState("Product Features");

  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await Axios.get(`/feedback/getfeedback/${category}`);
      setFeedbacks(data);
    };
    fetchData();
  }, [setFeedbacks, category]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await Axios.post("/feedback/create", feedback)
      .then((res) => {
        if (res.status === 200) {
          alert("Feedback submitted successfully");
        } else {
          alert("Feedback not submitted");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeHandler = (e) => {
    setFeedback({ ...feedback, [e.target.id]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <div className="col">
          <h1>Feedback Form</h1>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="category">Select category</label>
              <select
                className="form-control"
                id="category"
                onChange={changeHandler}
              >
                <option value="Product Features">Product features</option>
                <option value="Product Pricing">Product pricing</option>
                <option value="Product Usability">Product usability</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="feedback">Feedback</label>
              <textarea
                className="form-control"
                id="feedback"
                rows="3"
                onChange={changeHandler}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="col2">
          <h1>Feedbacks</h1>
          <div className="form-group">
            <label htmlFor="category">Select category</label>
            <select
              className="form-control"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Product Features">Product features</option>
              <option value="Product Pricing">Product pricing</option>
              <option value="Product Usability">Product usability</option>
            </select>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  <td>{feedback.category}</td>
                  <td>{feedback.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
