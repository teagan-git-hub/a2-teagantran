const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // On Render, make sure `npm install` is your build command.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'website': 'website', 'username': 'username', 'password': 'password' },
  { 'website': 'google.com', 'username': 'main@gmail.com', 'password': '12' },
  { 'website': 'youtube.com', 'username': 'sub@gmail.com', 'password': '123' },
  { 'website': 'hub.wpi.edu', 'username': 'student@wpi.edu', 'password': '1234'} 
]
appdata.forEach( function( item, index ) {
  item.id = index
})
let nextId = appdata.length

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }else if( request.method === 'DELETE' ){
    handleDelete( request, response )
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const entry = JSON.parse( dataString )
    entry.id = nextId
    nextId += 1
    entry.passwordMatchesPrevious = appdata.some( function( item ) {
      return item.password === entry.password
    })
    appdata.push( entry )
    
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })

    // change this to incorporate data
    response.end( JSON.stringify( appdata ) )
  })
}

const handleDelete = function( request, response ) {
  const id = Number( new URL( request.url, 'http://localhost' ).searchParams.get( 'id' ) )
  const index = appdata.findIndex( function( item ) {
    return item.id === id
  })

  if( index !== -1 ) {
    appdata.splice( index, 1 )
  }

  response.writeHead( 200, "OK", {'Content-Type': 'application/json'} )
  response.end( JSON.stringify( appdata ) )
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
