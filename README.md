Link to app on Heroku: https://vast-oasis-37654.herokuapp.com/

ABOUT:
- This application adhered to MVC file structure, and made sure to implement RESTful routes and full CRUD.
- It is a fishing-app, with the main index page showcasing a library of various fish that can be added/edited if the user is logged in. 
- If the user is not logged in they will simply be able to see the library as a gallery of images but will not be able to reach the show-page to see information about specific fish/ won't be granted any functionality power etc/ or access to the community page.

COMMUNITY PAGE:

- If logged in, the user can access the community page where they can post their own catches. This incorporated a One-To-Many relationship between the User Model and Catch Model. (One user could be the author of multiple catches/posts).

CHALLENGES: 

- Creating a relationship between the User model and Catches model, so that after clicking an image in the community feed, one can be directed to that specific user's profile and see the entirety of their uploads, and only their uploads.
- A lot of moving parts and a lot of .ejs files - it was difficult to allocate time/plan tasks in an effective manner. If I were to do this project again I would outline the goals of the app regarding functionality in a much more clear and deliberate manner, so that I am not hopping between tasks and thinking maybe I should add that maybe not etc. 
- Upholding Restful routes principles after the initial 7 routes. I began having a hard time with naming conventions especially for URLS etc. I.e. Instead of /community/:user/:catch/:delete it could have been more succinct to catch/delete etc.

WHAT I WOULD HAVE LIKED TO DO WITH MORE TIME:

- Add a rating system/ like button for user's catches on the community page/ user profiles.
- Tweak my edit button so that you can simply edit one field and not be required to enter something for every detail of the fish.
- Incorporate bootstrap to make the site look more polished/professional.



Thank you to GA Instructors Dido/Rod who helped me with this project. 

