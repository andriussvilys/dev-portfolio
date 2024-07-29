Basic app with protected routes
OAuth with GoogleProvider (crendetials must be set up in Google dev console and added to local .env)
Authentication done with google, authorization permits only one user, whose email is saved in local .env. Once google returs user profile, its email is checked against the one save in the .env file
Middleware used for route protection

uploading media and table data is done over two separate requests. 
lib directory provides functions that orchestrate this process