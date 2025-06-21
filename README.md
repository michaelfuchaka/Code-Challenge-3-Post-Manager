## POST MANAGER

This is a simpple blog management web app which is built using the following languages
 -**HTML**
 -**SS**
 -**JAVASCRIPT** ,with a mock backend served by 'json server'.

users can:
- View all blog titles and images in the list
- Click on  a post title from the post-list and seed its  details
- Add a new blog post
- Ediot and Delete a post

---

## Features 
- Fetch and display posts from a mock API
- Clicl a title to view post details
- Add a new blog post using a form
- Edit an existing post title and content
- Delete a blog post

---

## Technolgy used
- **Frontend** HTML, CSS, JAVASCRIPT
- **Backend** json-server (local API)

---

## Project Structure
 Post-Manager
 - index.html  (Main HTML file)
 - db.json  (Mock database for json-server)
 - css/style.css (Styling)
 - src/index.js (Javascript logic)

 ---
 ## Setup Instructions
 **1. Clone the repo or create a new folder**
  
  ```bash
  git clone  git@github.com:michaelfuchaka/Code-Challenge-3-Post-Manager.git 
  cd Code-Challenge-3-Post-Manager
  ```
  **2. Install json-server globally**
  ```bash
    npm install -g json-server@0.17.4
  ```
  **3. Run The backend**
  ```bash
   json-server db.json
   ```
    visit: http:localhost:3000/

  **4.Start live server**
  Open your code  editor i.e in Vs-code right click on idndex.html and select "open with live server". 
   or
 Use any local server you prefer  
  

 ---

 ## Author
 Built by Michael Fuchaka
 For learning purposes

## Licesne     
This project is licensed under the [MIT License](./LICENSE)