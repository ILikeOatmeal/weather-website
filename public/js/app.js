console.log("client side java script file is loaded")

// fetch('http://puzzle.mead.io/puzzle').then( (response)=> {
//     response.json().then( (data)=>{ //run when we got the data and it's parsed
//         console.log(data.puzzle)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent=""

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    const weatherURL = 'http://localhost:3000/weather?address='+search.value
    messageOne.textContent="Loading..."
    messageTwo.textContent=""
    fetch(weatherURL).then( (response)=> {
    response.json().then( (data)=>{ //run when we got the data and it's parsed
        if (data.error){
            console.log(data.error)
            messageTwo.textContent=data.error
        }
        else{
            console.log(data.location)
            console.log(data.forecast)
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast

        }
        //console.log(data)
    })
})

    console.log(weatherURL)
})
