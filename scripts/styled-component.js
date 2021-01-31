const ts = require("typescript")
const fs = require("fs")
const path = require("path")
const glob = require("glob")
const moment = require("moment")
const chalk = require("chalk")
const _ = require("lodash")
const { notEqual } = require("assert")

const DATE = process.argv.pop()
const formattedDate = moment(DATE).format("YYYY-MM-DD")

let currentContent = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/styled-component.json"), "utf8")
)

const data = { length: 0 }

function parse(source, fileName) {
  visit(source)

  function visit(node) {
    if (node.kind === ts.SyntaxKind.VariableDeclaration) {
      const delcarationText = node.getText(source)
      if (
        delcarationText.includes("styled(") ||
        delcarationText.includes("styled.")
      ) {
        // Subtract two to remove the first and last lines, which are typically empty
        data.length = data.length + delcarationText.split("\n").length - 2
      }
    }

    ts.forEachChild(node, visit)
  }
}

glob(
  path.join(__dirname, "../../2web2ui/src/**/*.js"),
  { ignore: ["**/__func__/**", "**/__testHelpers__/**", "**/tests/**"] },
  function(err, files) {
    if (err) {
      callback(err)
    }

    console.log(chalk.white(`Reading ${files.length} files...`))
    files.forEach(fileName => {
      const sourceFile = ts.createSourceFile(
        fileName,
        fs.readFileSync(fileName).toString(),
        ts.ScriptTarget.ES2015
      )
      parse(sourceFile, fileName)
    })
    fs.writeFileSync(
      path.join(__dirname, "../data/styled-component.json"),
      JSON.stringify({ ...currentContent, [formattedDate]: data })
    )
    console.log(chalk.green.bold(`Styled Component usage generated\n`))
  }
)
