const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()
const PORT = 8000

// Serve static files from the 'public' folder
// app.use(express.static('public'))

const wellKnownPath = path.join(__dirname, "public/.well-known")

// Read the file content synchronously and parse it as JSON
let appleAppSiteAssociationFile = {} /* TODO */
try {
  const fileContent = fs.readFileSync(
    `${wellKnownPath}/apple-app-site-association`,
    "utf8"
  )
  appleAppSiteAssociationFile = JSON.parse(fileContent)
} catch (err) {
  console.error(
    "Error reading or parsing apple-app-site-association file:",
    err
  )
}

// Read the file content synchronously and parse it as JSON
let assetlinksFile = {} /* TODO */
try {
  const fileContent = fs.readFileSync(
    `${wellKnownPath}/assetlinks.json`,
    "utf8"
  )
  assetlinksFile = JSON.parse(fileContent)
} catch (err) {
  console.error("Error reading or parsing assetlinks.json file:", err)
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

// Serve the apple-app-site-association file
app.get("/.well-known/apple-app-site-association", (req, res) => {
  res.json(appleAppSiteAssociationFile)
})

app.get("/.well-known/assetlinks.json", (req, res) => {
  res.json(assetlinksFile)
})

app.get("*", (req, res) => {
  res.send({ status: 200, path: req.path })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
