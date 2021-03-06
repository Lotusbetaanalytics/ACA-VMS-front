import React, { useEffect, useState } from "react";
import "./pagetitle.css";

const PageTitle = (props) => {
  const [name, setName] = useState("");
  const { user, office } = props;

  useEffect(() => {
    setName(user);
  }, [user]);
  const date = new Date();

  let greeting = "";

  if (date.getHours() >= 12 && date.getHours() <= 16) {
    greeting = "Good Afternoon";
  } else if (date.getHours() >= 17 && date.getHours() <= 22) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Morning";
  }
  return (
    <div className="page__heading">
      <div>
        <h1>{office.toUpperCase()}</h1>
      </div>
      <div>
        <h1>
          {greeting} {name}!
        </h1>
        <h3>{props.heading}</h3>
      </div>
    </div>
  );
};

export default PageTitle;
