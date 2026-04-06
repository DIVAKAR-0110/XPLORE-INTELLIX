import { useEffect, useState } from "react";
import Navbar from "./Navbar";

function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);

  const employee = JSON.parse(localStorage.getItem("employee"));

  if (!employee) {
    return <h2 style={{ textAlign: "center" }}>Please login first</h2>;
  }

  const fetchTasks = async () => {
    const res = await fetch(`http://localhost:3000/tasks/${employee._id}`);
    const data = await res.json();

    const order = {
      Pending: 1,
      "In Progress": 2,
      Completed: 3,
    };

    const sortedTasks = data.sort((a, b) => {
      return order[a.status] - order[b.status];
    });

    setTasks(sortedTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (taskId, status) => {
    await fetch(`http://localhost:3000/task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    fetchTasks();
  };

  const getStatusColor = (status) => {
    if (status === "Pending") return "#dc3545";
    if (status === "In Progress") return "#ffc107";
    if (status === "Completed") return "#28a745";
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.header}>
          <h2>Welcome, {employee.name}</h2>
          <button
            style={styles.logoutBtn}
            onClick={() => {
              localStorage.removeItem("employee");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>

        <h3 style={{ marginBottom: "20px" }}>Your Tasks</h3>

        {/* Task Grid */}
        <div style={styles.grid}>
          {tasks.length === 0 ? (
            <p>No tasks assigned</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} style={styles.card}>
                <h4 style={styles.title}>{task.title}</h4>
                <p style={styles.desc}>{task.description}</p>

                <div style={styles.row}>
                  <span
                    style={{
                      ...styles.badge,
                      backgroundColor: getStatusColor(task.status),
                    }}
                  >
                    {task.status}
                  </span>

                  <select
                    value={task.status}
                    onChange={(e) => updateStatus(task._id, e.target.value)}
                    style={{
                      ...styles.select,
                      opacity: task.status === "Completed" ? 0.6 : 1,
                      cursor:
                        task.status === "Completed" ? "not-allowed" : "pointer",
                    }}
                    disabled={task.status === "Completed"}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default EmployeeDashboard;

const styles = {
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

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    transition: "0.3s",
  },

  title: {
    marginBottom: "10px",
  },

  desc: {
    fontSize: "14px",
    marginBottom: "15px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  badge: {
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    color: "#fff",
  },

  select: {
    padding: "5px",
    borderRadius: "5px",
    border: "none",
  },
};
