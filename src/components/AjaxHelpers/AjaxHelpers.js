const APIURL = `http://localhost:3000/api`;


//users to do users/me and users/:username/routines
export async function registerUser(user){
    try{
      const response = await fetch(`${APIURL}/users/register`,{
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user})
      })
      const result= await response.json();
      return result;
    }
    catch (err) {
      console.log('Trouble registering user', err)
    }   
  }

export async function logInUser(user){
    try{
      const response = await fetch(`${APIURL}/users/login`,{
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const result= await response.json();
      return result;
    }
    catch (err) {
      console.log('Trouble registering user', err)
    }   
  }

//activiteies routes
export async function getAllActivities(){
  try{
    const response = await fetch(`${APIURL}/activities`)
    const result= await response.json();
    console.log(result)
    return result;
  }
  catch (err) {
    console.log('Trouble getting all Activities', err)
  }   
}

//routines routes
export async function getAllRoutines(){
  try{
    const response = await fetch(`${APIURL}/routines`)
    const result= await response.json();
    console.log(result)
    return result;
  }
  catch (err) {
    console.log('Trouble getting all Routines', err)
  }   
}

export async function createRoutine(info,userToken){
  try{
    const response = await fetch(`${APIURL}/routines/`,{
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(info)
    })
    const result= await response.json();
    return result;
  }catch(err){
    console.log('Trouble creatingRoutine!')
  }
}

export async function destroyRoutine(routineId,userToken){
  try{
    const response = await fetch(`${APIURL}/routines/${routineId}`,{
      method: "DELETE",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    })
    const result= await response.json();
    return result;
  }catch(err){
    console.log('Trouble creatingRoutine!')
  }
}

export async function editRoutine(info,userToken){
  try{
    let routineId = info.routineId;
    const response = await fetch(`${APIURL}/routines/${routineId}`,{
      method: "PATCH",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(info)
    })
    const result= await response.json();
    return result;
  }catch(err){
    console.log('Trouble creatingRoutine!')
  }
}

//routine_activities routes