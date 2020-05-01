
WOT PowerPoint
=========
Impress your spouse, friends, family, and presentation audiences.  

#### You are awesome!

Use W3C Web Of Things standard to control your PowerPoint presentation. 
https://www.w3.org/WoT/WG/

Usage
-----

#### Starting the Server

Clone the repository

`git clone https://github.com/joshco/wot_powerpoint.git`

Install packages

`npm install`

Run

`npm start`

#### Open a PowerPoint Presentation
Open PowerPoint and load your presentation or the sample.
There is a sample in the repository to play with.

`sample.pptx`

#### Using the client
When the server runs, it will display an ngrok URL in text AND an ASCII QR code. Note that.

```
ExposedThing 'WOT' setting action Handler for 'prev'
ExposedThing 'WOT' setting action Handler for 'stop'
ExposedThing 'WOT' setting action Handler for 'start'
Make sure PowerPoint is open with your preso loaded!
Open browser to Ngrok url:
http://76aaaaaaa.ngrok.io
```

<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 37 37" shape-rendering="crispEdges"><path fill="#ffffff" d="M0 0h37v37H0z"/><path stroke="#000000" d="M4 4.5h7m2 0h1m1 0h1m1 0h1m2 0h5m1 0h7M4 5.5h1m5 0h1m2 0h1m2 0h4m2 0h1m1 0h1m1 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h1m1 0h2m2 0h2m2 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m1 0h10m2 0h1m1 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h2m3 0h1m2 0h1m1 0h3m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h1m6 0h1m1 0h2m1 0h1m1 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h2m1 0h2m1 0h1m4 0h2M4 12.5h1m1 0h5m4 0h1m1 0h5m1 0h1m2 0h5M5 13.5h4m3 0h1m3 0h2m2 0h5m1 0h3m3 0h1M4 14.5h1m1 0h1m2 0h4m2 0h7m6 0h1M4 15.5h3m1 0h1m4 0h2m1 0h1m2 0h2m2 0h1m5 0h1m1 0h1M4 16.5h3m3 0h2m1 0h1m2 0h4m1 0h3m5 0h2M4 17.5h1m1 0h4m2 0h1m2 0h2m1 0h1m1 0h9m3 0h1M5 18.5h1m1 0h1m2 0h1m1 0h2m4 0h4m2 0h2m2 0h3M4 19.5h1m3 0h1m2 0h2m3 0h1m3 0h1m2 0h6m2 0h1M4 20.5h1m1 0h1m2 0h3m1 0h2m1 0h1m2 0h3m1 0h1m1 0h1m1 0h1m1 0h2M4 21.5h3m4 0h1m2 0h2m1 0h1m2 0h1m2 0h1m1 0h4m1 0h1m1 0h1M4 22.5h1m1 0h6m1 0h9m2 0h1m1 0h3m1 0h1M4 23.5h1m4 0h1m1 0h2m1 0h2m1 0h1m2 0h1m3 0h3m4 0h1M4 24.5h1m1 0h2m1 0h2m1 0h5m1 0h1m2 0h1m1 0h6m1 0h3M12 25.5h1m1 0h2m4 0h3m1 0h1m3 0h5M4 26.5h7m5 0h1m2 0h1m1 0h1m1 0h2m1 0h1m1 0h3M4 27.5h1m5 0h1m1 0h1m3 0h1m1 0h2m3 0h2m3 0h1m2 0h1M4 28.5h1m1 0h3m1 0h1m1 0h1m2 0h2m2 0h3m2 0h5m1 0h3M4 29.5h1m1 0h3m1 0h1m1 0h1m2 0h1m2 0h1m1 0h1m2 0h2m4 0h4M4 30.5h1m1 0h3m1 0h1m1 0h2m1 0h1m3 0h2m2 0h9M4 31.5h1m5 0h1m2 0h1m1 0h2m1 0h1m1 0h1m1 0h1m1 0h2m1 0h1m1 0h1m1 0h1M4 32.5h7m1 0h1m1 0h1m1 0h1m3 0h1m2 0h1m2 0h3m1 0h1"/></svg>

##### QRCode

Use your phone to scan the QRCode output in the terminal.  
> on iOS, the default camera app will let you scan QRCodes.  A notification will drop down from the top, asking if you want to browse the URL encoded.


##### Manual

Open your browser to the ngrok URL the server printed.  It will look something like:
 
`http://76aaaaaaa.ngrok.io`

When you see the browserified node-wot, click __Consume__

#### Controlling your presentation
If your powerpoint is running, you should now see:
* A status box on the left, showing your presentation state
* Buttons on the right, for start/stop/prev/next/first/last, etc

The interface works on mobile!


License
-------

Copyright (c) 2020 Josh Cohen

This Source Code Form is subject to the terms of the Mozilla Public
License (MPL), version 2.0. If a copy of the MPL was not distributed
with this file, You can obtain one at http://mozilla.org/MPL/2.0/.

