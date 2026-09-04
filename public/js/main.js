// FRONT-END (CLIENT) JAVASCRIPT HERE
let container = null

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
  renderEntries( arr )
}

const renderEntries = function( arr ) {
  container.innerHTML = ''
  for ( let item of arr ) {
    const child = document.createElement('div')
    const website = item.website ?? ''
    const name = item.username ?? ''
    const pass = item.password ?? ''
    const passwordMatchesPrevious = item.passwordMatchesPrevious ?? false
    child.classList.add('output-row')

    for ( let value of [ website, name, pass, passwordMatchesPrevious ] ) {
      const field = document.createElement('div')
      field.classList.add('output-cell')
      field.innerText = value
      child.appendChild(field)
    }

    const deleteButton = document.createElement('button')
    deleteButton.type = 'button'
    deleteButton.innerText = 'Delete'
    deleteButton.onclick = async function() {
      const response = await fetch( '/delete?id=' + encodeURIComponent( item.id ), {
        method: 'DELETE'
      })
      renderEntries( await response.json() )
    }
    child.appendChild( deleteButton )

    if ( website || name || pass ) {
      container.appendChild( child )
    }
  }
}

window.onload = function() {
  const button = document.querySelector('button')
  button.onclick = submit
  container = document.createElement( 'div' )
  container.classList.add( 'container' )
  document.body.appendChild( container )
}
