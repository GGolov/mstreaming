document.addEventListener('DOMContentLoaded', function() {
  var select = document.querySelector('select')
  var selectInstance = M.FormSelect.init(select, null)
})

var songs = document.querySelector('#songs')
var cover = document.querySelector('#cover')

songs.onchange = function(event) {
  var input = event.target
  var collection = document.querySelector('.collection')

  // Clears previous collection items
  collection.innerHTML = ''

  console.log(input.files)

  for(var i = 0; i < input.files.length; i++) {
    var filename = input.files[i].name.toString()
    var isAudio = input.files[i].type.includes('audio') || input.files[i].type.includes('video')
    var li = document.createElement('li')

    li.classList.add('collection-item')

    if (isAudio) {
      var inputField = document.createElement('div')
      var titleInput = document.createElement('input')
      var label = document.createElement('label')
  
      inputField.className = 'input-field'

      titleInput.type = 'text'
      titleInput.id = 'title' + i
      titleInput.name = 'title' + i

      label.htmlFor = titleInput.id
      label.textContent = 'Title of ' + filename

      inputField.appendChild(titleInput)
      inputField.appendChild(label)

      li.appendChild(inputField)
    }
    else {
      li.textContent = filename + ' is not an audio file'
      li.classList.add('red-text')
    }

    collection.appendChild(li)
  }
}

cover.onchange = function(event) {
  var input = event.target

  console.log(input.files)

  if (!input.files[0].type.includes('image')) {
    input.value = 'invalid file'
  }
}