import { useEffect, useState } from "react";
import Navbar from "./Navbar";

function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    employeeId: "",
  });

  // 🔹 Fetch employees
  const fetchEmployees = async () => {
    const res = await fetch("http://localhost:3000/admin/employees");
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // 🔹 Approve employee
  const approveEmployee = async (id) => {
    await fetch(`http://localhost:3000/admin/approve/${id}`, {
      method: "PUT",
    });

    alert("Employee Approved");
    fetchEmployees();
  };

  // 🔹 Assign task
  const assignTask = async () => {
    if (!task.title || !task.employeeId) {
      alert("Fill required fields");
      return;
    }

    await fetch("http://localhost:3000/admin/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    alert("Task Assigned");

    setTask({
      title: "",
      description: "",
      employeeId: "",
    });
  };

  const pendingEmployees = employees.filter((e) => !e.isApproved);
  const approvedEmployees = employees.filter((e) => e.isApproved);

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.header}>
          <h2>Hi Admin </h2>

          <button
            style={styles.logoutBtn}
            onClick={() => {
              window.location.href = "/admin_login";
            }}
          >
            Logout
          </button>
        </div>
        <div style={styles.section}>
          <h3>New Requests</h3>

          {pendingEmployees.length === 0 ? (
            <p>No new requests</p>
          ) : (
            pendingEmployees.map((emp) => (
              <div key={emp._id} style={styles.card}>
                <p>
                  <b>Name:</b> {emp.name}
                </p>
                <p>
                  <b>Email:</b> {emp.email}
                </p>
                <p>
                  <b>Department:</b> {emp.department}
                </p>

                <button
                  style={styles.approveBtn}
                  onClick={() => approveEmployee(emp._id)}
                >
                  Approve
                </button>
              </div>
            ))
          )}
        </div>
        <div style={styles.section}>
          <div style={styles.taskBox}>
            <h3 style={{ textAlign: "center" }}>Assign Task</h3>

            <select
              value={task.employeeId}
              onChange={(e) => setTask({ ...task, employeeId: e.target.value })}
              style={styles.input}
            >
              <option value="">Select Employee</option>
              {approvedEmployees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Task Title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              style={styles.input}
            />

            <textarea
              placeholder="Task Description"
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              style={styles.textarea}
            />

            <button style={styles.assignBtn} onClick={assignTask}>
              Assign Task
            </button>
          </div>
        </div>

        <div style={styles.section}>
          <h3>Approved Employees</h3>

          {approvedEmployees.length === 0 ? (
            <p>No approved employees</p>
          ) : (
            approvedEmployees.map((emp) => (
              <div key={emp._id} style={styles.card}>
                <p>
                  <b>Name:</b> {emp.name}
                </p>
                <p>
                  <b>Email:</b> {emp.email}
                </p>
                <p>
                  <b>Department:</b> {emp.department}
                </p>
                <p style={{ color: "green" }}>Approved</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(135deg, #ffffff, #978d8d)",
    color: "#000000",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  logoutBtn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    background: "#ff4d4d",
    color: "#fff",
    cursor: "pointer",
  },

  section: {
    marginBottom: "30px",
  },

  card: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "10px",
    transition: "0.3s",
  },

  input: {
    display: "block",
    margin: "10px 0",
    padding: "10px",
    width: "100%",
    maxWidth: "280px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
  },

  textarea: {
    display: "block",
    margin: "10px 0",
    padding: "10px",
    width: "100%",
    maxWidth: "280px",
    height: "80px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    resize: "none",
  },

  approveBtn: {
    background: "green",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "8px",
  },

  assignBtn: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },

  taskBox: {
    width: "320px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};
