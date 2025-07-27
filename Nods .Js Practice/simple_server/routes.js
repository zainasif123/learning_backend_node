const fs = require('fs');

const routesHander =(req, res) => {
   // console.log(req.url, req.method, req.headers);
    const url = req.url;
    const method = req.method;
 
    if (url === '/') {
        res.write(`
            <html>
                <head>
                    <title>My Server</title>
                </head>
                <body>
                    <form method="POST" , action ='/zain'>
                        <input type="text" name="username" placeholder="Enter your name">
                        <button type="submit">Submit</button>
                    </form>
                </body>
            </html>
        `);
        return res.end();  
    }
    if(url == '/zain' && method == 'POST')
    {
     const body = [];
     req.on('data', (chunk) => {
         console.log(chunk);
         body.push(chunk);
         });
       return req.on('end', () => {
             const parsedBody = Buffer.concat(body).toString();
             console.log(parsedBody);
             const msg = parsedBody.split('=')[1]; 
             fs.writeFile('message.txt' , msg, (error , result)=>{
                 res.statusCode = 302;
                 res.setHeader('Location' , '/');
                  return res.end();  
             } ); 
         });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write(`
        <html>
            <head>
                <title>My Server</title>
            </head>
            <body>
                <h1>This is me</h1>
            </body>
        </html>
    `);
    res.end(); 
}
   module.exports = routesHander;