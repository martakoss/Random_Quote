import React from 'react';
import ReactDOM from 'react-dom';

class AppTitle extends React.Component {
  render() {
    return(
      <div className="title">
        <div>Random quote generator</div>
      </div>
    )
  }
}

class QuotesGenetaror extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
         response: false,
         author: '',
         quote: '',
         categories: ''
       };
  }

  getData = () => {
         let url = "http://localhost:3000/quotes"
          fetch(url).then(resp => {
                       return resp.json();
                  }).then(data => {
                    let quotesCategories= data.map((quote, index) => {
                      return quote.cat;
                    });
                    console.log(quotesCategories);
                    console.log("cytat na 0",data[0]);
                       return this.setState({response:data, categories: quotesCategories})
                  }).catch(err => this.setState({respone:"There is no such quote"}))
}


  componentDidMount(){
    this.getData();
  }

    getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
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
    console.log(this.state.categories);
    if(this.state.response){
      return <div>
                <div className="quote">
                    <h1>{this.state.quote}</h1>
                    <h2>{this.state.author}</h2>
                </div>
                <div className='button'>
                    <button onClick={this.handleClick}>Get a new quote</button>
                </div>
                <CategoriesSelector categories={this.state.categories}/>
            </div>
    }else {
      return null
    }
  }
}

class CategoriesSelector extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
         categories: this.props.categories
       };
  }

  render() {
    let selector = this.state.categories.map((elem,index)=>{
        console.log(elem);
        return <option key={index} id={elem} value={elem}>
                {elem}
              </option>
            })
    console.log(selector);
    return(
      <div>
        <form>
          <div className="form">
            <select className="select">{selector}</select>
            <input className="submit" type="submit" value="Set the chosen category"/>
          </div>
        </form>
      </div>
    )
  }
}


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
