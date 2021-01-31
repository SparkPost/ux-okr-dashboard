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
  "Banner.Action",
  "Banner.Media",
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
  "Drawer.Footer",
  "EmptyState",
  "EmptyState.Header",
  "EmptyState.Action",
  "EmptyState.List",
  "EmptyState.Media",
  "EmptyState.Image",
  "EmptyState.LEGACY",
  "Error",
  "Expandable",
  "Grid",
  "Grid.Column",
  "HelpText",
  "Inline",
  "InlineCode",
  "KeyboardKey",
  "Label",
  "Layout",
  "Layout.Section",
  "Layout.SectionTitle",
  "ListBox",
  "Modal",
  "Modal.Header",
  "Modal.Content",
  "Modal.Footer",
  "Modal.LEGACY",
  "OptionalLabel",
  "Page",
  "Pager",
  "Pagination",
  "Panel",
  "Panel.LEGACY",
  "Panel.Section",
  "Panel.LEGACY.Section",
  "Panel.Header",
  "Panel.SubHeader",
  "Panel.Action",
  "Picture",
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
  "Table.TotalsRow",
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
  "Video",
  "WindowEvent",
]

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
