import moment from "moment"

export function getBgFill(d) {
  return moment(d).isBefore("2018-5-20")
    ? "rgba(235, 225, 225, 1)"
    : moment(d).isBefore("2020-02-01")
    ? "rgba(235, 235, 245, 1)"
    : "rgba(215, 215, 245, 1)"
}
