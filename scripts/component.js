const ts = require("typescript")
const fs = require("fs")
const path = require("path")
const glob = require("glob")
const moment = require("moment")
const chalk = require("chalk")
const _ = require("lodash")

const DATE = process.argv.pop()
const formattedDate = moment(DATE).format("YYYY-MM-DD")
const matchboxComponents = [
  "ActionList",
  "ActionList.Action",
  "Banner",
  "Box",
  "Button",
  "Button.Group",
  "Checkbox",
  "Checkbox.Group",
  "CodeBlock",
  "Column",
  "Columns",
  "ComboBox",
  "ComboBoxMenu",
  "ComboBoxTextField",
  "DatePicker",
  "Drawer",
  "Drawer.Header",
  "Drawer.Content",
  "EmptyState",
  "Error",
  "Expandable",
  "Grid",
  "HelpText",
  "Inline",
  "KeyboardKey",
  "Label",
  "Layout",
  "Layout.Section",
  "Layout.SectionTitle",
  "Modal",
  "OptionalLabel",
  "Page",
  "Pager",
  "Pagination",
  "Panel",
  "Panel.Section",
  "Panel.Header",
  "Popover",
  "Portal",
  "ProgressBar",
  "Radio",
  "Radio.Group",
  "RadioCard",
  "RadioCard.Group",
  "ScreenReaderOnly",
  "Select",
  "Slider",
  "Snackbar",
  "Spinner",
  "Stack",
  "Table",
  "Table.Row",
  "Table.Cell",
  "Table.HeaderCell",
  "Tabs",
  "Tag",
  "Text",
  "TextField",
  "Toggle",
  "ThemeProvider",
  "Tooltip",
  "UnstyledLink",
  "WindowEvent",
]

let currentContent = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../src/raw-data/component.json"),
    "utf8"
  )
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
        } else {
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
      path.join(__dirname, "../src/raw-data/component.json"),
      JSON.stringify({ ...currentContent, [formattedDate]: data })
    )
    console.log(chalk.green.bold(`Component usage generated\n`))
  }
)
