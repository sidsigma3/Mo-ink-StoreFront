import { Dropdown } from "react-bootstrap";
import { GoPerson } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions here
    console.log("User logged out");
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="none"
        id="dropdown-basic"
        className="d-flex align-items-center justify-content-center rounded-circle yellow-light-bg border-0"
        style={{ width: "2.3rem", height: "2.3rem", cursor: "pointer" }}
      >
        <GoPerson size={20} />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        <Dropdown.Item onClick={() => navigate("/account")}>Account</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout} className="text-danger">
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
