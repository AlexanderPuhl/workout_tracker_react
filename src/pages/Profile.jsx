import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoadSpinner from "../components/spinner.jsx";
import useFetchApi from "../hooks/useFetchAPI";
import returnDateTime from "../utils/dateTime";

const ProfileStyles = styled.section`
  h2 {
    text-transform: capitalize;
  }
  img {
    border-radius: 50%;
    width: 75px;
  }
`;

export default function Profile() {
  const { crudData } = useFetchApi();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      const data = await crudData("/user/get_data", "Get");
      const userInfo = data[0];
      setUserData(userInfo);
      setLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  let lastLogin;
  let createdOn;
  let lastModified;
  let role;
  let imageSource;
  if (userData) {
    lastLogin = returnDateTime(userData.last_login);
    lastModified = returnDateTime(userData.modified_on);
    createdOn = returnDateTime(userData.created_on);
    role = userData.role_id === 1 ? "an Admin" : "a Basic User";
    imageSource = `./images/${userData.username}.png`;
  }
  return (
    <ProfileStyles>
      <h1>Profile Page</h1>
      {loading ? (
        <div className="spinner-container">
          <LoadSpinner />
        </div>
      ) : (
        <div>
          <h2>Hello {userData.username}</h2>
          <img src={imageSource} alt="profile pic" />
          <p>You are {role}</p>
          <p>
            You last logged in on {lastLogin.date} {lastLogin.time}
          </p>
          <p>
            You last modified this account on {lastModified.date} {lastModified.time}
          </p>
          <p>
            You created this account on {createdOn.date} {createdOn.time}
          </p>
        </div>
      )}
    </ProfileStyles>
  );
}
