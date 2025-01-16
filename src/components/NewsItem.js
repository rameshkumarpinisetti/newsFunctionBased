import React, { Component } from 'react'
// import { data } from 'react-router-dom';

export class NewsItem extends Component {


  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
        <div className='my-3'>
            <div className="card">
            <div style={{display:'flex', justifyContent:'flex-end', position:'absolute', right:0}}>
              <span className="badge rounded-pill bg-danger">{source}</span>
            </div>
            <a href={newsUrl} target="_blank" rel="noreferrer"><img style={{maxHeight:"240px", minHeight: "240px"}} src={!imageUrl?"https://www.thedailybeast.com/resizer/v2/KNCUDVJ67FE3JLADOOPASZTFAA.gif?smart=true&auth=f2d1c18a2bcf16407546f97cb5759b99fa5a9162647d57dbc4793a1b9f1a0047&width=1200&height=630":imageUrl} className="card-img-top" alt="..." /></a>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary" rel="noreferrer">Read More</a>
                </div>
            </div>
        </div>
    )
  }
}

export default NewsItem
