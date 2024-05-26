import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { useEffect, useState } from "react";
import axios from "axios";
function Home() {
  const [posts, setPosts] = useState([]);
  const cat = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/post/${cat.search}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <>
      <div className="app">
        <div className="container">
          <Header />
          <div key={2} className="home">
            <div className="posts">
              {posts.map((post) => (
                <div className="post" key={post.id}>
                  <div className="img">
                    <img src={`../upload/${post.img}`} alt="" />
                  </div>
                  <div className="content">
                    <Link className="link" to={`/post/${post.id}`}>
                      <h1>{post.title}</h1>
                    </Link>
                    <p>{getText(post.description)}</p>
                    <button>Read More</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
