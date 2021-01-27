const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const request = require("request")

const app = express()

app.use(bodyParser.json({limit: "10mb"}))

app.get("/people/:id", (req, res) => {
  const {id} = req.params
  request.get(`${config.serviceToCallUrl}/people/${id}`, (e, r, person) => {
    if (e) {
      console.error(e)
      res.send(500)
    } else {
      res.send(person)
    }
  })
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})