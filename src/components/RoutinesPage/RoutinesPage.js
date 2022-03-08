import { useEffect, useState } from "react";
import { getAllRoutines } from "../AjaxHelpers/AjaxHelpers.js";
export let RoutinesPage = (props) => {
    const [routinesToDisplay, setRoutinesToDisplay] = useState([]);
    const fetchData = async () => {
      const allRoutines = await getAllRoutines();
      setRoutinesToDisplay(allRoutines);
    };
    useEffect(() => {
      fetchData();
    }, []);
    return (
      <div id="RoutinesPage">
        {routinesToDisplay.map((element) => {
          return (
            <div className="Single-Routine">
              {console.log(element)}
              <h1 className="RoutineInfo a name">{element.name}</h1>
              <h3 className="RoutineInfo a goal">Goal : {element.goal}</h3>
              <h3 className="RoutineInfo b creatorName">
                Created By : {element.creatorName}
              </h3>
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
            </div>
          );
        })}
      </div>
    );
  };