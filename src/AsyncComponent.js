import React, { Component, Suspense } from 'react';

/*export default (props) => {
		const {result} = props;
		return(
		    <div>
		      {result &&
		            result.length &&
		              result.map(item => (
		                <div className="column is-4">
		                  <div className="movie">
		                    <div className="movie__left">
		                      <img src={item.show.image ? item.show.image.original : ''} alt="Show Poster Image"/>
		                    </div>
		                    <div className="movie__right">
		                      <div className="movie__right__title">{item.show.name}</div>
		                      <div className="movie__right__subtitle">Score: {item.show.rating.average}</div>
		                      <div className="movie__right__subtitle">Status: {item.show.status}</div>
		                      <div className="movie__right__subtitle">Network: {item.show.network ? item.show.network.name : 'N/A'}</div>
		                      <a href={item.show.url} target="_blank" className="movie__right__subtitle">Link</a>
		                    </div>
		                  </div>
		                </div>
		              ))
		       }
		     </div>
 		);
}*/

const sleep = ms => new Promise(r => setTimeout(() => r(), ms));
class AsyncComponent extends Component {
		state = {
			result : null
		}

		async componentDidMount() {
			const res = await fetch(`https://api.tvmaze.com/search/shows?q=suits`);
			await sleep(5000);
      		this.setState({result : await res.json()});
		}

      	render () {
      		const { result } = this.state;
      		return (
			    <div>
			      {(result &&
			            result.length &&
			              result.map(item => (
			                <div className="column is-4">
			                  <div className="movie">
			                    <div className="movie__left">
			                      <img src={item.show.image ? item.show.image.original : ''} alt="Show Poster Image"/>
			                    </div>
			                    <div className="movie__right">
			                      <div className="movie__right__title">{item.show.name}</div>
			                      <div className="movie__right__subtitle">Score: {item.show.rating.average}</div>
			                      <div className="movie__right__subtitle">Status: {item.show.status}</div>
			                      <div className="movie__right__subtitle">Network: {item.show.network ? item.show.network.name : 'N/A'}</div>
			                      <a href={item.show.url} target="_blank" className="movie__right__subtitle">Link</a>
			                    </div>
			                  </div>
			                </div>
			              ))) || <img src="https://media1.tenor.com/images/2df94b2cbc32b465b9ec02451f6ffcd9/tenor.gif?itemid=8696160" />
			       }
			     </div>
		     );
      	}
 };

 export default AsyncComponent;
