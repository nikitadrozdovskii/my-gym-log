# MyGymLog
A demo project I made to learn MEAN stack architecture. MyGymLog is a web application that allows users to store their weightlifting workout information along with their progress picture daily. It provides “Analyze” feature that plots maximum weight and workout volume (repetitions times weight) graph. “Analyze” feature also allows to users to pick any two dates and compare progress pictures side by side.

## Technology used
### Frontend
Angular 6, Bootstrap (with custom SASS added), Chart.js
### Backend
MongoDB Atlas (with Mongoose), NodeJS (with Express) + few Node packages
## User Stories
* I am a user, today I go to gym: I record my exercises and upload my progress picture.

* I am a user, after going to gym for several months, I want to see what progress I made. I go to Analytics feature and plot 3 of my exercises, that I can see for various time frames and see maximum weight or workout volume for each, on each date performed.

* I am a user, I want to see how my weight loss is going. I go to Compare Progress Pictures feature, select a date from a month ago and today to see them side by side and compare.

## Notable features
* Authentication: app provides sign-up/login functionality with JSON Web Token, that is persisted to local storage upon signing up/logging in. Upon expiration JSON Web Token in local storage is cleared and user is automatically logged out. Backend routes are protected with middleware checking JWT. Frontend routes are protected with Angular Guards while user is not logged in. Passwords are encrypted before being stored in the database.

* Analytics: users can plot multiple exercises’ weight progressions over time. Users can toggle between max weights or total workout volume, and they can choose to see past month, 3 months or 6 months of exercise history. 

* Image upload: app allows users to upload daily progress pictures. Images are validated on backend for MIME type and file size. Images are stored on server, statically provided with URLs stored in the database.

* Design/Responsiveness: 
Apart from default bootstrap responsiveness, custom Sass file includes several media queries to ensure best experience on all devices.

* User-friendly feedback: app handles variety of errors in graceful manner displaying user-friendly error ranging from form validation to server and database errors.

