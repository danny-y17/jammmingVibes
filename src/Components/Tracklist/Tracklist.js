import React from "react"
import "./Tracklist.css"
import Track from "../Track/Track"
class TrackList extends React.Component {
    inPlaylist(track) {
        let inPlaylist = this.props.playlistTracks
        if (!inPlaylist) {
            return
        }
        else {
            return (inPlaylist.find(savedTracks => savedTracks.id === track.id))
        }
    }
    


    render() {
        return (
            <div className="TrackList">
                {   
                    
                    this.props.track.map(tracks => {
                        if (!this.inPlaylist(tracks) && (this.props.track)) {
                        return <Track track={tracks} key={tracks.id}
                            tracks = {this.props.playlistTracks}
                            onAdd = {this.props.onAdd} 
                            onRemove = {this.props.onRemove}
                            isRemoval = {this.props.isRemoval}
                            />
                        }
                        return null
                    })
                }
            </div>
        )
    }
}

export default TrackList;