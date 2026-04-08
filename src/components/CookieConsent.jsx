import { useState } from "react";

function CookieConsent(){

const [show,setShow] = useState(true);

if(!show) return null;

return(

<div className="cookie">

<p>
This website uses cookies to improve user experience.
</p>

<button onClick={()=>setShow(false)}>Accept</button>

<button onClick={()=>setShow(false)}>Decline</button>

</div>

);

}

export default CookieConsent;