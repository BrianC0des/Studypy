async function getLinks(){
    try{
      const res = await fetch('/data/data.json');
      if(!res.ok){
        throw new Error("File not found!");
      }
      const data = await res.json();
      return data;
    } catch (err){
      console.log("Something went wrong: ", err.message);
    }
}

async function loadLinks() {
  const data = await getLinks();
  const container = document.getElementById('tools-container');
  data.categories.forEach(category => {    
    category.pages.forEach(page => {
      if(page.name === "interaciveCoding"){
        page.links.forEach( link => {
          const card = document.createElement('div');
          card.className = 'Tools';
          card.innerHTML = `
              <a id="links" href="${link.url}" target="_blank">
                <h2>${link.title}</h2>
                <p>${link.description}</p>
              </a>
          `;
          container.appendChild(card);
        });
     }

    });
  });
} 


loadLinks();