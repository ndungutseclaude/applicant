import React, { Component } from 'react';
import Success from './Success';
import { getJwt } from './utils/jwt';
import axios from 'axios';
import Footer from './Footer';
import './App.css'




class AddUrl extends Component {
  state = {
    git_hub_url: '',
    heroku_url:'',
    alert_message:'',
    errors: {},
    loading: false
  };
  //handle input
  handleChange=(event)=>{
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
     }

  onSubmit=(event)=>{ 
    event.preventDefault()
    const jwt = getJwt()
    //console.log(jwt);

    if(!jwt){
        console.log('no token found');
        //this.props.history.push('/')
    }
    
    var data={git_hub_url:this.state.git_hub_url, heroku_url:this.state.heroku_url}
       
    console.log(jwt)
    this.setState({loading: true})
    axios.post('https://codecatalyst-test.herokuapp.com/api/project/submit',data,
    {headers: {Authorization: `Token ${jwt}`}})
    .then(res =>{
        this.setState({alert_message:'success'})
        alert('well done');
        this.props.history.push('/')
    })
    .catch(err =>{
        localStorage.removeItem("user-token")
        alert('please try again')
        this.setState({
          loading: false, 
          git_hub_url:'', 
          heroku_url:''
      })
        //this.props.history.push('/')
    })
 }

//FUNCTION TO LOGOUT
logoutFunctin=(e)=>{

  localStorage.removeItem('user-token')
  this.props.history.push('/')
  console.log('you are loggedOut')
}
  render() {
    const { git_hub_url,heroku_url} = this.state;

    return (
      <div>
      <div className="ui container">
              
              <img src="code_catalyst.svg" alt="not available"/>
              <button onClick={this.logoutFunctin} 
                      style={{float:'right'}}
                      className="btn">
                      LOGOUT
              </button>
      </div>
      {this.state.alert_message=="success"?<Success/>:null}
      <div className="urlWrapper">
        <div className="iconsInAddUrl">
          <i className="fab fa-facebook-f facebook"></i>
          <i className="fab fa-twitter twitter"></i>
          <i className="fab fa-linkedin-in linked"></i>
          <i className="fas fa-paper-plane send"></i>
        </div>
        <div>
          <h1 style={{fontFamily: 'time new roman', paddingBottom: '2rem'}}><b>Submit your<br/> <span style={{paddingLeft: '3rem'}}>Project</span></b></h1> 
          <p>Project Details: 
              <a href="https://drive.google.com/drive/folders/1JTP0lGGTgGhFAuIl27WeMsvenmHzflT5" target='_blank'>
                <span style={{color: 'red', paddingBottom: '2rem'}}>This is the link to the project you need to complete <i className="fas fa-arrow-up"></i></span>
              </a>
          </p>
          <form onSubmit={this.onSubmit}>    
                      <div>
                            <div>
                                <label><b>GitHub URL</b></label>
                                <input className="form-control" 
                                      type="url" 
                                      required placeholder="GitHub URL of your project" 
                                      id="gitInput" 
                                      name='git_hub_url'
                                      value={git_hub_url}
                                      onChange={this.handleChange}
                                    />
                              </div>
                      </div>

                      <div>
                              <div>
                                  <label><b>Heroku URL</b></label>
                                  <input className="form-control" 
                                        type="url" 
                                        required placeholder="Heroku URL of your project" 
                                        id="gitInput"
                                        name='heroku_url' 
                                        value={heroku_url}
                                        onChange={this.handleChange}
                                        />
                                </div>
                      </div>              
                      <button type="submit" className="ui btn urlButoonStyling">
                        {this.state.loading && <i className="fas fa-spinner fa-spin"></i>}
                        SUBMIT APPLICATION
                      </button>                 
          </form>
        </div>
        <div>
          <i className="pencil alternate icon" id="pencilStyling"></i>
        </div>

      </div>
          {/* <div className='heading'> */}

                                  {/* <div className="info">
                                        <label onClick={this.logoutFunction} 
                                                className="person"><b className="name">Log out</b>
                                        </label> 
                                  </div> */}
                                {/* <aside>
                                    <div><i className="fab fa-facebook-f facebook"></i></div>
                                    <div><i className="fab fa-twitter twitter"></i></div>
                                    <div><i className="fab fa-linkedin-in linked"></i></div>
                                    <div><i className="fas fa-paper-plane send"></i></div>
                                </aside> */}

              {/* <h1>Submit your Project</h1>  */}
              {/* <p>Project Details: 
              <a href="https://drive.google.com/drive/folders/1JTP0lGGTgGhFAuIl27WeMsvenmHzflT5" target='_blank'>
              <span>This is the link to the project you need to complete <i className="fas fa-arrow-up"></i></span>
              </a>
              </p> */}
              
                    {/* <div className="crayon">
                        <div className='pencil'></div>
                        <div className='before'></div>
                        <div className='after'></div>
                    </div> */}

          {/* </div> */}
          {/* <form onSubmit={this.onSubmit}>    
                      <div className="form-row names" >
                            <div className="form-name">
                                <label>GitHub URL</label>
                                <input className="form-control" 
                                      type="url" 
                                      required placeholder="GitHub URL of your project" 
                                      id="cardCVC" 
                                      name='git_hub_url'
                                      value={git_hub_url}
                                      onChange={this.handleChange}
                                    />
                              </div>
                      </div>

                      <div className="form-row names">
                              <div className="sname form-name">
                                  <label>Heroku URL</label>
                                  <input className="form-control" 
                                        type="url" 
                                        required placeholder="Heroku URL of your project" 
                                        id="cardCVC"
                                        name='heroku_url' 
                                        value={heroku_url}
                                        onChange={this.handleChange}
                                        />
                                </div>
                      </div>              
                                <button type="submit" className="btn btn-success button1">SUBMIT APPLICATION</button>                 
        </form> */}
              <Footer/>
    </div>

    );
    
    }
}
 
export default AddUrl;

