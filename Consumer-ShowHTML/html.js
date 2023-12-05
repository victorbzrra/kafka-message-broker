export const getHTML = (messagesMapped, host, producer) => {
    const HTMLToSend = `
    <!DOCTYPE html>
    <html style="margin: 0; padding: 0;">
      <head>
          <title>Minha Página</title>
      </head>
      <body style="overflow: auto">
          ${
            messagesMapped.map((item) => {
              return  `
                <p style="background: ${item.sender === 'Producer 1' ? 'blue' : 'red'}; color: white; font-family: Arial; padding: 10px">${item.sender} em ${item.date}</p>
                <h1>${item.content}</h1>
              `
            })
          }

          <input type="text" id="message"/>
          <button onclick="exibirMensagem()" id="btn">Enviar</button>

          <script>
            function exibirMensagem() {
              var message = document.getElementById("message").value;

              fetch(${host ? `'${host}'` : undefined || `'http://localhost:8080/msg/send/${producer}'`}, {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({
                      "content": message,
                      "sender": "qualquer coisa string"
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {    
                  location.reload()        
                })
                .catch(error => console.log({...error}))

            }
  
          </script>
      </body>
    </html>
  `

  return HTMLToSend
}