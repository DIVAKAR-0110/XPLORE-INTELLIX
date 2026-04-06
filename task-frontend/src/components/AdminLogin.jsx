import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function AdminLogin() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const login = async () => {
    if (!data.username || !data.password) {
      alert("Enter all fields");
      return;
    }

    const res = await fetch("http://localhost:3000/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.text();

    if (result === "Login successful") {
      alert("Welcome Admin");
      navigate("/admin_dashboard");
    } else {
      alert(result);
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Admin Login</h2>

        <input
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={login} style={styles.button}>
          Login
        </button>
      </div>
    </>
  );
}

export default AdminLogin;

const styles = {
  container: {
    width: "300px",
    margin: "80px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  heading: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
