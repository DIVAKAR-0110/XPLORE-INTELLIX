import { useState } from "react";
import Navbar from "./Navbar";

function EmployeeLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (!form.email.trim() || !form.password.trim()) {
      alert("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const user = await res.json();

        localStorage.setItem("employee", JSON.stringify(user));

        alert("Login successful!");
        window.location.href = "/employee_dashboard";
      } else {
        const message = await res.text();
        alert(message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.title}>Employee Login</h2>
          <p style={styles.subtitle}>Sign in to continue</p>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.disabledBtn : {}),
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </>
  );
}

export default EmployeeLogin;

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "340px",
    padding: "25px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },

  title: {
    marginBottom: "5px",
    textAlign: "center",
  },

  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
    textAlign: "center",
  },

  inputGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },

  label: {
    fontSize: "13px",
    marginBottom: "5px",
    color: "#333",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "11px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#28a745",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },

  disabledBtn: {
    backgroundColor: "#aaa",
    cursor: "not-allowed",
  },
};
