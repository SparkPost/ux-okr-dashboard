import moment from "moment"
import { tokens } from "@sparkpost/design-tokens"

export function getBgFill(d) {
  if (moment(d).isBefore("2018-6-2") && moment(d).isAfter("2018-5-20")) {
    return tokens.color_gray_300
  }

  if (moment(d).isBefore("2020-02-02") && moment(d).isAfter("2020-01-20")) {
    return tokens.color_gray_300
  }
  return tokens.color_gray_200
}
