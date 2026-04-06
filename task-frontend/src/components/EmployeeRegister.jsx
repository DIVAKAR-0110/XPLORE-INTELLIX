import { useState } from "react";
import Navbar from "./Navbar";
function EmployeeRegister() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const register = async () => {
    if (
      !data.name ||
      !data.email ||
      !data.phone ||
      !data.password ||
      !data.department
    ) {
      alert("Please fill all fields");
      return;
    }

    if (data.phone.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.text();

      alert(result);

      setData({
        name: "",
        email: "",
        phone: "",
        password: "",
        department: "",
      });
    } catch (error) {
      alert("Something went wrong" + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Employee Registration</h2>

        <input
          name="name"
          placeholder="Full Name"
          value={data.name}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={data.phone}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="department"
          placeholder="Department (e.g. IT, HR)"
          value={data.department}
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

        <button onClick={register} style={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </>
  );
}

export default EmployeeRegister;

const styles = {
  container: {
    width: "320px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};
