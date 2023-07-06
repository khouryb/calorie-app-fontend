# Calorie Counter

## Description

Project 4. Everything has been leading to this. In our final project, I have been given free reign to choose any technology stack I have learnt over the past 10 weeks and also to come up with an idea completely by myself. As I have gained 3 kilos over the course, I thought it would be fitting to create a calorie counter app so I could lose it all again hopefully.

## Timeframe

I was given 10 days to complete this project as a solo endeavor.
Technologies Used

- React.js
- Ruby on Rails
- PostgreSQL
- CSS

## Brief

The cohort was tasked with creating an app with the stack of their choosing. I had to create an app with at least two models; one with full CRUD operations and the rest with add and delete methods and I had to implement user authentication.
Planning
I felt that I needed to practice coding using React, seeing as it is such a popular framework, so I went with that for the front end. I chose to create a REST API with Ruby on Rails. I felt like Rails would allow me to get my API up and running quickly, with PostgreSQL as my database.

From my time in the course I learnt that new programmers tend to bite off more than they can chew in respect to the complexity of the apps they make. It is preferable to keep the app simple, making sure all features work as intended and not being overwhelmed by many features that one has to implement given a strict time frame to completion, resulting in an unfinished, rushed app. With this in mind, I decided that I would have as few models as possible and went with three as shown in the ERD here:

![E.R.D](https://i.ibb.co/kKJ563Z/calorie-tracker-erd.png)

Then I went about writing some user stories for my app:

As a user, I want to be able to create an account
As a user, I want to be able to log in
As a user, I want to calculate my BMR
As a user, I want to be able to set my activity level
As a user, I want to create meals, so I can track how many calories I eat in a day
As a user, I want to add ingredients to my meals
As a user, I want to make changes to my meals, in case I make a mistake
As a user, I want to delete meals
As a user, I want to view my meals

And some wire frames:

![E.R.D](https://i.ibb.co/6J2fh17/calorie-tracker-wireframe.png)

## Build Process

### REST API

For this project, I thought it made sense to make the API first, as I thought this would be the most difficult part and wanted to get it out of the way early. I chose to use Ruby on Rails for this and began making some of the user models in my ERD. Once this was done I made all the routes with their respective endpoints and the controllers for those routes, this was relatively simple to do in Rails and allowed me to swiftly move on to user authentication which would be the hardest part of the project. For this I used a gem called Devise, I then followed a guide one of my classmates had linked in Slack. This guide was easy to follow and had user authentication up in no time. I would always use Postman throughout the API build to ensure my routes worked before I moved on.

Being able to receive a JSON Web Token in postman, I now had to establish the relationships between models in the back end. As you can see in the ERD above, I need to make a one-to-many relationship between users and meals, however meals and ingredients would have to be a many-to-many relationship. I therefore actually needed to make a fourth model used as a join table between meals and ingredients, this again was quite simple to implement in Rails; I just had to add the meals and ingredients models as foreign keys to the join table and establish the relationship between them in `models`. It’s very readable in Rails! Have a look:

Join table model relationship:

```ruby
class MealIngredient < ApplicationRecord
    belongs_to :meal
    belongs_to :ingredient
end
```

Meals and ingredients models relationships:

```ruby
class Ingredient < ApplicationRecord
    has_many :meal_ingredients
    has_many :meals, through: :meal_ingredients, dependent: :destroy
end
```

```ruby
class Meal < ApplicationRecord
    belongs_to :user
    has_many :meal_ingredients, dependent: :destroy
    has_many :ingredients, through: :meal_ingredients
end
```

### Front end

By this point in this course I hadn’t written in React for what felt like an eternity! But after some consultation with some old project, I quickly got back into the swing of things and began writing the log-in and sign-up pages. I built both of the pages using `<form>` to capture user data which was saved in a `useState` then sent to the API I had built with a little bit of help from Axios. For the needs of this project I would just save the JWT in local storage, but I do understand that this is not optimal from a security perspective. Here is my API call for login:

```javascript
import axios from "axios";

export async function signIn(userInfo) {
  const user = JSON.stringify({
    user: {
      email: `${userInfo.email}`,
      password: `${userInfo.password}`,
    },
  });

  try {
    const response = await axios.post(`http://localhost:4000/login`, user, {
      headers: { "Content-Type": "application/json" },
    });

    localStorage.setItem("jwt", response.headers.authorization);
  } catch (error) {
    console.log(`This is the error: ${error}`);
  }
}

export default signIn;
```

I then went about constructing the various components of my app and the logic to give users their daily recommended calories and I also made sure to create some sort of user authorisation that restricted certain routes. For example, if a user is not signed in, they can’t view the homepage of the app. I did this by creating a component called `Routeguard` that would check if a user has a JWT in local storage. Again, the manner in which I achieved this is not the most secure, but for the purposes of the app it’s fine! Here it is:

```javascript
import { Navigate, Outlet } from "react-router-dom";

export default function RouteGuard() {
  function hasJWT() {
    let flag = false;
    //check user has JWT token
    localStorage.getItem("jwt") ? (flag = true) : (flag = false);
    return flag;
  }

  return hasJWT() ? <Outlet /> : <Navigate to={{ pathname: "/" }} />;
}
```

For the styling, I decided to use vanilla CSS as I wanted to keep it simple and not try to learn a new framework in a couple of days. I tried to push the boat out a little bit and made some slick animations on page load which I achieved using `keyframes`. This allowed me to make a div fly in from the x-axis and other things like a fade in:

```css
.fade-in {
  opacity: 0;
  transition: opacity 1.5s ease-in;
}

.fade-in.active {
  opacity: 1;
}

@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.content {
  display: flex;
  justify-content: space-between;
}

.slide-in-left {
  animation: slideInFromLeft 1s ease forwards;
}

.slide-in-right {
  animation: slideInFromRight 1s ease forwards;
}
```

## Challenges

I suppose the greatest challenge in this project was really understanding how Devise works, having followed a guide online I would just plug bits of code into my app or migrate things in Rails that I had no idea what they actually do. I did do a fair bit of googling to try to find out what certain components do, but I feel like I don’t understand how much of it works and in the end I had to move on to other features. I also found that whilst searching for solutions to roadblocks I would have in React, there would be a lot of outdated solutions and having to find out after trying to implementing it in my code and a lot of the time it would literally be a change in the name of a hook which I felt quite annoying.

## Wins

I built a full-stack project! If you told me that I would be able to do this three months ago, I wouldn’t have believed you. In a more general sense, I feel like I am able to debug problems quicker and am able to understand new concepts quicker. For example, implementing route authorisation took me 30 minutes. To be more specific, I understand user authentication better and how to send data between the front and back of an application.

## Takeaways

I am getting better at building apps, debugging and understanding new concepts. For example, before this project I felt like I didn’t really understand user authentication, but because I had done it before it clicked for me and I was able to implement it without much trouble.

## Bugs

None that I am aware of, but I am sure that they are there.

## Future Improvements

ß
I would like to use a third party API to grab the nutritional data for more common foodstuffs. Implementing this would save the user time in inputting their own data. I would also like to make the app more secure; I believe storing JWTs in cookies instead of local storage is much more secure.
