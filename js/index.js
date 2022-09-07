document.addEventListener("DOMContentLoaded", () => {
    createMonsterForm()
    getMonsters()
    buttons()
})
let page = 1
function createMonsterForm(){
    const monForm = document.createElement('form')

    const monName = document.createElement("input")
    const monAge = document.createElement("input")
    const monDescription = document.createElement('input')
    const btn = document.createElement("button")

    monForm.addEventListener('submit',handleSubmit)
    btn.innerHTML = "Create"

    monForm.setAttribute('id','monster-form')

    monName.setAttribute('id','name')
    monName.setAttribute('placeholder','name...')

    monAge.setAttribute('id','age')
    monAge.setAttribute('placeholder','age...')

    monDescription.setAttribute('id','description')
    monDescription.setAttribute('placeholder','description...')


    document.querySelector('#create-monster').appendChild(monForm)
    monForm.appendChild(monName)
    monForm.appendChild(monAge)
    monForm.appendChild(monDescription)
    monForm.appendChild(btn)

}
function handleSubmit(e){
    e.preventDefault()
    let monObj = {
      name:e.target.name.value,
      age:e.target.age.value,
      description: e.target.description.value
    }
    createMonster(monObj)
  }

function createMonster(monObj){
    fetch('http://localhost:3000/monsters',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body:JSON.stringify(monObj)
      }) 
}

function buttons(){
    const back = document.querySelector('#back')
    const forward = document.querySelector('#forward')

    back.setAttribute('onClick','prev()')
    forward.setAttribute('onClick','next()')
}

function renderMonster(monsterList){
    for (const monster in monsterList){
        //console.log(monsterList[monster])
        const div = document.createElement('div')
        const monContainer = document.querySelector('#monster-container')
        div.innerHTML = `
        <h2>${monsterList[monster].name}</h2>
        <h4>${monsterList[monster].age}</h4>
        <p>${monsterList[monster].description}</p>
        `
        monContainer.appendChild(div)
    }
}

function getMonsters(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(data => renderMonster(data))
}

function removeMonsters(){
    const monContainer = document.querySelector('#monster-container')
    monContainer.textContent = ''

}

function next(){
    removeMonsters()
    page+=1
    getMonsters()
}

function prev(){
    if (page <= 1){
        alert('Aint no monsters here')
    }
    else{
        removeMonsters()
        page-=1
        getMonsters()
    }
}
