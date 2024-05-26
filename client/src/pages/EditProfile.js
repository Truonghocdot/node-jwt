import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.js";
function EditProfile() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className="app">
      <div className="container">
        <Header />
        <h2>Your info account</h2>
        <form>
          <div className="form-control">
            <label htmlFor="username">Your account name:</label>
            <input name="usernam" />
          </div>
          <div className="form-control">
            <label htmlFor="username">Your email:</label>
            <input name="usernam" />
          </div>
          <div className="form-control"></div>
        </form>
        <Footer />
      </div>
    </div>
  );
}

export default EditProfile;
