# Graduate Web Form
The front-end of a web form created for collecting information on people interested in a graduate scheme at a company.

The form features a simple login so that a group of people or organisation can have governance over their the data they collect and use it for their purposes. 

## Technologies Used
- AWS Cognito is used to manage users and their logins.
- React is used for the Front end
- A node.js server serves to mock the data coming back to display in the list elements for viable values
- SCSS was used for styling

## Basic Features
The login page gives simple notifications for when an error occurs.

The form page populates fields from a backend database that contain viable values for information such as gender, location and interests. HTML in-built validations handle all the validation logic.

When logging in and sending data, a loading animation is played unil the data is successfully sent. If an error occurs, a notification is also displayed.

The ability to unsubscribe from emails about graduate scheme opportunities. The landing page was present for this.