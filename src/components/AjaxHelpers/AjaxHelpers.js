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

//routine_activities routes