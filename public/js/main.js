// FRONT-END (CLIENT) JAVASCRIPT HERE
let ul = null

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const username_input = document.querySelector( '#username' ),
        json = { username: username_input.value },
        body = JSON.stringify( json )
  const password_input = document.querySelector( '#password' ),
        json = { password: password_input.value },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
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
