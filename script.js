const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const container = document.getElementById("gifContainer");
const mainContent = document.getElementById("mainContent");
const apiKey = "1Z8UR7i3zi8ZH6miuf8tKRNGPfOZqidF"; 

console.log("DoggyGiph script loaded.");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const query = input.value.trim();
  const limit = 12; // number of GIFs to show
  if (!query) {
    console.log("Search input was empty. Aborting search.");
    return;
  }

  console.log("Search submitted with query:", query);
  console.log("Number of GIFs requested:", limit);

  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=${limit}`;

  fetch(url)
    .then(response => {
      console.log("Response received from Giphy API.");
      return response.json();
    })
    .then(data => {
      const gifs = data.data;
      console.log("Number of GIFs received:", gifs.length);

      // Clears previous content
      container.innerHTML = "";

      if (gifs.length === 0) {
        const msg = document.createElement("p");
        msg.textContent = "No GIFs found.";
        msg.className = "text-center";
        container.appendChild(msg);
        console.log("No GIFs returned from API.");
        return;
      }

      // Adjusts results
      mainContent.classList.remove("justify-content-center");

      gifs.forEach((gif, index) => {
        const col = document.createElement("div");
        col.className = "col";

        const img = document.createElement("img");
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title || "Dog GIF";
        img.className = "gif";

        col.appendChild(img);
        container.appendChild(col);

        console.log("Added GIF", index + 1, "to the page:", img.alt);
      });

      console.log("All GIFs added to the DOM.");
    })
    .catch(error => {
      console.error("Error fetching from Giphy API:", error);
      container.innerHTML = "<p class='text-danger text-center'>Something went wrong. Please try again later.</p>";
    });
});
