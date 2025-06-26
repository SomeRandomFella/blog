let blogs = "";

async function getPosts() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/SomeRandomFella/backend/main/blogs.json"
    );
    if (!response.ok) throw new err("didnt work idk");

    blogs = await response.json();
  } catch (e) {
    console.log(`hey retard ${e}`);
  }
}

getPosts().then(() => {
  generateHTML(blogs);
});

function generateHTML(blogs) {
  const parent = document.querySelector(".contain23");
  parent.innerHTML = "";

  blogs.forEach((blog) => {
    const html = `
      <div class="container">
        <div class="image2">
          <img class="image" src="${blog.author}.png" alt="image" />
        </div>
        <div class="details">
          <div class="top">
            <h3 class="title">${blog.title}</h3>
            <h3 class="date">&middot; ${blog.date}</h3>
          </div>
          <p class="description">${blog.description}</p>
        </div>
      </div>
    `;
    parent.innerHTML += html;
  });
}
