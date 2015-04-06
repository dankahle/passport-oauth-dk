
# passport-examples-oauth

This is a refactor of a popular passport oauth blog/repo which was done in express3 and needed updating. The original is listed below.

I extended the oauth with username/password login giving the user the choice between both to see how that would work. My username/pass solution is in angular usin xhr to login/register. I had decided to extend this to oauth, but got shot down as my /auth/facebook xhr call gets forwarded to facebook and the callback /auth/facebook/callback, magically gets routed back to the page, causing an access control (cors) error. Nothing to be done at that point I simply reverted to the anchor tag oauth logins

### separate logins have separate settings
This was one of the first questions to come to mind: Is there any way I can have different login routes (user/pass, facebook, google) share the same settings info. I.e. if a person logs in with facebook, then makes a bunch of user related changes, then next time logs in via google, all those changes are attached to the facebook login, he's got to start over again with the google login. I don't see a way around it. You could possibly look for email/phone or so to line these logins up but it would be guesswork as best, besides, the profile info you get back from the oauths can be very sparse, just a name and and not much more sometimes. 

I never did the google one, but it's supposedly openid, possibly that goes smoother if you're already logged into google? I.e. maybe don't have to ok this app's connection? One could hope.


////////////////////////  original repo

https://github.com/mjhea0/passport-examples

**Social Authentication with Passport.js**

- In this post we'll add social authentication - Facebook, Twitter, Github, and Google - to Node.js. 
- View the blog post here: http://mherman.org/blog/2013/11/10/social-authentication-with-passport-dot-js/



