
# passport-examples-oauth

This is a refactor of a popular passport oauth blog/repo which was done in express3 and needed updating. The original is listed below.

I extended the oauth with username/password login giving the user the choice between both to see how that would work. My username/pass solution is in angular usin xhr to login/register. I had decided to extend this to oauth, but got shot down as my /auth/facebook xhr call gets forwarded to facebook and the callback /auth/facebook/callback, magically gets routed back to the page, causing an access control (cors) error. Nothing to be done at that point I simply reverted to the anchor tag oauth logins



////////////////////////  original repo

https://github.com/mjhea0/passport-examples

**Social Authentication with Passport.js**

- In this post we'll add social authentication - Facebook, Twitter, Github, and Google - to Node.js. 
- View the blog post here: http://mherman.org/blog/2013/11/10/social-authentication-with-passport-dot-js/



