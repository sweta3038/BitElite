import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductsPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);

        // Fetch the category by ID
        const categoryRes = await axios.get(`/api/v1/category/get-category/${categoryId}`);
        if (categoryRes.data?.success) {
          setCategory(categoryRes.data.category);
        }

        // Fetch filtered products by category
        const productsRes = await axios.post("/api/v1/product/product-filters", {
          checked: [categoryId],
          radio: [], // Adjust if you have any price filters
        });
        setProducts(productsRes.data?.products || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchCategoryAndProducts();
  }, [categoryId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={`${category?.name} - Products`}>
      <div className="container-fluid row mt-5">
        {/* Left Side: Category Card */}
        <div className="col-md-3">
          {category && (
            <div className="card m-2 p-1" style={{ width: "18rem" ,backgroundColor: "#EDE3FF"}}>
              <img
                src={`/api/v1/category/category-photo/${category._id}`}
                className="card-img-top"
                alt={category.name}
                style={{ width: "100%", height: "400px", objectFit: 'cover'}}
              />
              <div className="card-body">
                <h5 className="card-title text-center">{category.name}</h5>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Filtered Products */}
        <div className="col-md-9">
          <h1 className="text-center">{category?.name} - Products</h1>
          <div className="d-flex flex-wrap">
            {products.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className="card-text">₹ {p.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem("cart", JSON.stringify([...cart, p]));
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
