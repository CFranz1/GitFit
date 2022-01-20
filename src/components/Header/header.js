import { useHistory} from "react-router-dom"
import {Link} from "react-router-dom"


export let Header = () => {
    

   

    return(
        <div id='Header-Container'>
            <h1 id='Logo'>GIT TOO FIT TO QUIT</h1>
            <img src="UNIV_FitnessTrackr_Starter\src\Assets\Images\GIT_FIT.jpg"></img>
            <div id='Tag-Links'>                
                <Link to='/Home' className="Header-Link">Home</Link>
                <Link to='/Posts' className="Header-Link">Posts</Link>              
            </div>
        </div>
    )
}