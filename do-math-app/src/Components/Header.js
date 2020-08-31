import React from 'react';

function Header(props)
{
    return(
        <div>
            <h2> WELCOME TO DOMATH </h2>
            {props.saveIcon ? <h4>Saving...</h4> : <React.Fragment/>}
        </div>
        
    )
   
}

export default Header;