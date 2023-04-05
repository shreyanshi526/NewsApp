import React, { Component } from 'react'

export class NewsItem extends Component {


    render() {
        let { title, description, imageUrl, NewsUrl, author, date ,source} = this.props;
        /* suppose this.props is an object then by above syntax title and description we will availed from object this.props */
        return (
            <div className="my-3">
                <div className="card">
                <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"style={{left:'90%',zIndex:'1'}}>
                            {source}
 
                        </span>
                    <img src={imageUrl ? imageUrl : "https://ichef.bbci.co.uk/news/1024/branded_news/9CBB/production/_129232104_anjan-standing-1-cropped.png"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>

                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted"> by {!author ? "unkown" : author}
                            on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={NewsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem