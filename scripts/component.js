const ts = require("typescript")
const fs = require("fs")
const path = require("path")
const glob = require("glob")
const moment = require("moment")
const chalk = require("chalk")
const _ = require("lodash")
const matchboxComponents = require("./component-list")

const DATE = process.argv.pop()
const formattedDate = moment(DATE).format("YYYY-MM-DD")

let currentContent = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/component.json"), "utf8")
)

const data = { is: 0, isNot: 0 }

function parse(source, fileName) {
  visit(source)

  function visit(node) {
    if (
      node.kind === ts.SyntaxKind.JsxOpeningElement ||
      node.kind === ts.SyntaxKind.JsxSelfClosingElement
    ) {
      const name = node.tagName ? node.tagName.getText(source) : false

      // Ignores normal HTML JSX elements
      if (name && /[A-Z]/.test(name[0])) {
        if (matchboxComponents.includes(name)) {
          data.is = data.is + 1
        } else if (name !== "Fragment") {
          data.isNot = data.isNot + 1
        }
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
      path.join(__dirname, "../data/component.json"),
      JSON.stringify({ ...currentContent, [formattedDate]: data })
    )
    console.log(chalk.green.bold(`Component usage generated\n`))
  }
)
