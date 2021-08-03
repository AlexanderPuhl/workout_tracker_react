import React, { useEffect, useState } from "react";
import getUserApi from "../hooks/useUserApi"
import LoadSpinner from "../components/spinner.jsx";
import fetchApi from "../hooks/useFetchAPI";

export default function Profile() {
  const endPoint = '/user/get_data'
  const { CrudData } = fetchApi(endPoint,"Get");
  const { getUserData } = getUserApi();
  const [ userData, setUserData ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      const data = await CrudData();
      const userInfo = data[0];
      setUserData(userInfo);
      setLoading(false);
    } catch (e) {
      console.log(e.message);
    }

  }, []);

  return (
  <section>
    <h1>Profile Page</h1>
      {loading ? <div className="spinner-container"><LoadSpinner></LoadSpinner></div> : <h2>{userData.username}</h2> }
  </section>
  )
};