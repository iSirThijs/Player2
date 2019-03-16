# Project Tech
This repository and wiki are my work for the assignments given to me for blok Tech. Blok tech is offered by the bachelor study [Communciation and Multimedia Design at the Hogeschool van Amsterdam](https://www.cmd-amsterdam.nl)

Blok tech consists of the subjects:
* [Project Tech](https://github.com/cmda-bt/pt-course-18-19)
* [JS Bootcamp](https://github.com/cmda-bt/js-bootcamp-18-19)
	* *My notes and assignments for the JS bootcamp are in a different repository: [js-bootcamp](https://github.com/iSirThijs/js-bootcamp)*
* [Frontend](https://github.com/cmda-bt/be-course-18-19)
* [Backend](https://github.com/cmda-bt/fe-course-18-19)

# Project Tech assignment
From the [project tech repository](https://github.com/cmda-bt/pt-course-18-19):
>In Project Tech you'll build a dynamic prototype of a web application. In different roles you take a well-argued position on, among other things, the privacy and security aspects of the application. You'll also learn to navigate the command line, version control with Git & GitHub and make sure code style is consistent.

The web application is a dating app to find a serious relationship. For my project I have to decided to focus this on gamers. This will be my starting point. Some ideas I have about an dating app for gamers:

* Matching using the players favorite game and play time in games
* Matching people according to game genres
* Finding new friends to play with in addition to dating

**Working feature**
* adding and deleting games to the library

# License
See [License](https://github.com/iSirThijs/pt-tech/blob/master/LICENSE) for more info.

**Additional note for HvA students:**

Using this work without mentioning the source is not allowed. See also the website from [HvA](https://az.hva.nl/studenten/az-lemmas/studenten/hva-breed/juridische-zaken/fraude-en-plagiaat/fraude-en-plagiaat.html)

# Prerequisites
* An API key from [IGDB](https://www.igdb.com/api)

# Install
1. Clone the repository onto the computer
2. Run `npm install`

**to enable the search features**
1. Edit the file `configuration.js` in the folder `node_modules/igdb-api-node/` change the valeu of url to https://api-v3.igdb.com
2. Create an `.env` file with the following:
	```
	IGDB_API_KEY='Put your API key here'
	```

# Usage
1. Start the server
	* use `nodemon` to start the app with nodemon
	* use `npm start` to start without nodemon
2. go to [localhost:8000/profile/games](localhost:8000/profile/games) to use the feature.
