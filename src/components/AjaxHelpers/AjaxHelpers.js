const APIURL = `http://localhost:3000/api`;



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