# NodeWithPassport

Web app login auth created using Node.js and Passport

App Preview: https://app-node-auth.herokuapp.com/

==================================
GETTING STARTED
=======================
clone the repository and place it into a folder you want to work in.

Make sure to have node installed: https://nodejs.org/
along with mongodb: https://www.mongodb.com/

make sure you can run npm from your command line and have the mongo database running

Once you download the files for this repository cd into their location and run the following command on the root file:
```
npm install
```
this will install all of the packages needed to run the project

to run server use:
```
node app
```
or if you have nodemon installed you can run:
```
nodemon app
```
you can install nodemon with
```
npm install -g nodemon --save-dev
```
once the website is running on your local server it should be located at

http://localhost:3000


=======================================
OAuth with google+ and facebook
===========================
In the config folder create a file named
'dev.js'

Then place your google dev and facebook dev keys in the code like so:
```
module.exports= {
    googleClientID: 'clientID',
    googleClientSecret: 'secret',
    facebookClientID: 'clientID',
    facebookClientSecret: 'secret',
    mongoURI: 'ADD_the_mongoDB_URL_here'
};
```

# make sure to create OAuth client keys and place proper OAuth redirect URI's inside of the google and facebook developer websites

https://developers.facebook.com

https://console.developers.google.com

for example facebooks Valid OAuth redirect URIs should look something like:

http://localhost:3000/auth/facebook/callback

for google it has two which should be:

Authorized JavaScript origins

http://localhost:3000

Authorized redirect URIs

http://localhost:3000/auth/google/callback
