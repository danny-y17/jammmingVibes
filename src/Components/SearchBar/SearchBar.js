import React from "react";
import "./SearchBar.css"

class SearchBar extends React.Component {
    constructor(props) {
        super(props); 

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        this.props.onSearch(this.props.term);
    }

    // update searchbar when typing
    handleTermChange(event) {
        this.props.updateTerm(event.target.value);
    }

    

    render() {
        return (
            <div className="SearchBar">
            <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" 
            value={this.props.term}
            />
            <button onClick={this.search} className="SearchButton">SEARCH</button>
            </div>
        )
    }
}

export default SearchBar
