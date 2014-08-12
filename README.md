#Backbone-Library
================

TL;DR
Library Phone App that runs on Android, iPhone, Windows, and Blackberry.

This is my first project using Adobe Phonegap.  As such, this project will only run (without script errors) in a phone emulator or on one the aforementioned devices once compiled.  We're still in the early phases of the project, but basic features such as auto saving to your device and loading library from device on startup are integrated.  More to come ;)

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
- Add book cover from device or from web
