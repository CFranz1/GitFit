import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllActivities,
  createActivity,
} from "../AjaxHelpers/AjaxHelpers.js";

export let Activities = (props) => {
  const { isLoggedIn, userToken } = props;
  const [activitiesToDisplay, setActivitiesToDisplay] = useState([]);
  const [isAddingActivities, setIsAddingActivities] = useState([false]);
  const fetchData = async () => {
    const activities = await getAllActivities();
    console.log(activities);
    setActivitiesToDisplay(activities);
  };
  useEffect(() => {
    fetchData();
  }, []);
  function toggleAddActivityForm(e) {
    e.preventDefault();
    if (!isAddingActivities) setIsAddingActivities(true);
    else setIsAddingActivities(false);
  }
  async function handleSubmitNewActivity(e) {
    e.preventDefault();
    let nameExists = false;
    console.log("handle submit called");
    let info = {};
    info.name = document.getElementById("ActivityName").value;
    info.description = document.getElementById("ActivityDescription").value;
    if (!info.name || !info.description)
      return alert("Name and Description must be submitted");
    activitiesToDisplay.forEach((element) => {
      if (element.name == info.name) {
        nameExists = true;
        return alert("Activity name must not alreay exist");
      }
    });
    if (nameExists) return;
    let response = await createActivity(info, userToken);
    console.log(response);
    fetchData();
    setIsAddingActivities(false);
  }

  return (
    <div id="ActivitiesPage">
      <h1>All Public Activities</h1>
      <table id="ActivityTable">
        <tr>
          <th className="ActivitiesInfo">Activity Name</th>
          <th className="ActivitiesInfo">Activity Description</th>
        </tr>
        {activitiesToDisplay.map((element) => {
          return (
            <tr className="ActivitiesRow">
              <td className="ActivitiesInfo">{element.name}</td>
              <td className="ActivitiesInfo">{element.description}</td>
            </tr>
          );
        })}
      </table>
      {isLoggedIn ? (
        <button onClick={toggleAddActivityForm}>
          {!isAddingActivities ? "Add Activity?" : "Cancel"}
        </button>
      ) : null}
      {isAddingActivities ? (
        <form id="AddActivityForm">
          <h1>Create New Activity</h1>
          <h2>Name</h2>
          <input placeholder="Activity Name" id="ActivityName"></input>
          <h2>Description</h2>
          <input
            placeholder="Activity Description"
            id="ActivityDescription"
          ></input>
          <button onClick={handleSubmitNewActivity}>Submit</button>
        </form>
      ) : null}
    </div>
  );
};
