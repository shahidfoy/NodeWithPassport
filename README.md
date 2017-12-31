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

or if you have nodemon installed you can run:

# nodemon app

once the website is running on your local server it should be located at

http://localhost:3000


=======================================
OAuth with google+ and facebook
===========================
In the config folder create a file named 
'keys.js'

Then place your google dev and facebook dev keys in the code like so: 
```
module.exports= { 
    googleClientID: 'clientID', 
    googleClientSecret: 'secret', 
    facebookClientID: 'clientID',
    facebookClientSecret: 'secret' 
};
```

make sure to place proper OAuth redirect URI's

for example facebooks Valid OAuth redirect URIs should look something like:

http://localhost:3000/auth/facebook/callback 

for google it has two which should be:

Authorized JavaScript origins

http://localhost:3000

Authorized redirect URIs

http://localhost:3000/auth/google/callback 
