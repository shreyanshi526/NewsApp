import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spin from './Spin';
import PropTypes from 'prop-types';


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 12,
        category: 'general',
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    /* constructor  if normally used give following error = "Must call super constructor in derived class before accessing 'this' or returning from derived constructor
    ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor"T WHICH MEANS YOU HAVE TO CALL THE CONSTRUCTOR OF SUPER CLASS ONLY BY ADDING  "super()"*/

    constructor(props) {
        super(props);
        console.log("hello i am a constructor from news component")

        /* Remember state are used whenever or wherever u need changes again and again suppose a name fro difernt people u need to change their name again and again
        but props u cant change them again and again they are read only */

        this.state = {
            articles: [],
            loading: true,
            page: 1,
            /* totalResults:0 */
        }
        document.title = `${this.props.category}-News`;
    }
    /* componentDidMount is a lifecycle method,it will run after the things are rendered means after the render method*/

    async newUpdate() {

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=00445c6972714be4afb6571398bfbabdz
        &page=${this.state.page}&pageSize=${this.props.pageSize}`;
        /* using fetch API */
        this.setState({ loading: true });
        let data = await fetch(url);
        console.log("newsuop data")
        console.log(data)
        let parsedData = await data.json()


        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })

    }
    async componentDidMount() {
        console.log("compDidmount");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=00445c6972714be4afb6571398bfbabd&page=1&pageSize=${this.props.pageSize}`;
        /* using fetch API */
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log("here are your result")
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    handleNextClick = async () => {
        //console.log("next");
        //if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
        //
        //    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=00445c6972714be4afb6571398bfbabd&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //    this.setState({loading:true});
        //    /* using fetch API */
        //    let data = await fetch(url);
        //    let parsedData = await data.json()
        //    
        //    this.setState({
        //        page: this.state.page + 1,
        //        articles: parsedData.articles,
        //        loading:false
        //    })
        //}
        this.setState({ page: this.state.page + 1 });
        this.newUpdate();
    }

    handlePreviousClick = async () => {

        //console.log("Previous")
        //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=00445c6972714be4afb6571398bfbabd&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        ///* using fetch API */
        //this.setState({loading:true});
        //let data = await fetch(url);
        //let parsedData = await data.json()
        //console.log(parsedData);
        //
        //this.setState({
        //    page: this.state.page - 1,
        //    articles: parsedData.articles,
        //    loading: false
        //})
        this.setState({ page: this.state.page - 1 });
        this.newUpdate();

    }

    //making first letter capital using capitalize fxn
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        console.log("render")
        return (

            <div className="container my-4">
                <h1 className='container my-4'>Top Headlines - {this.capitalizeFirstLetter(this.props.category)}</h1>
                  {this.state.loading && <Spin/>} 
                {/* above syntax tell if this .state.laodaing is true then show spinner else not */}

                {/* adding INFINTE SCROLL */}
              {/*   <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.state.totalResults}
                    loader={Spin}> */}

                    <div className="row">
                        {/* looping through the article , here ELEMENT is  one of the object of article array*/}
                        {/*vd35-  we are removing [!this.state.loading &&] this lines meant whenever the data is not present or still loading ,because to use to infinete scroll we will just increment data on the present data*/}
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 70) : ""} description={element.description ? element.description.slice(0, 40) : ""}
                                    imageUrl={element.urlToImage} NewsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}

                    </div>

                {/* </InfiniteScroll> */}
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-light" onClick={this.handlePreviousClick}>&larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>

        )
    }
}

export default News
