import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getJwt } from './utils/jwt';
import axios from 'axios';
import './Component.css';
import Header from './Header';
import Footer from './Footer';



class AddUrl extends Component {
  state = {
    git_hub_url: '',
    heroku_url:'',
    link:'',
    errors: {}
  };

  onSubmit=(event)=>{ 
    event.preventDefault()
    const jwt = getJwt()
    //console.log(jwt);

    if(!jwt){
        console.log('no token found');
        //this.props.history.push('/')
    }
    
    var data={git_hub_url:this.state.git_hub_url, heroku_url:this.state.heroku_url}
    var link={link:this.state.link}
       
       console.log(jwt)
    axios.post('https://codecatalyst-test.herokuapp.com/api/project/submit',data,
    {headers: {Authorization: `Token ${jwt}`}})
    .then(res =>{
        this.setState({url: res.data})
        console.log('well done');
    })
    .catch(err =>{
        localStorage.removeItem("user-token")
        console.log('the request denied')
        this.props.history.push('/')
    })
    console.log(jwt)
    axios.get('https://codecatalyst-test.herokuapp.com/api/project',link,
    {headers: {Authorization: `Token ${jwt}`}})
    .then(res =>{
        this.setState({url: res.data})
        
    })
    .catch(err =>{
      //localStorage.removeItem("user-token")
      console.log('the request denied')
      //this.props.history.push('/')
    })
 }

//FUNCTION TO LOGOUT
 logoutFunction=(e)=>{
   localStorage.removeItem('user-token')
   this.props.history.push('/')
   console.log('you are loggedOut')
 }
  onChange = e => this.setState({ [e.target.name]: e.target.value });


  render() {
    const { git_hub_url,heroku_url} = this.state;

    return (
      <div className="Phonebook" >
      <Header/>
          <div className='heading'>

                                  <div className="info">
                                        <label onClick={this.logoutFunction} 
                                                className="person"><b className="name">Log out</b>
                                        </label> 
                                  </div>
          <aside>
                                    <div><i className="fab fa-facebook-f facebook"></i></div>
                                    <div><i className="fab fa-twitter twitter"></i></div>
                                    <div><i className="fab fa-linkedin-in linked"></i></div>
                                    <div><i className="fas fa-paper-plane send"></i></div>
                                </aside>

              <h1>Submit your Project</h1> 
              <p>Project Details: 
              <Link to= "https://codecatalyst-test.herokuapp.com/api/project/"> 
              <span>This is the link to the project you need to complete <i className="fas fa-arrow-up"></i></span>
              </Link>
              </p>
              <div className="pencil"></div>
          </div>
                  <form onSubmit={this.onSubmit}>    
                      <div className="form-row names" >
                            <div className="form-name">
                                <label>GitHub URL</label>
                                <input className="form-control" 
                                      type="url" 
                                      required placeholder="GitHub URL of your project" 
                                      id="cardCVC" 
                                      name='git_hub_url'
                                      value={git_hub_url}
                                      onChange={this.onChange}
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
                                        onChange={this.onChange}
                                        />
                                </div>
                      </div>              
                                <button type="submit" className="btn btn-success button1">SUBMIT APPLICATION</button>                 
              </form>
              <Footer/>
    </div>

    );
  }
}
 
export default AddUrl;

