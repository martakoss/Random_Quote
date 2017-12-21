import React from 'react';
import ReactDOM from 'react-dom';


class QuotesGenetaror extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
         response: false,
         author: '',
         quote: ''
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


  handleClick = () => {
      let randomNumber = this.getRandomNumber(0,this.state.response.length);
      this.setState({
        author: this.state.response[randomNumber].author,
        quote: this.state.response[randomNumber].quote
      })
    }

  render(){
    console.log(this.state.response);
    if(this.state.response){
      return <div>
                <div className="quote">
                  <h1>{this.state.quote}</h1>
                  <h2>{this.state.author}</h2>
                </div>
               <div className='button'>
                 <button onClick={this.handleClick}>Get a new quote</button>
               </div>
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
        <div>Random quote generator</div>
      </div>
    )
  }
})


class QuotesApp extends React.Component {
  render () {
    return <div className="mainContainer">
              <AppTitle/>
              <QuotesGenetaror/>
           </div>
  }
}



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
