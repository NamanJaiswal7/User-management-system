import React, { useState, useRef, useEffect } from "react";
import { Card, Button, Alert, Form, Dropdown } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { firestore, database } from "../firebase";

import { collection, getDocs, setDoc, doc, addDoc } from "firebase/firestore";
// import AddUser from "./AddUser"

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [addUserModal, setAdduserModal] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [dropDown, setDropDown] = useState("");
  const [valUpdate, setUpdate] = useState(false);
  const { signup } = useAuth();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(firestore, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data() })));
    };
    getUsers();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      let res = await signup(emailRef.current.value, passwordRef.current.value);
      let ans = await addDoc(usersCollectionRef, {
        name: nameRef.current.value,
        Uid: res.user.uid,
        email: emailRef.current.value,
        module: dropDown
      });
      // console.log(ans);

      // console.log("rama");
      //  console.log(firestore)
      //  console.log(database.users)
      // let ans=await setDoc(doc(firestore,"users",res.user.uid),{
      //   name:nameRef,
      //   Uid:res.user.uid,
      //   module:dropDown,
      //   email:emailRef
      // })
      // console.log(ans)
      setAdduserModal(false);
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }
  const handleClosing = () => {
    setAdduserModal(false);
  };
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const handleUpdate = () => {
    setUpdate(!valUpdate);
  };

  return (
    <>
      {addUserModal ? (
        <>
          <Card>
            <Card.Body>
              <i
                className="fas fa-times text-right fs-1"
                onClick={handleClosing}
              ></i>

              <h2 className="text-center mb-4">Add Users</h2>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" ref={nameRef} required />
                </Form.Group>

                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Modules</Form.Label>
                  <select
                    name="option"
                    onChange={(e) => {
                      setDropDown(e.target.value);
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Add User
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </>
      ) : (
        <div className="row">
          <div className="col-3">
            <h2>Details</h2>
            <ul className="list-group">
              <li>Manage Users</li>
              <li onClick={logout}>Log out</li>
            </ul>
          </div>
          <div className="col-9">
            <div class="d-flex justify-content-around">
              <button>Active</button>
              <button>Deleted</button>
              <button>All</button>
              <input
                type="text"
                // value={this.state.currSearchText}
                // onChange={this.handleChange}
              ></input>

              <button onClick={() => setAdduserModal(true)}>Add users</button>
            </div>

            {/* <input
            type="number"
            onChange={this.handleLimit}
            value={
              this.state.limit > filterMovie.length
                ? filterMovie.length
                : this.state.limit
            }
            min="0"
            max={movies.length}
          /> */}
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">update</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                <td className="d-flex">
                  <div className="icon">

                  <i class="fas fa-user-circle"></i>
                  </div>
                <div className="details">

                <h4>Ramesh</h4>
                <h6>ramesh@gmail.com</h6>
                </div>
                </td>
                  <td>
                <button>Active</button>
              </td>
              <td>
              <i className="fas fa-ellipsis-v"></i>
                </td>
                </tr> */}
                {users.map((obj) => (
                  <tr>
                    <td className="d-flex">
                      <div className="icon">
                        <i class="fas fa-user-circle"></i>
                      </div>
                      <div className="details">
                        <h4>{obj.name}</h4>
                        <h6>{obj.email}</h6>
                      </div>
                    </td>
                    <td>
                      <button>Active</button>
                    </td>
                    <td>
                      <i
                        onClick={handleUpdate}
                        className="fas fa-ellipsis-v"
                      ></i>
                    </td>
                  </tr>
                ))}

                {/* {filterMovie.map((obj) => (
                <tr key={obj._id}>
                  <td></td>
                  <td>{obj.title}</td>
                  <td>{obj.genre.name}</td>
                  <td>{obj.numberInStock}</td>
                  <td>{obj.dailyRentalRate}</td>
                  <td>
                    {" "}
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleClick(obj._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))} */}
              </tbody>
              {valUpdate ? (
                <>
                  <div>
                    <ul className="list-group">
                      <li className="list-group-item">Update</li>
                      <li className="list-group-item">Delete</li>
                    </ul>
                  </div>
                </>
              ) : (
                <></>
              )}
              <nav aria-label="...">
                <ul className="pagination pagination">
                  {/* <li class="page-item active" aria-current="page">
      <span class="page-link">1</span>
    </li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li> */}
                  {/* {pageArr.map((curPage) => {
                  let classStyle =
                    curPage == currPage ? "page-item active" : "page-item";
                  return (
                    <li
                      className={classStyle}
                      onClick={() => this.handlePagination(curPage)}
                      key={curPage}
                    >
                      <span className="page-link">{curPage}</span>
                    </li>
                  );
                })} */}
                </ul>
              </nav>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
