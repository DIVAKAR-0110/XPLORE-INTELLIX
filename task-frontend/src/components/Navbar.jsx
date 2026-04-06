import React from "react";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>Task Management System</h2>
    </nav>
  );
}
const styles = {
  nav: {
    padding: "20px",
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
  },
};
export default Navbar;
