import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { getAllRoutines, createRoutine, destroyRoutine, editRoutine} from "../AjaxHelpers/AjaxHelpers.js"

export let MyRoutines = (props) => {
    const{userInfo, isLoggedIn,userToken} = props;
    const[routinesToDisplay, setRoutinesToDisplay] = useState([]);
    const[addingNewRoutine, setAddingNewRoutine]= useState(false);
    const[editingRoutine, setEditingRoutine]= useState(false);
    const[postToEdit,setPostToEdit]=useState({})
    //need this?
    console.log('userInfo in MyRoutines')
    console.log(userInfo)
    const fetchData = async () =>{
            const allRoutines = await getAllRoutines();
            setRoutinesToDisplay(allRoutines);
        }
    useEffect(()=>{
        fetchData();
    },[])
    async function handleAddNewRoutine(e){
        e.preventDefault();
        setAddingNewRoutine(true);
    }
    async function handleSubmitNewRoutine(e){
        e.preventDefault();
        let info={}
        info['name']=document.getElementById('RoutineName').value;
        info['goal']=document.getElementById('RoutineGoal').value;
        info['isPublic']=document.getElementById('isPublic').checked;
        let newRoutine= await createRoutine(info,userToken);
        console.log(newRoutine)
        if (newRoutine.error){
            alert(newRoutine.error)
        }else{
            alert(newRoutine.success)
            fetchData();
            setAddingNewRoutine(false);
        }
    }
    async function handleDeletePost(e){
        e.preventDefault();
        let response = await destroyRoutine(e.target.id,userToken);
        console.log(response)
        if(response.success){
            alert('Routine successfully Deleted!')
            fetchData();
        }
        else{
            alert(response.error)
        }
    }
    async function handleEditPost(e){
        e.preventDefault();
        let postId= e.target.id;
        routinesToDisplay.forEach((element)=>{
            if(element.id==postId)
                setPostToEdit(element)
        })
        setEditingRoutine(true);
    }
    async function handleSubmitEditPost(e){
        e.preventDefault();
        let info={}
        let name=document.getElementById('RoutineName').value;
        let goal=document.getElementById('RoutineGoal').value;
        let isPublic=document.getElementById('isPublic').checked;
        if (!name && !goal && (postToEdit.isPublic === isPublic)){
            alert('Some edit must be submitted to edit the post!')
        } 
        if (name)
            info['name'] = name;
        else 
            info['name'] = postToEdit.name;
        if (goal)
            info['goal'] = goal;
        else 
            info['goal'] = postToEdit.goal;        
        info['isPublic']=isPublic;
        info['routineId'] = postToEdit.id;        
        let Routine= await editRoutine(info,userToken);
        console.log(Routine)
        if (Routine.error){
            alert(Routine.error)
        }else{
            alert(Routine.success)
            fetchData();
            setEditingRoutine(false);
        }
    }
    function EditingRoutine(){
        return(
            <div>
                <div id='OutdatedPost'>
                <h1>Old Post</h1>
                <h1 className="RoutineInfo a name">Title : {postToEdit.name}</h1>
                <h3 className="RoutineInfo b goal">Goal : {postToEdit.goal}</h3>
                </div>            
                <form id='UpdatingRoutineForm'>
                    <h1>What would you like it to be?</h1>
                    <input type='text' id='RoutineName' placeholder='Title'/>
                    <input type='text' id='RoutineGoal' placeholder='Goal'/>
                    <div>
                        <input type='checkbox' id='isPublic'></input>
                        <span>Publish to the public?</span>
                    </div>
                    <button onClick={handleSubmitEditPost} type='submit' >Submit</button>
                </form>
            </div>
        )
    }
    let NewRoutineForm = (props) =>{
        return (
            <form id='NewRoutineForm'>
                <h1>New Routine Form</h1>
                <input type='text' id='RoutineName' placeholder='Title'></input>
                <input type='text' id='RoutineGoal' placeholder='Goal'></input>
                <div>
                    <input type='checkbox' id='isPublic'></input>
                    <span>Publish to the public?</span>
                </div>
                <button onClick={handleSubmitNewRoutine} type='submit' >Submit</button>
            </form>
        )
    }

    if (editingRoutine)
        return <EditingRoutine></EditingRoutine>
        

    return (
        <div id='RoutinesPage'>
            {isLoggedIn && !addingNewRoutine ? <button onClick={handleAddNewRoutine}>Add new Routine?</button> : null}
            {addingNewRoutine ? <NewRoutineForm></NewRoutineForm> : null}
            {routinesToDisplay.map((element)=>{
                return(
                    
                    <div className="Single-Routine">{console.log(element)}
                    <h1 className="RoutineInfo a name">{element.name}</h1>
                    <h3 className="RoutineInfo a goal">Goal : {element.goal}</h3>
                    <h3 className="RoutineInfo b creatorName">Created By : {element.creatorName}</h3>
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
                    {(element.creatorId == userInfo.id) ? <div id="RoutineButtons"><button onClick={handleEditPost} id={element.id}>edit</button> <button onClick={handleDeletePost} id={element.id}>delete</button></div>: null }
                    </div>
                )
            })}
        </div>
    )
}


export let Routines = (props) => {
    const[routinesToDisplay, setRoutinesToDisplay] = useState([]);

    const fetchData = async () =>{
        const allRoutines = await getAllRoutines();
        setRoutinesToDisplay(allRoutines);
    }

    useEffect(()=>{
        fetchData();
    },[])

    return (
        <div id='RoutinesPage'>
            {routinesToDisplay.map((element)=>{
                return(                    
                    <div className="Single-Routine">{console.log(element)}
                    <h1 className="RoutineInfo a name">{element.name}</h1>
                    <h3 className="RoutineInfo a goal">Goal : {element.goal}</h3>
                    <h3 className="RoutineInfo b creatorName">Created By : {element.creatorName}</h3>
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