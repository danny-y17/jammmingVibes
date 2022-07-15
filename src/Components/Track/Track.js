import React from "react"
import "./Track.css"

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removetrack = this.removetrack.bind(this);
        this.saveTracklist = this.saveTracklist.bind(this);
    }

    renderAction() {
        if (this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removetrack}>-</button>
        }
        else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }
    
    // remove track from playlist
    removetrack() {
        this.props.onRemove(this.props.track);
    }
    // adds track to playlist
    addTrack() {
        this.props.onAdd(this.props.track);
    }
    
    saveTracklist() {
        if (this.props.playlistTracks && this.props.playlistTracks.length > 0) {
            localStorage.setItem('saveTracks',JSON.stringify(this.props.playlistTracks))
        }
    }



    render() {;
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                    <audio controls src={this.props.track.preview}></audio>
                </div>
                {this.renderAction()}
                {this.saveTracklist()}
            </div>
        )
    }
}

export default Track