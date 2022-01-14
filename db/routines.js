const {client} = require('./client.js');

async function getRoutineById(id) {
  try {
    const {rows} = await client.query(`
      SELECT * FROM routines
      WHERE id=${id};
    `)
    return rows;
  } catch (err) {
    console.log('trouble in getRoutineById!', err);
  }
}
async function getRoutinesWithoutActivities(id) {
  try {
    const {rows} = await client.query(`
      SELECT * FROM routines;
    `)
    return rows;
  } catch (err) {
    console.log('trouble in getRoutinesWithoutActivities!', err);
  }
}
async function getAllRoutines(id) {
  try {
    const {rows : routines} = await client.query(`
      SELECT routines.id, "creatorId","isPublic",name,goal, username AS "creatorName"
      FROM routines
      Join users 
      ON routines."creatorId" =users.id;
    `);
    let updatedRoutines = routines.map(element =>{
      element['activities']=[];
      return element;
    });
    const{rows : activities} = await client.query(`
    SELECT name,description,duration,count,"routineId" 
    FROM routineActivities 
    JOIN activities 
    ON routineActivities."activityId"=activities.id;
    `);    
    let updatedRoutines2 = updatedRoutines.map((routineElement)=>{      
      activities.forEach((activitiesElement) => {
        if (activitiesElement.routineId === routineElement.id)
        {
          delete activitiesElement.routineId;
          routineElement.activities.push(activitiesElement);
        }        
      });
      return routineElement;
    })
    return updatedRoutines2;

  } catch (err) {
    console.log('trouble in getRoutinesWithoutActivities!', err);
  }
}
async function getAllPublicRoutines() {
  try {
    const {rows : routines} = await client.query(`
      SELECT routines.id, "creatorId","isPublic",name,goal, username AS "creatorName"
      FROM routines
      Join users 
      ON routines."creatorId" =users.id;
    `);
    let updatedRoutines = [];

    routines.forEach(element =>{
      element['activities']=[];
      if (element.isPublic)
       updatedRoutines.push(element)
    });
   
    const{rows : activities} = await client.query(`
    SELECT name,description,duration,count,"routineId" 
    FROM routineActivities 
    JOIN activities 
    ON routineActivities."activityId"=activities.id;
    `);    
    let updatedRoutines2 = updatedRoutines.map((routineElement)=>{      
      activities.forEach((activitiesElement) => {
        if (activitiesElement.routineId === routineElement.id)
        {
          delete activitiesElement.routineId;
          routineElement.activities.push(activitiesElement);
        }        
      });
      return routineElement;
    })
    return updatedRoutines2;

  } catch (err) {
    console.log('trouble in getAllPublicRoutines!', err);
  }
}
async function getAllRoutinesByUser({username}) {
  try {
    const {rows : routines} = await client.query(`
      SELECT routines.id, "creatorId","isPublic",name,goal, username AS "creatorName"
      FROM routines
      Join users 
      ON routines."creatorId" =users.id
    `);
    let updatedRoutines = [];
    routines.forEach(element =>{
      if (element.creatorName=== username){
        element['activities']=[];
        updatedRoutines.push(element)
      }
    });
    const{rows : activities} = await client.query(`
    SELECT name,description,duration,count,"routineId" 
    FROM routineActivities 
    JOIN activities 
    ON routineActivities."activityId"=activities.id;
    `);    
    let updatedRoutines2 = updatedRoutines.map((routineElement)=>{      
      activities.forEach((activitiesElement) => {
        if (activitiesElement.routineId === routineElement.id)
        {
          delete activitiesElement.routineId;
          routineElement.activities.push(activitiesElement);
        }        
      });
      return routineElement;
    })
    return updatedRoutines2;

  } catch (err) {
    console.log('trouble in getAllPublicRoutines!', err);
  }
}
async function getPublicRoutinesByUser({username}) {
  try {
    const {rows : routines} = await client.query(`
      SELECT routines.id, "creatorId","isPublic",name,goal, username AS "creatorName"
      FROM routines
      Join users 
      ON routines."creatorId" =users.id
    `);
    let updatedRoutines = [];

    routines.forEach(element =>{
      if (element.creatorName === username  && element.isPublic === true){
        element['activities']=[];
        updatedRoutines.push(element)
      }
    });
    const{rows : activities} = await client.query(`
    SELECT name,description,duration,count,"routineId" 
    FROM routineActivities 
    JOIN activities 
    ON routineActivities."activityId"=activities.id;
    `);    
    let updatedRoutines2 = updatedRoutines.map((routineElement)=>{      
      activities.forEach((activitiesElement) => {
        if (activitiesElement.routineId === routineElement.id)
        {
          delete activitiesElement.routineId;
          routineElement.activities.push(activitiesElement);
        }        
      });
      return routineElement;
    })
    return updatedRoutines2;

  } catch (err) {
    console.log('trouble in getAllPublicRoutines!', err);
  }
}
async function getPublicRoutinesByActivity({id}) {
  try {
    const {rows : routines} = await client.query(`
      SELECT routines.id, "creatorId","isPublic",name,goal, username AS "creatorName"
      FROM routines
      Join users 
      ON routines."creatorId" =users.id
    `);
    let updatedRoutines = [];

    routines.forEach(element =>{
      if (element.isPublic === true){
        element['activities']=[];
        updatedRoutines.push(element)
      }
    });
    const{rows : activities} = await client.query(`
    SELECT name,description,duration,count,"routineId","activityId" 
    FROM routineActivities 
    JOIN activities 
    ON routineActivities."activityId"=activities.id;
    `);    
    let updatedRoutines2 = updatedRoutines.map((routineElement)=>{      
      activities.forEach((activitiesElement) => {
        if (activitiesElement.routineId === routineElement.id)
        {
          delete activitiesElement.routineId;
          routineElement.activities.push(activitiesElement);
        }        
      });
      return routineElement;
    })   
    let updatedRoutines3 = [];
    updatedRoutines2.forEach(routineElement=>{
      routineElement.activities.forEach(activitiesElement=>{
        console.log(activitiesElement.activityId)
        if(activitiesElement.activityId === id){
          updatedRoutines3.push(routineElement)
        }
      })
    })
    return updatedRoutines3;
  } catch (err) {
    console.log('trouble in getAllPublicRoutines!', err);
  }
}
async function createRoutine({creatorId,isPublic,name,goal}){
  try {
    const {rows : [routine]} = await client.query(`
      INSERT INTO routines("creatorId","isPublic",name,goal)
      VALUES ($1,$2,$3,$4)
      ON CONFLICT (name) DO NOTHING 
      RETURNING *;
    `,[creatorId,isPublic,name,goal])
    return routine;
  }catch(err){
  console.log('trouble in createRoutine', err);
  }
}

module.exports={
  createRoutine,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity
}