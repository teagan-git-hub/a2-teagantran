// FRONT-END (CLIENT) JAVASCRIPT HERE
let ul = null

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  const websiteInput = document.querySelector('#website'),
  const usernameInput = document.querySelector( '#username' ),
  const passwordInput = document.querySelector( '#password' ),

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

  ul.innerHTML = ''
  for ( let item of arr ) {
    const li = document.createElement('li')
    const name = item.username ?? item.yourname ?? ''
    const pass = item.password ?? ''
    li.innerText = name + (pass ? ' — ' + pass : '')
    ul.appendChild( li )
  }
}

window.onload = function() {
  const button = document.querySelector('button')
  button.onclick = submit
  ul = document.createElement( 'ul' )
  document.body.appendChild( ul )
}
