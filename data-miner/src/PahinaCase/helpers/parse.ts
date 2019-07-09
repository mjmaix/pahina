import $ from "cheerio";
import rp from "request-promise";

const parse = function(url: string) {
  return rp(url)
    .then(function(html) {
      return {
        name: $(".firstHeading", html).text(),
        birthday: $(".bday", html).text()
      };
    })
    .catch(function(err) {
      //handle error
    });
};

module.exports = parse;
