import React,{Component} from "react";
import '../Css/index.css';
class Questions extends Component{
render(){
return(
  <div className="container">
      <nav>
         <div className="row">   
            <div className="col-sm-3">  
                <img src='./codecatalyst.svg' alt='logo'></img>
            </div> 
            <div className="col-sm-6"/> 
            <div className=" logout col-sm-3">  
                <p>LOGOUT</p>
            </div>
         </div>
     </nav>
     
         <div className=" tops row">
            <div className=" icons col-sm-3">
                  <div><i className="fab fa-facebook-f"></i></div>
                  <div> <i className="fab fa-twitter"></i></div>
                   <div><i className="fab fa-linkedin-in"></i></div>
                  <div> <i className="fas fa-paper-plane"></i></div> 
            </div>
         <div className="col-sm-6">
             <h3 className="title">Code Catalyst </h3>
             <h3 className="title">Rwanda</h3> 
        </div>
   <div className=" col-sm-3 ">
       <div className="sign">
           <i className=" sticky fas fa-sticky-note"></i>
           <i className="ba  fas fa-bars"></i>
           <i className="bar  fas fa-bars"></i>
           <i className="pencil fas fa-pencil-alt"></i>
      </div>  
     </div>
  </div>
  <div className="middle row">
  <div className="col-sm-3">
  </div>
   <div className="col-sm-9">   
         <small>Please complete the following questions</small>      
          </div>
      </div>
 <div className="table row"> 
<div className="col-sm-2">
</div>
<div className="col-sm-5">
    <form>
      <div className="form-name">
         <label className="key_values">Questions</label>
            <input class="form-control" 
            type="text" 
            placeholder="Write Your text here"
           id="cardCVCs" 
           /> 
       </div>
    </form>
     </div>
     </div>
        <div className="set row">
            <div className=" save col-sm-6">
                  SAVE TO CONTINUE LATER
                 <div className="line"></div>
             </div>
    
           <div className="col-sm-6">
               <button  type="button" class="btn btn-danger"> NEXT</button>
           </div>
       </div>
          <div className="row">
              <div className=" footer col-sm-12"/>
               
           </div>
        </div>   
)
}
}
export default Questions;
