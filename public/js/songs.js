document.addEventListener('DOMContentLoaded', function() {
  var select = document.querySelector('select')
  var selectInstance = M.FormSelect.init(select, null)
})

// var songs = document.querySelector('#songs')

// songs.onchange = function(event) {
//   var input = event.target

//   for(var i = 0; i < input.files.length; i++) {
//     var isAudio = input.files[i].type.includes('audio/mpeg')

//     if (!isAudio) {
//       input.files = null
//     }
//   }
//}
