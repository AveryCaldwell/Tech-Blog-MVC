# 🖥️ Tech Blog MVC 
<br>

## Table of contents
- [Description](#description-📝)
- [Overview](#overview-📁)
  - [User experience](#user-experience-👤)
  - [Screenshot](#screenshot-📸)
  - [Links](#links-🔗)
- [My process](#my-process-💡)
  - [Built with](#built-with-🔨)
  - [Useful resources](#useful-resources-📚)
- [Author](#author-✏️)

<br>

#  Description 📝

- CMS-style blog site where developers can publish their blog posts & comment on other developers’ posts as well. Using Handlebars.js as the templating language, Sequelize as the ORM, and express-session npm package for authentication.

<br>


# Overview 📁 


## The Challenge

<br>

## User Story

```md
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```

## Acceptance Criteria

```md
GIVEN a CMS-style blog site -->
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
```


## User Experience 👤 

<br> 
1. Install express-handlebars package to implement Handlebars.js for your Views, use the MySQL2 and Sequelize packages to connect to a MySQL database for your Models, and create an Express.js API for your Controllers.
2. You’ll also need the dotenv package to use environment variables, the bcrypt package to hash passwords, and the express-session and connect-session-sequelize packages to add authentication.

<br>

## Screenshot 📸
​<br>

![](./public/images/Screenshot.png)
​
​<br>

###  Links 🔗
- Live URL: [https://averycaldwell-tech-blog.herokuapp.com/](https://averycaldwell-tech-blog.herokuapp.com/)
- Github Repository: [https://github.com/AveryCaldwell/Tech-Blog-MVC](https://github.com/AveryCaldwell/Tech-Blog-MVC)


<br>
<hr>
<br>

##  My process 💡

###  Built with 🔨
- HTML, CSS, Bootstrap
- JavaScript
- MySQL, Sequelize
- Handlebars.js
- Node.js, Express
- Dotenv, Bycrypt
- Heroku, GitHub

<br>

###  Useful resources 📚

- Emojis:   [https://github.com/ikatyang/emoji-cheat-sheet#office](https://github.com/ikatyang/emoji-cheat-sheet#office)
- MySQL2:   [https://www.npmjs.com/package/mysql2](https://www.npmjs.com/package/mysql2)
- Sequalize:    [https://www.npmjs.com/package/sequelize](https://www.npmjs.com/package/sequelize)
- dotenv:   [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)

<br>
<hr>
<br>

## Author ✏️
  Avery Caldwell
  - Email: [AveryCaldwell7@gmail.com](AveryCaldwell7@gmail.com)
  - LinkedIn: [https://www.linkedin.com/in/averycaldwell/](https://www.linkedin.com/in/averycaldwell/)
  - GitHub: [AveryCaldwell](https://github.com/AveryCaldwell)