
const handleMenu = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/videos/categories")
  const data = await response.json()
  let button = data.data

  const buttonContainer = document.getElementById("button-container")
  button.forEach(categ => {
    const div = document.createElement('div')
    div.innerHTML = `<button onclick = "clickButton('${categ.category_id}')" class="btn btn-active normal-case">${categ.category}</button>`
    buttonContainer.appendChild(div)
  });
}


const clickButton = async (id) => {


  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
  const data = await res.json()

  const catData = data.data



  const categoryData = document.getElementById('category-data')
  categoryData.innerHTML = ''
  if (catData == 0) {

    categoryData.innerHTML = `<div class ="absolute top-1/2 w-[100%]">
        <img class = "ml-auto mr-auto" src="./images/Icon.png" alt="not found images">
        <h1 class="text-6xl font-bold text-center">Oops!! Sorry, There is no 
          <br>  content here</h1>
    </div>`
  } else {

    categoryData.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
    catData.forEach(item => {


      const time = item.others.posted_date ? toHoursAndMinutes(item.others.posted_date) : '';

      const verified = item.authors[0].verified
      const div = document.createElement('div')
      div.innerHTML = `
    <div class="card w-full h-[300px] bg-base-100 shadow-xl">
    <figure class="p-2 relative">
      <img src="${item.thumbnail}" alt="Shoes" class="rounded-xl h-[150px] w-full" />
      <div class = "absolute bottom-4 right-5 bg-black text-white text-xs rounded p-1">${time}</div>
    </figure>
    <div class="p-3 flex gap-2">
     <div class="avatar">
        <div class="w-12 h-12 rounded-full">
            <img src="${item.authors[0].profile_picture}" />
        </div>
     </div>
      <div>
        <h2 class="card-title">${item.title}</h2>
        <p class= "text-gray-500 pt-2 flex items-center">${item.authors[0].profile_name} <span>${verified ? `<img class = "h-4 w-6 ml-1" src="./images/images.png" alt="">` : ''}</span> </p>
        <p class = "text-gray-500">${item.others.views}</p>
      </div>
    </div>
    </div>
       `
      categoryData.appendChild(div)
    })

  }

}
function toHoursAndMinutes(totalSeconds) {
  const totalMinutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const time = hours + 'h ' + minutes + 'm ' + seconds + 's'
  return time;
}

async function sortByViews() {
  const categoryData = document.getElementById('category-data')
  categoryData.innerHTML = ''

  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`)
  const data = await res.json()

  const catData = data.data
  const sortedData = catData.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views))

  sortedData.forEach(item => {


    const time = item.others.posted_date ? toHoursAndMinutes(item.others.posted_date) : '';

    const verified = item.authors[0].verified
    const div = document.createElement('div')
    div.innerHTML = `
  <div class="card w-full h-[300px] bg-base-100 shadow-xl">
  <figure class="p-2 relative">
    <img src="${item.thumbnail}" alt="Shoes" class="rounded-xl h-[150px] w-full" />
    <div class = "absolute bottom-4 right-5 bg-black text-white text-xs rounded p-1">${time}</div>
  </figure>
  <div class="p-3 flex gap-2">
   <div class="avatar">
      <div class="w-12 h-12 rounded-full">
          <img src="${item.authors[0].profile_picture}" />
      </div>
   </div>
    <div>
      <h2 class="card-title">${item.title}</h2>
      <p class= "text-gray-500 pt-2 flex items-center">${item.authors[0].profile_name} <span>${verified ? `<img class = "h-4 w-6 ml-1" src="./images/images.png" alt="">` : ''}</span> </p>
      <p class = "text-gray-500">${item.others.views}</p>
    </div>
  </div>
  </div>
     `
    categoryData.appendChild(div)
  })
}


handleMenu()
clickButton(1000)
