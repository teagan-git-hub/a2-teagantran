// FRONT-END (CLIENT) JAVASCRIPT HERE
let ul = null

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  console.log( 'submit button clicked' )

  const website_input = document.querySelector( '#website' )
  const username_input = document.querySelector( '#username' )
  const password_input = document.querySelector( '#password' )
  
  const body = JSON.stringify({ website: website_input.value, username: username_input.value, password: password_input.value }) 
  const json = { website: website_input.value, username: username_input.value, password: password_input.value }
  
  const response = await fetch( '/submit', {
    method:'POST',
    body
  })

  const arr = await response.json()

  ul.innerHTML = ''
  for ( let item of arr ) {
    const li = document.createElement('li')
    const website = item.website ?? ''
    const name = item.username ?? ''
    const pass = item.password ?? ''
    li.innerText = website + ' — ' + name + (pass ? ' — ' + pass : '')
    ul.appendChild( li )
  }
}

window.onload = function() {
  const button = document.querySelector('button')
  console.log( 'button', button )
  button.onclick = submit
  ul = document.createElement( 'ul' )
  document.body.appendChild( ul )
}
