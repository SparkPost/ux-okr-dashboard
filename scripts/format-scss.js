const fs = require("fs")
const path = require("path")

const builtFilename = "scss.json"
const importPath = path.join(__dirname, "../data/scss.txt")
const content = fs.readFileSync(importPath, "utf8")
const commits = content.split("\ncommit")

const json = commits.map(commit => {
  const parts = commit.split("\n").filter(str => !!str)

  const date = parts.reduce((acc, part) => {
    return part.includes("Date:") ? part.replace("Date:", "").trim() : acc
  }, "")

  const changes = parts.reduce((acc, part) => {
    if (part.includes(".scss")) {
      const fileParts = part.trim().split("\t")
      const path = fileParts.pop()
      const insertions = fileParts.shift()
      const deletions = fileParts.shift()

      acc.push({
        path: path.replace(" => ", "=>"),
        insertions: Number(insertions),
        deletions: Number(deletions),
      })
    }

    return acc
  }, [])

  return {
    commit: parts[0] ? parts[0].replace("commit", "").trim() : "",
    date,
    changes,
  }
})

fs.writeFileSync(
  path.join(path.join(__dirname, "../data"), builtFilename),
  JSON.stringify(json)
)
fs.unlinkSync(path.join(__dirname, "../data/scss.txt"))
console.log(`✅  Scss commit data generated (${json.length} commits found)`)
