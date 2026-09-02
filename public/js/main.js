// FRONT-END (CLIENT) JAVASCRIPT HERE
let ul = null

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  const websiteInput = document.querySelector('#website'),
        usernameInput = document.querySelector( '#username' ),
        passwordInput = document.querySelector( '#password' ),

  const payload = {
    website: websiteInput.value,
    username: usernameInput.value,
    password: passwordInput.value
  }
  
  const response = await fetch( '/submit', {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  const arr = await response.json()
