// Displaying all post titles and images function
function displayPosts() {
  fetch("http://localhost:3000/posts")
    .then((res) => res.json())
    .then((posts) => {
      // clearing all previous posts
      const postList = document.getElementById("news-list");
      postList.innerHTML = "";

      // Sorting posts by date
        const classifiedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

       if (classifiedPosts.length > 0) {
             displayPostDetails(classifiedPosts[0]);
           }
        //  Looping through posts
        classifiedPosts.forEach((post) => {
            
      // Creating div for each post
        const postDiv = document.createElement("div");
        postDiv.classList.add("news-item");

        // Formatting the date for the news posts
        const newsDate = new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        //  Showing title and author in innerhtml
        postDiv.innerHTML = `
            <h3 class="post-title" data-id="${post.id}" >${post.title}</h3>
            <p > By ${post.author} ,  posted on ${newsDate}  </p>
          <hr />
        `;

        //  Adding click event to the title
        const titleEl = postDiv.querySelector(".post-title");
        titleEl.addEventListener("click", () => handlePostClick(post.id));

        postList.appendChild(postDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}

        // sending click Get request 
      function handlePostClick(postId) {
          fetch(`http://localhost:3000/posts/${postId}`)
          .then((res) => res.json())
        .then((post) => {
        displayPostDetails(post);
      })
      .catch((err) => {
      console.error("Error fetching post detail:", err);
    });
}



        // Display post details in the #news-detail section when you click post title
       function displayPostDetails(post) {
      const postDetail = document.getElementById("news-detail");
       postDetail.innerHTML = `
         <h2>${post.title}</h2>
        <p>By Global Insight News<span style="display: inline-block; margin-left: 40%; font-style: italic;">
         ${post.category}</span></p>
         <img src="${post.imageUrl}" alt="${post.title}" style="width:100%;max-width:488px;
          height:325px; object-fit:cover;"/>
          <p>${post.content}</p>
          
  `;
}

        // Setting up a form submission listener
    function addNewPostListener() {
    const form = document.getElementById("new-post-form");

       form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Collecting form data
         const title = document.getElementById("new-title").value;
         const author = document.getElementById("new-author").value;
         const category = document.getElementById("new-category").value;
         const imageUrl = document.getElementById("imageUrl").value;
         const content = document.getElementById("new-content").value;
         const date = new Date().toISOString();

        const newPost = {
          title,
        author,
            category,
      imageUrl,
      content,
      date,
    };

    // Sending new POST to the server
    fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((savedPost) => {
        // Optionally display post immediately
        displayPosts(); 
        form.reset();   
      })
      .catch((err) => {
        console.error("Error saving post:", err);
      });
  });
}   

  document.addEventListener("DOMContentLoaded", () => {
    displayPosts();
    addNewPostListener();
});

