import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/button/Button.js";
import TextField from "../../ui/TextField/TextField.js";
import {getAllRoutines, createRoutine,destroyRoutine,editRoutine,getAllActivities,addActivityToRoutine, } from "../AjaxHelpers/AjaxHelpers.js";

export let MyRoutinesPage = (props) => {
  const { userInfo, isLoggedIn, userToken } = props;
  const [routinesToDisplay, setRoutinesToDisplay] = useState([]);
  const [addingNewRoutine, setAddingNewRoutine] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState(false);
  const [postToEdit, setPostToEdit] = useState({});
  const [allActivities, setAllActivities] = useState([]);
  const [addingNewActivityToRoutine, setAddingNewActivityToRoutine] = useState(false);
  const fetchData = async () => {
    const allRoutines = await getAllRoutines();
    const allActivities = await getAllActivities();
    setAllActivities(allActivities);
    setRoutinesToDisplay(allRoutines);
  };
  useEffect(() => {
    fetchData();
  }, []);
  async function handleAddNewRoutine(e) {
    e.preventDefault();
    setAddingNewRoutine(true);
  }
  async function handleSubmitNewRoutine(e) {
    e.preventDefault();
    let info = {};
    info["name"] = document.getElementById("RoutineName").value;
    info["goal"] = document.getElementById("RoutineGoal").value;
    info["isPublic"] = document.getElementById("isPublic").checked;
    let newRoutine = await createRoutine(info, userToken);
    console.log(newRoutine);
    if (newRoutine.error) {
      alert(newRoutine.error);
    } else {
      alert(newRoutine.success);
      fetchData();
      setAddingNewRoutine(false);
    }
  }
  async function handleCancelAddNewRoutine(e) {
    e.preventDefault();
    setAddingNewRoutine(false);
  }
  async function handleDeletePost(e) {
    e.preventDefault();
    let response = await destroyRoutine(e.target.id, userToken);
    if (response.success) {
      alert("Routine successfully Deleted!");
      fetchData();
    } else {
      alert(response.error);
    }
  }
  async function handleEditRoutine(e) {
    e.preventDefault();
    let postId = e.target.id;
    console.log(postId);
    routinesToDisplay.forEach((element) => {
      if (element.id == postId) setPostToEdit(element);
    });
    setEditingRoutine(true);
  }
  async function handleSubmitEditPost(e) {
    e.preventDefault();
    let info = {};
    let name = document.getElementById("RoutineName").value;
    let goal = document.getElementById("RoutineGoal").value;
    let isPublic = document.getElementById("isPublic").checked;
    if (!name && !goal && postToEdit.isPublic === isPublic) {
      alert("Some edit must be submitted to edit the post!");
    }
    if (name) info["name"] = name;
    else info["name"] = postToEdit.name;
    if (goal) info["goal"] = goal;
    else info["goal"] = postToEdit.goal;
    info["isPublic"] = isPublic;
    info["routineId"] = postToEdit.id;
    let Routine = await editRoutine(info, userToken);
    console.log(Routine);
    if (Routine.error) {
      alert(Routine.error);
    } else {
      alert(Routine.success);
      fetchData();
      setEditingRoutine(false);
    }
  }
  async function handleCancelEditPost(e) {
    e.preventDefault();
    setEditingRoutine(false);
  }
  function EditingRoutine() {
    return (
      <div>
        <div id="OutdatedPost">
          <h1>Old Routine</h1>
          <h1 className="RoutineInfo a name">Title : {postToEdit.name}</h1>
          <h3 className="RoutineInfo b goal">Goal : {postToEdit.goal}</h3>
        </div>
        <form id="UpdatingRoutineForm">
          <h1>What would you like it to be?</h1>
          <TextField type="text" id="RoutineName" placeholder="Title" />
          <TextField type="text" id="RoutineGoal" placeholder="Goal" />
          <div>
            <input type="checkbox" id="isPublic"></input>
            <span>Publish to the public?</span>
          </div>
          <Button type='submit' onClickHandler={handleSubmitEditPost}>Submit</Button>
          <Button type='submit' onClickHandler={handleCancelEditPost}>Cancel Editing Routine</Button>
        </form>
      </div>
    );
  }
  async function handleAddActivityToRoutine(e) {
    e.preventDefault();
    let info = {};
    info["count"] = document.getElementById("count").value;
    info["duration"] = document.getElementById("duration").value;
    info["activityId"] = document.getElementById("activityToAdd").value;
    info["routineId"] = document.getElementById("activityToAdd").className;
    console.log(info);
    let response = await addActivityToRoutine(info, userToken);
    fetchData();
  }
  let NewRoutineForm = (props) => {
    return (
      <form id="NewRoutineForm">
        <h1>New Routine Form</h1>
        <TextField type="text" id="RoutineName" placeholder="Title"/>
        <TextField type="text" id="RoutineGoal" placeholder="Goal"/>
        <div>
          <input type="checkbox" id="isPublic"></input>
          <span>Publish to the public?</span>
        </div>
        <Button type='submit' onClickHandler={handleSubmitNewRoutine}>Submit</Button>
        <Button type='submit' onClickHandler={handleCancelAddNewRoutine}>Cancel</Button>
      </form>
    );
  };
  if (editingRoutine) {
    return <EditingRoutine></EditingRoutine>;
  }
  function isPostFromUser(element) {
    return element.creatorId == userInfo.id;
  }
  function renderAddActivityToRoutineFrom(e) {
    e.preventDefault();
    if (!addingNewActivityToRoutine) setAddingNewActivityToRoutine(true);
    else setAddingNewActivityToRoutine(false);
  }
  let filteredPosts = routinesToDisplay.filter(isPostFromUser);

  return (
    <div id="RoutinesPage">
      {isLoggedIn && !addingNewRoutine ? (
        <Button onClickHandler={handleAddNewRoutine}>Add new Routine?</Button>
      ) : null}
      {addingNewRoutine ? <NewRoutineForm></NewRoutineForm> : null}
      {filteredPosts.map((element) => {
        return (
          <div className="Single-Routine">
            <h1 className="RoutineInfo b name">{element.name}</h1>
            <h3 className="RoutineInfo a goal">Goal : {element.goal}</h3>
            <h3 className="RoutineInfo b creatorName">
              Created By : {element.creatorName}
            </h3>

            {!addingNewActivityToRoutine? <Button onClickHandler={renderAddActivityToRoutineFrom}>Add Activity to Routine?</Button> : null }
            {addingNewActivityToRoutine ? (
              <form className="AddActivityToRoutine">
                <h1>Add activity to Routine</h1>
                <select id="activityToAdd" className={element.id}>
                  {allActivities.map((activity) => {
                    return (
                      <option value={activity.id} id={activity.id}>
                        {activity.name}
                      </option>
                    );
                  })}
                </select>
                <TextField id="count" placeholder="count"></TextField>
                <TextField id="duration" placeholder="duration"></TextField>
                <Button onClickHandler={handleAddActivityToRoutine}>Submit</Button>
                <Button onClickHandler={renderAddActivityToRoutineFrom}>Cancel</Button>

              </form>
            ) : null}
            <h2 className="RoutineInfo b">Activities for This Routine</h2>
            {element.activities.length ? (
              <table className="ActivitiesTable">
                <tr>
                  <th className="spacer"></th>
                  <th>Exercise</th>
                  <th>Description</th>
                  <th>Count</th>
                  <th>Duration</th>
                  <th className="spacer"></th>
                </tr>

                {element.activities.map((element2) => {
                  return (
                    <tr className="ActivitiesRow">
                      <td className="spacer"></td>
                      <td className="ActivitiesInfo">{element2.name}</td>
                      <td className="ActivitiesInfo">{element2.description}</td>
                      <td className="ActivitiesInfo">{element2.count}</td>
                      <td className="ActivitiesInfo">{element2.duration}</td>
                      <td className="spacer"></td>
                    </tr>
                  );
                })}
              </table>
            ) : null}
            {element.creatorId == userInfo.id ? (
              <div id="RoutineButtons">
                <Button onClickHandler={handleEditRoutine} id={element.id}> Edit Routine </Button>{" "}
                <Button onClickHandler={handleDeletePost} id={element.id}> Delete Routine </Button> </div>) : null} 
              </div>
            );})}
    </div>
  );
};

