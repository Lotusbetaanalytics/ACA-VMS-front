import React, { useEffect, useState } from "react";
import "./pagetitle.css";
import { useNavigate } from "react-router-dom";
const PageTitle = (props) => {
  const [name, setName] = useState("");
  const frontdesk = JSON.parse(localStorage.getItem("frontdesk"));

  const navigate = useNavigate();
  useEffect(() => {
    if (!frontdesk) {
      navigate("/");
    } else {
      setName(frontdesk.user.firstName);
    }
  }, [navigate, frontdesk]);
  const date = new Date();

  let greeting = "";

  if (date.getHours() >= 12 && date.getHours() <= 16) {
    greeting = "Good Afternoon!";
  } else if (date.getHours() >= 17 && date.getHours() <= 22) {
    greeting = "Good Evening!";
  } else {
    greeting = "Good Morning!";
  }
  return (
    <div className="page__heading">
      <h1>
        {greeting} {name}
      </h1>
      <h3>{props.heading}</h3>
    </div>
  );
};

export default PageTitle;
