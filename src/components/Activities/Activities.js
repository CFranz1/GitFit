import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { getAllActivities} from "../AjaxHelpers/AjaxHelpers.js"

export let Activities = (props) => {
    const[activitiesToDisplay, setActivitiesToDisplay] = useState([]);


    useEffect(() => {
        const fetchData = async () =>{
            const activities = await getAllActivities();
            console.log(activities)
            setActivitiesToDisplay(activities);
        }
        fetchData();
    }, [])

    return (
        <div id='ActivitiesPage'>
            <h1>All Public Activities</h1>
            <table id='ActivityTable'>
                <tr>
                    <th className="ActivitiesInfo">Activity Name</th>
                    <th className="ActivitiesInfo">Activity Description</th>
                </tr>
            {activitiesToDisplay.map((element)=>{
                return(
                    <tr className="ActivitiesRow">
                        <td className="ActivitiesInfo">{element.name}</td>
                        <td className="ActivitiesInfo">{element.description}</td>
                    </tr>
                )})}
            </table>
        </div>
    )
}