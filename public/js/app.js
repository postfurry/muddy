const $ = require('jquery')
const World = require('./lib/world.js')
const Cookie = require('js-cookie')
const uuidv4 = require('uuid/v4')

$(function() {
  var world   = new World('#output-pane')
    , socket  = io.connect()

  var resizeUI = function() {
    $('#output-pane').prop({ scrollTop: $('#output-pane').prop('scrollHeight') })
  }

  resizeUI()

  socket.on('connect', function() {
    var sessionId = Cookie.get('sessionId')
    if (!sessionId) {
      sessionId = uuidv4()
      Cookie.set('sessionId', sessionId)
    }
    socket.emit('sessionId', sessionId)

    $('.input-box').focus()

    $('.input-box').on('keydown', function(event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        socket.emit('message', $('.input-box').val())
        world.selfMesssage($('.input-box').val())
        world.updateHistory($('.input-box').val())

        $('.input-box').val('')
      } else if (event.keyCode == 38) {
        if (this.selectionStart === 0 && world.history[world.current - 1]) {
          event.preventDefault();
          $('.input-box').val(world.history[world.current -= 1])
        }
      } else if (event.keyCode == 40) {
        if (this.selectionStart === $('.input-box').val().length && world.history[world.current]) {
          event.preventDefault();
          $('.input-box').val(world.history[world.current += 1])
        }
      }
    })

    $(window).on('resize', function(event) {
      resizeUI()
    })

    $(window).on('beforeunload', function() {
      return 'Are you sure you want to disconnect?'
    })
  })

  socket.on('message', function(message) {
    var command = message.command
      , data    = message.data

    if (command == 'updateWorld') {
      world.update(data)
    }
  })

  socket.on('disconnect', function() {
    world.systemMessage('Connection closed')
    $(window).off('unload beforeunload')
  })
})