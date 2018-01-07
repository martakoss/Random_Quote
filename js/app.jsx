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
                    let uniqueCategories = [];
                    let quotesCategories= data.map((quote, index) => {
                      if (uniqueCategories.indexOf(quote.cat) === -1) {
                          uniqueCategories.push(quote.cat)
                      }
                    });
                    console.log(quotesCategories);
                    console.log("cytat na 0",data[0]);
                       return this.setState({response:data, categories: uniqueCategories})
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

  handleCategoryChange = (category) => {
    let matchingTheQuote = Object.keys(this.state.response).filter(key => this.state.response[key].cat === category)
    .map((key, index) => {
      return [this.state.response[key].author, this.state.response[key].quote]
    })
    console.log(matchingTheQuote);
    let randomNumber = this.getRandomNumber(0,matchingTheQuote.length);
    this.setState({
      author: matchingTheQuote[randomNumber][0],
      quote: matchingTheQuote[randomNumber][1]
    });
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
                <CategoriesSelector
                  categories={this.state.categories}
                  changeCategory = {this.handleCategoryChange.bind(this)}
                />
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
         categories: this.props.categories,
         selectedCategory: 'no category selected'
       };
  }

  onCategoryChange(e){
    e.preventDefault();
    this.props.changeCategory(this.state.selectedCategory);
  }

  onCategorySelection(event){
    console.log(event.target.value);
    this.setState({
      selectedCategory: event.target.value
    });
  }

  render() {
    let selector = this.state.categories.map((elem,index)=>{
        console.log(elem);
        return <option key={index} id={elem} value={elem}>
                {elem}
              </option>
            })
    console.log(selector);
    console.log(this.state.selectedCategory);
    return(
      <div>
        <form>
          <div className="form">
            <select className="select" onChange={(event) => this.onCategorySelection(event)}>
              {selector}
            </select>
            <button className="submit" onClick={(e) => this.onCategoryChange(e)}>
              Set the chosen category
            </button>
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
