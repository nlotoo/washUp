
# washUp - Single Page Application
## Created with Angular

- In the washup folder directory, you need run: `npm start`
You can  see any lint errors in the console.
- In the rest api washup folder directory, you need run: `npm start`
You can  see any lint errors in the cmd.

## Functionality
-	Implemented authentication and authorization.
-	Ability to freely view the post of other users and comments
-	Ability to edit and delete personal posts.
-	Ability to like other users' posts 
## Technologies
-	Angular, TypeScript
-	HTML, CSS, JavaScript
-	Еxpress JS, Mongo DB
## Application Pages /  Access control
-	Home – Home page, (unauthorized and authorized users can see that page).
-	Login – Login page, only registration user in DB can be logged (unauthorized and authorized can see that page).
-	Register -  Registration page, (unauthorized and authorized can see that page) and register registration with email, username and password.
-	Catalog – Catalog page, (unauthorized and authorized can see that page).
-	Detail-page -  Unauthorized and authorized can see that page, only author can edit and delete posts.
-	Edit-page - Only current author can change details.
-	Comment-page -  Unauthorized and authorized can see that page, everyone can text comment, like dislike and edit.
