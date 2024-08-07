Basic app with protected routes
OAuth with GoogleProvider (crendetials must be set up in Google dev console and added to local .env)
Authentication done with google, authorization permits only one user, whose email is saved in local .env. Once google returs user profile, its email is checked against the one save in the .env file
Middleware used for route protection

uploading media and table data is done over two separate requests.
once a file is uploaded to storage, its metadata is generated on the server and appended to storage response. 
Storage response response includes key and metadata. 
Storage response is then passed to be processed by database operation (upload, update, etc).
lib directory provides functions that orchestrate this process