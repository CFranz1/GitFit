import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { getAllRoutines} from "../AjaxHelpers/AjaxHelpers.js"

export let Routines = (props) => {
    const[routinesToDisplay, setRoutinesToDisplay] = useState([]);


    useEffect(() => {
        const fetchData = async () =>{
            const allRoutines = await getAllRoutines();
            setRoutinesToDisplay(allRoutines);
        }
        fetchData();
    }, [])
    return (
        <div id='HomePage'>
            {routinesToDisplay.map((element)=>{
                return(
                    <div className="Single-Routine">
                    <h1 className="RoutineInfo a">{element.name}</h1>
                    <h3 className="RoutineInfo b">Created By : {element.creatorName}</h3>
                    <h3 className="RoutineInfo a">Goal : {element.goal}</h3>
                    <h2 className="RoutineInfo b">Activities for This Routine</h2>
                    {element.activities.length ? 
                        <table className="ActivitiesTable">
                            <tr>
                                <th className="spacer"></th>
                                <th>Exercise</th>
                                <th>Description</th>
                                <th>Count</th>
                                <th>Duration</th>
                                <th className="spacer"></th>
                            </tr>
                            {element.activities.map((element2)=>{
                                return(
                                    <tr className="ActivitiesRow">
                                        <td className="spacer"></td>
                                        <td className="ActivitiesInfo">{element2.name}</td>
                                        <td className="ActivitiesInfo">{element2.description}</td>
                                        <td className="ActivitiesInfo">{element2.count}</td>
                                        <td className="ActivitiesInfo">{element2.duration}</td>
                                        <td className="spacer"></td>
                                    </tr>
                                )
                    })}
                    
                    
                    </table> : null}
                    
                    </div>
                )
            })}
        </div>
    )
}