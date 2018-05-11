var songs = document.querySelector('#songs')

songs.onchange = function(event) {
  var input = event.target
  var collection = document.querySelector('.collection')

  // Clears previous collection items
  collection.childNodes = null

  console.log(input.files)

  for(var i = 0; i < input.files.length; i++) {
    var filename = input.files[i].name.toString()
    var isAudio = input.files[i].type.includes('audio') || input.files[i].type.includes('video')
    var li = document.createElement('li')

    li.classList.add('collection-item')

    if (isAudio) {
      var titleInput = document.createElement('input')
  
      titleInput.type = 'text'
      titleInput.name = 'title' + i
      titleInput.placeholder = filename

      li.appendChild(titleInput)
    }
    else {
      li.textContent = filename + ' is not an audio file'
      li.classList.add('red-text')
    }

    collection.appendChild(li)
  }
}