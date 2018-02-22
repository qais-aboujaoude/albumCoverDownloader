const download = require('image-downloader')
      axios    = require('axios')

let albumcovers = []

function downloadAlbumArt(artist) {
  axios.get('https://itunes.apple.com/search?term=' + 
            artist + '&entity=allArtist')
    .then(response => {
      return axios.get('https://itunes.apple.com/lookup?' + 
                        'id=' + response.data.results[0].artistId +
                        '&entity=album&attribute=music')
        .then(response => {
          for (var i = 1; i < response.data.results.length; i++) {
            let options = {
                url: response.data.results[i].artworkUrl100.replace('100x100bb', '1200x1200bb'),
                dest: `../snare/static/albums/${artist.toLowerCase()}_${response.data.results[i].collectionName.toLowerCase()}.jpg`
            }
            download.image(options)
              .then(({ filename, image }) => {
                console.log('Success: File saved to', filename)
              })
              .catch(error => {
                console.log(error)
              }) 
          } 
        })
        .catch(error => {
          console.log(error)
        })
    })
    .catch(error => {
      console.log(error)
    })
}


