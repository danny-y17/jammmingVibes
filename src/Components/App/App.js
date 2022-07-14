import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResult/SearchResult'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'
import Preloader from '../loader/loader.tsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playListTrack: [],
      isLoading: false,
      term: '',
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.updateTerm = this.updateTerm.bind(this);
  }


  componentWillMount() {
    const term = localStorage.getItem('term');
    if (term) {
      this.setState({
        term: term,
      })
    }
 
  }


  addTrack(track) {
    if (this.state.playListTrack.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    else {
      this.setState({
        playListTrack: this.state.playListTrack.concat(track)
      })
    }
  }

  removeTrack(track) {
    let tracks = this.state.playListTrack.filter(savedtrack => savedtrack.id !== track.id)
    this.setState({
      playListTrack: tracks
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }
  
  savePlaylist() {
    this.state.isLoading = true;
    const trackUris = this.state.playListTrack.map(track => track.uri)
    console.log(this.state.isLoading)
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTrack: [],
        })
    }).then(() => {
      setTimeout(() => {
        console.log('loading: false')
        this.setState({
          isLoading: false,
        })
      },1000)
    })
}

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults })
    })
  }

  // updates the saved term in local storage
  updateTerm(term) {
    this.setState({
      term: term
    })
    localStorage.setItem('term', term)
  }


  render() {
    return (
      <div>
        <div className = "Preloader">
        {this.state.isLoading ? <Preloader /> : null} 
          </div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch = {this.search}
          term = {this.state.term || ''}
          updateTerm = {this.updateTerm} 
          />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
              onAdd = {this.addTrack}
              playlistTracks = {this.state.playListTrack} />
            <Playlist name={this.state.playlistName} track={this.state.playListTrack}
              onRemove = {this.removeTrack} 
              onNameChange = {this.updatePlaylistName} 
              onSave = {this.savePlaylist}
              />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
