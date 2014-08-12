#Backbone-Library
================

TL;DR
Library Phone App that runs on Android, iPhone, Windows, and Blackberry.

##Technologies
- Backbone.js
- Underscore.js
- Foundation 5
- jQuery
- Adobe Phonegap

##Installation
1. Download and Install Node.js
2. Install Cordova via command line
  - npm install -g cordova
3. Download source files
4. From source file directory, run the following commands:
  1. cordova platform add <platform>
  2. cordova build
5. Install compiled build file onto your device
   - files are located @  platforms\android\ant-build\
6. Smile :)

##Feature Roadmap
- Save/Load from Google Drive/Dropbox
- Add book by entering ISBN (we'll use either Google's or Amazon's API to query for info)
- Add book by scanning barcode
- Read book on device using Google's book reader API
