import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
function Home() {
  const [posts, setPosts] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const searchRef = useRef();
  const cat = useLocation();
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
  const handleSearchText = (e) => {
    clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => {
      setTextSearch(e);
    }, 700);
  };
  const searchValue = useMemo(() => {
    return posts.filter((item) =>
      item.title.toLowerCase().includes(textSearch.toLowerCase())
    );
  }, [textSearch]);
  useEffect(() => {
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
          <div className="form-control">
            <label htmlFor="search-input">Search Post: </label>
            <input
              name="search-input"
              onChange={(e) => handleSearchText(e.target.value)}
              type="text"
              placeholder="Enter your search"
            />
          </div>
          <div className="home">
            <div className="posts">
              {(textSearch ? searchValue : posts || []).map((post) => (
                <div className="post" key={post.id}>
                  <div className="img">
                    <img src={`../upload/posts/${post.img}`} alt="" />
                  </div>
                  <div className="content">
                    <Link className="link" to={`/post/${post.id}`}>
                      <h1>{post.title}</h1>
                    </Link>
                    <div className="limted-text" id="limited-text">
                      {getText(post.description).substring(0, 180) + "..."}
                    </div>
                    <button>
                      <Link to={`/post/${post.id}`}>Read More</Link>
                    </button>
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
