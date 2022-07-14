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

    handleSave(track) {
        this.props.savedTracks(track)
    }
    
    render() {
        return (
            <div className="TrackList">
                {
                    this.props.track.map(tracks => {
                        if (!this.inPlaylist(tracks)) {
                        return <Track track={tracks} key={tracks.id}
                            onAdd = {this.props.onAdd} 
                            onRemove = {this.props.onRemove}
                            isRemoval = {this.props.isRemoval}
                            />
                        }
                    })
                }
            </div>
        )
    }
}

export default TrackList;