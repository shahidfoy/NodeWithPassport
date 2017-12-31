# NodeWithPassport

Web app login auth created using Node.js and Passport

==================================
GETTING STARTED
=======================
clone the repository and place it into a folder you want to work in.

Make sure to have node installed: https://nodejs.org/
along with mongodb: https://www.mongodb.com/

Once you download the files cd into their location and run the following command on the root file:

# npm install

to run server use:

# node app

if you have nodemon installed you can run:

# nodemon app


=======================================
OAuth with google+ and facebook
===========================
In the config folder create a file named \n
keys.js \n

Then place your google dev and facebook dev keys in the code like so: \n

module.exports= { \n
    googleClientID: 'clientID', \n
    googleClientSecret: 'secret', \n
    facebookClientID: 'clientID', \n
    facebookClientSecret: 'secret' \n
};
