console.log('client-side JS file is loaded!')


//FETCH API
// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

//FETCH WEATHER
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

    //event listener
    weatherForm.addEventListener('submit', (e) => {
        //to prevent default behavior of form which is to refresh browser
        e.preventDefault() 
        
        const address = search.value

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ""

        fetch('http://localhost:3000/weather?address=' + address).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    })
