// FRONT-END (CLIENT) JAVASCRIPT HERE
let ul = null

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#yourname' ),
        json = { yourname: input.value },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const arr = await response.json()

  console.log( arr )
}

window.onload = function() {
  const button = document.querySelector('button')
  button.onclick = submit
  ul = document.createElement( 'ul' )
  document.body.appendChild( ul )
}
