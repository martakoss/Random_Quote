import React from 'react';
import ReactDOM from 'react-dom';


class QuotesApp extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
         response: false
       };
     }

  getData = () => {
         let url = "http://localhost:3000/quotes"
          fetch(url).then(resp => {
                       return resp.json();
                  }).then(data => {
                    console.log("cytat na 0",data[0]);
                       return this.setState({response:data})
                  }).catch(err => this.setState({respone:"There is no such quote"}))
      }

  componentDidMount(){
    this.getData();
  }

    getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  render(){
    let randomNumber = this.getRandomNumber(0,this.state.response.length);
    if(this.state.response){
      return <div className="mainContainer">
            <AppTitle/>
            <div className="quote">
              <h1>{this.state.response[randomNumber].quote}</h1>
              <h2>{this.state.response[randomNumber].author}</h2>
            </div>
            <GenerateButton/>
          </div>
    }else {
      return null
    }
  }
}

var AppTitle = React.createClass({
  render: function() {
    return(
      <div className="title">
        <div>Generate your own quote</div>
      </div>
    )
  }
})

var GenerateButton = React.createClass({
  render: function() {
    return( <div className='button'>
            <button>Get new quote</button>
            </div>
    )
  }
})

class App extends React.Component {
  render () {
    return <QuotesApp/>
  }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});
