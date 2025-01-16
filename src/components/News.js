import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string

  }

  capitlizeFirstLatter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    // console.log("News Item Constructor form News Component");
    this.state ={
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      nextDisabled: false
    }
    document.title =`${this.capitlizeFirstLatter(this.props.category)} - Newsapp`
}

async updateNews(){
  this.props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
  this.setState({loading:true})
  let data = await fetch(url);
  this.props.setProgress(30);
  let parsedData = await data.json()
  this.props.setProgress(70);
  console.log(parsedData);
  this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false, nextDisabled: this.state.page + 1 >= Math.ceil(this.state.totalResults / this.props.pageSize)})
  this.props.setProgress(100);
}

async componentDidMount(){
  // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
  // this.setState({loading:true})
  // let data = await fetch(url);
  // let parsedData = await data.json()
  // console.log(parsedData);
  // this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false})
  this.updateNews()
}

handlePreviousClick = async ()=>{
  console.log("Previous");

  // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  // this.setState({loading:true})
  // let data = await fetch(url);
  // let parsedData = await data.json()
  // console.log(parsedData);
  // this.setState({
  //   page: this.state.page - 1,
  //   articles: parsedData.articles,
  //   loading:false
  // })
  this.setState({page: this.state.page - 1})
  this.updateNews()
}

handleNextClick = async ()=>{
  console.log("Next");
  // if(!(this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize))){
  //   console.log("No more pages");
  //   this.setState({ nextDisabled: true });
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true})
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   console.log(parsedData);
  //   this.setState({
  //     page: this.state.page+1,
  //     articles: parsedData.articles,
  //     nextDisabled: this.state.page + 1 >= Math.ceil(this.state.totalResults / this.props.pageSize),
  //     loading:false
  //   })
  // }
  this.setState({page: this.state.page + 1})
  this.updateNews()
}

fetchMoreData = async () => {
  this.setState({page: this.state.page + 1})
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
  // this.setState({loading:true})
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);
  this.setState({articles: this.state.articles.concat(parsedData.articles), 
    totalResults: parsedData.totalResults, 
    nextDisabled: this.state.page + 1 >= Math.ceil(this.state.totalResults / this.props.pageSize)})
};

  // render() {
  //   // console.log("News Item Render form News Component");
  //   return (
  //     <div className="container my-3">
  //       <h1 className='text-center'>News App - Top {this.capitlizeFirstLatter(this.props.category)} Headlines</h1>
  //       {this.state.loading && <Spinner />}
  //       <div className="row">
  //       {!this.state.loading && this.state.articles.map((element)=>{
  //         return <div className="col-md-4" key={element.url}>
  //           <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,50):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
  //         </div>
  //       })}
  //       </div>
  //       <div className="container d-flex justify-content-between">
  //       <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePreviousClick}>&larr; Previous</button>
  //       <button disabled={this.state.nextDisabled} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
  //       </div>
  //     </div>
  //   )
  // }
  render() {
    // console.log("News Item Render form News Component");
    return (
      <div className="container my-3">
        <h1 className='text-center'>News App - Top {this.capitlizeFirstLatter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}>
            <div className="container">
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,50):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        
      </div>
    )
  }
}

export default News
