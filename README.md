## API

- #### /admin

  - GET : /user
    - return a list of all the users in the database
  - GET : /user/{id}
    - return the user with this specific  id
  - POST : /user/create
    - create a new user
      - `need to autherized (send the token in the header)`
      - `send the user as Json object`
        - `{username, email, password}`
  - PUT : /user/edit/
    - edit an existing user
      - `need to autherized (send the token in the header)`
      - `send the user as Json object`
        - `{username, email, password}
  - DELETE : /user/delete/{id}
    - `need to autherized (send the token in the header)`
    - delete the user with the id 

  ------

  - 