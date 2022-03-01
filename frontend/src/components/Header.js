import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../store/auth/authSlice";
import { Navbar, Container, Dropdown, Nav, Button } from "react-bootstrap";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    // <div className="container">
    //   <header>
    //     <div>
    //       <Link to="/">Questions App</Link>
    //     </div>
    //     <ul>
    //       {user ? (
    //         <li>
    //           <button className="btn" onClick={onLogout}>
    //             <FaSignOutAlt /> Logout
    //           </button>
    //         </li>
    //       ) : (
    //         <>
    //           <li>
    //             <Link to="/login">
    //               <FaSignInAlt /> Login
    //             </Link>
    //           </li>
    //           <li>
    //             <Link to="/register">
    //               <FaUser /> Register
    //             </Link>
    //           </li>
    //         </>
    //       )}
    //     </ul>
    //   </header>
    // </div>
    <>
      <Navbar bg="light" variant="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={NavLink} to={user ? "/tournaments" : "/login"}>
            <span className="fs-5">Questions App</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto mx-2 my-lg-0">
              {!user && (
                <>
                  <Nav.Link as={NavLink} to="/register">
                    <FaUser /> Register
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/login">
                    <FaSignInAlt /> Login
                  </Nav.Link>
                </>
              )}

              {user && (
                <>
                  <Dropdown>
                    <Dropdown.Toggle variant="info">
                      <span className="me-1 text-white">{}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={NavLink} to="/mytournaments">
                        My tournaments
                      </Dropdown.Item>
                      <Dropdown.Item as={NavLink} to="/profile">
                        Profile
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
              {user && (
                <Button
                  variant="secondary"
                  // size="sm"
                  className="mx-4"
                  onClick={onLogout}
                >
                  <FaSignOutAlt /> Logout
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
