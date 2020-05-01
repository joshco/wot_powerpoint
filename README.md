
WOT PowerPoint
=========
Impress your spouse, friends, family, and presentation audiences.  
Use W3C Web Of Things standard to control your PowerPoint presentation. 
https://www.w3.org/WoT/WG/

#### You are awesome!

Usage
-----

Clone the repository

`git clone https://github.com/joshco/wot_powerpoint.git`

Install packages

`npm install`

Run

`npm start`

Open PowerPoint and load your presentation or the sample.
There is a sample in the repository to play with.

`sample.pptx`

When the server runs, it will display an ngrok URL. Note that.

```
ExposedThing 'WOT' setting action Handler for 'prev'
ExposedThing 'WOT' setting action Handler for 'stop'
ExposedThing 'WOT' setting action Handler for 'start'
Make sure PowerPoint is open with your preso loaded!
Open browser to Ngrok url:
http://76aaaaaaa.ngrok.io
```
Open your browser to the ngrok URL the server printed.  It will look something like:
 
`http://76aaaaaaa.ngrok.io`

When you see the browserified node-wot, click __Consume__

If your powerpoint is running, you should now see:
* a status box on the left, showing your presentation state
* Buttons on the right, for start/stop/prev/next/first/last, etc

The interface works on mobile!


License
-------

Copyright (c) 2020 Josh Cohen

This Source Code Form is subject to the terms of the Mozilla Public
License (MPL), version 2.0. If a copy of the MPL was not distributed
with this file, You can obtain one at http://mozilla.org/MPL/2.0/.

