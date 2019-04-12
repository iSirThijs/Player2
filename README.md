# Player2
Find your perfect player2 with this app! Use this app to find new friends that like the same games or use this app to date your perfect player2!

![Screen1](https://github.com/iSirThijs/Player2/wiki/images/fp2home.png)

# About this project
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
* Creating a account
* Sing in to an existing account
* Searching a game to add to your profile(but not adding it)

# License
See [License](https://github.com/iSirThijs/pt-tech/blob/master/LICENSE) for more info.

**Additional note for HvA students:**

Using this work without mentioning the source is not allowed. See also the website from [HvA](https://az.hva.nl/studenten/az-lemmas/studenten/hva-breed/juridische-zaken/fraude-en-plagiaat/fraude-en-plagiaat.html)

# Perquisites
* MongoDB installed

# Install
1. Clone the repository onto the computer
2. Run `npm install`
3. create a directory for the database & log:
	```bash
	mkdir data/db data/log
	````
4. create a env file with the secrets
	```
	IGDB_API_KEY= 'YOUR API KEY'
	MONGODB='mongodb://localhost:30000/gamedate' or 'YOUR MONGODB PATH'
	SESSION_SECRET= ' YOUR SECRET'
	```

# Usage
**To start the App**
1. Navigate to the project folders root
2. Start the mongod child process using `npm run mongoStart`
3. Start the server with `npm start`
4. go to [localhost:8000](localhost:8000) to use the app.

**To close the App**
1. Close nodemon in the terminal using `ctrl-c`
2. Don't forget to close the mongod child process:
	```bash
	mongo --port 3000 --shell
	use admin
	db.shutdown()
	exit
	```
