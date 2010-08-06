# muddy

A MUD client in your browser usin' node.js & websockets.

This has only been tested with [Primordiax](http://primordiax.com),
so if you notice anything wrong in a different MUD let me know via
[Issues](http://github.com/dannytatom/muddy/issues).

## Features

- ✓ Basic Communication w/ MUD server
- ✗ Uses ASCII encoding as explained [here](http://cryosphere.net/mud-protocol.html)
- ✗ Uses the MCCP as defined [here](http://mccp.smaugmuds.org/)
- ✗ Command history
- ✗ Aliases
- ✗ Triggers

## Installation & Usage

muddy requires [node-websocket-server](http://github.com/miksago/node-websocket-server)
& [js-yaml](http://github.com/visionmedia/js-yaml)

    $ npm install websocket-server
    $ npm install yaml
    $ git clone git://github.com/dannytatom/muddy.git
    $ cd muddy
    $ vim config.js
    $ node server.js &
    $ chromium client/index.html

## Copyright

Copyright (c) 2010 Danny Tatom. See LICENSE for details.
