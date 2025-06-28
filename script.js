let blogs = "";
const hm = document.querySelector(".dark2");
const skibidi = document.querySelector(".search2");

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

async function generateHTML(blogs) {
  const parent = document.querySelector(".contain23");
  parent.innerHTML = "";

  blogs.forEach((blog, index) => {
    const html = `
      <div class="container" onclick="main(${index})">
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

async function generatePopup(blog) {
  const mommy = document.querySelector(".pop");
  mommy.innerHTML = `
    <dialog class="dia">
      <div class="top2">
        <img src="${blog.author}.png" alt="image" class="img1" />
        <h2 class="title2">${blog.title}</h2>
        <h3 class="date2">&middot; ${blog.date}</h3>
      </div>
      <div class="main23">
        <p class="main22">${blog.fullContent}</p>
      </div>
      <button class="butt" onclick="document.querySelector('.dia').close()">
        Close
      </button>
    </dialog>
  `;
}

async function main(index) {
  const blog = blogs[index];
  await generatePopup(blog);
  document.querySelector(".dia").showModal();
}

hm.addEventListener("click", () => {
  toggleDarkMode();
});

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  document.querySelector("header").classList.toggle("dark5");
  document.querySelector(".contain23").classList.toggle("dark6");
  document.querySelector(".dia").classList.toggle("dark5");
  if (document.body.classList.contains("dark")) {
    hm.innerHTML = "🌞";
    hm.classList.add("dark2");
  } else {
    hm.innerHTML = "🌙";
    hm.classList.add("dark2");
  }
}

skibidi.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.description.toLowerCase().includes(searchTerm)
  );
  generateHTML(filteredBlogs);
});
