import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./../components/Layout/Layout";

const Starpg = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get("/api/v1/category/get-category");
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategory();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <Layout title={"Categories"}>
      <div className="container-fluid row mt-5">
        <div className="col-md-12">
          <h1 className="text-center">STAR WARDROBE</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {categories?.map((c) => (
              <div
                className="card m-3 p-1"
                style={{ width: "18rem",backgroundColor: "#EDE3FF"}}
                key={c._id}
                onClick={() => handleCardClick(c._id)}
              >
                <img
                  src={`/api/v1/category/category-photo/${c._id}`}
                  className="card-img-top"
                  alt={c.name}
                  style={{ width: '100%', height: '350px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{c.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Starpg;
