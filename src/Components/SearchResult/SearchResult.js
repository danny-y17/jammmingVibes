import React from "react";
import "./SearchResult.css"
import Tracklist from "../Tracklist/Tracklist";
 
class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults"> 
                <h2>Results</h2>
                <Tracklist track={this.props.searchResults}
                    playlistTracks = {this.props.playlistTracks}
                    onAdd = {this.props.onAdd}
                    isRemoval = {false} 
                />
                    
            </div>
        )
    }
}

export default SearchResults