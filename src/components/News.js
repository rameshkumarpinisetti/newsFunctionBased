import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {
  const [articles, setaAticles] = useState([])
  const [loading, setaLoading] = useState(true)
  const [page, setaPage] = useState(1)
  const [totalResults, setaTotalResults] = useState(0)

  const capitlizeFirstLatter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

const updateNews = async () =>{
  props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
  setaLoading(true)
  let data = await fetch(url);
  props.setProgress(30);
  let parsedData = await data.json()
  props.setProgress(70);
  console.log(parsedData);
  setaAticles(parsedData.articles)
  setaTotalResults(parsedData.totalResults)
  setaLoading(false)

  props.setProgress(100);
}

useEffect(() => {
  updateNews();
  document.title =`${capitlizeFirstLatter(props.category)} - Newsapp`
}, []);

  async function fetchMoreData() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setaPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setaAticles(articles.concat(parsedData.articles || []));
    setaTotalResults(parsedData.totalResults);
    console.log(parsedData);
  }


  return (
    <div className="container my-5 py-5">
      <h1 className='text-center'>News App - Top {capitlizeFirstLatter(props.category)} Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}>
          <div className="container">
      <div className="row">
      {articles.map((element)=>{
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

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize:PropTypes.number,
  category: PropTypes.string

}
export default News
