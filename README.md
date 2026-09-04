Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Due: September 9th, by 11:59 AM.
---

## Your Web Application Title
This project is a password manager where you can easily and simply add webite login information, edit it, and delete with the data stored on a server. I used CSS grid and flexbox to display the forms and data, with javascript handling the logic. All you need to do to use this app is the ability to type for the input boxes and click boxes for submitting, editing and deleting info.

## Technical Achievements
- **Tech Achievement 1 (Single Page App)**: Using a combination of html, javascript, and css, I created a single-page app that allows users to submit and pull website credentials stored in a visible table. I started with the base code given by the assignment, and added the functionality shown through the professors demo in class. It was challenging as my code initially did not properly upload to render or work on my local device. I went to office hours, and I was able to fix my issue by separating the json and body variables for each input field into its own constant since the professor's method was not working for me. After fixing my issue, I decided to alter the 'ul' display into a grid with children using CSS for my output rows. 
- **Tech Achievement 2 (Add, Delete, Edit)**: I added the ability to delete and edit data stored on the server by using javascript requests to pull, delete, and get data. This was done through adding a constant for both a delete and edit button created for each item in the output array. The delete button would send a fetch request to the server for the corresponding item, where the server would remove the item from the array if it exists. The edit button simply used the existing query selectors as the input fields for updated info, and used the submit button to set the item to its new data. This was particularly challenging since it was difficult for me to grasp what to do with the data once sent, and how to send it back. However, I used the textbooks and online resources as a guide for how others have done it and applied those concepts here.

### Design/Evaluation Achievements
- **Design Achievement 1**:
1. Carignan
2. The interviewee pointed out that a user can submit empty forms, which gets added to the list as a blank statement. They also thought that having the user pressing submit to see previous inputs was not good design. Overall, they did not like the CSS design.
3. I was surprised about their comment on needing to see previous data. I didn't think about how the user might want to see their info before pressing submit since I was focused on the fact that each server reset would wipe the data, so I thought of it as temporary.
4. I would change the website to allow the user to see their saved info when the website loads, and make sure empty fields can't be inputted.
