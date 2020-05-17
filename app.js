var xlsx = require("xlsx");
const request = require("request");
const cheerio = require("cheerio");
// var jsonData = [
//    { name: "savan", age: "20", occupation: "enginner" },
//    { name: "parth", age: "21", occupation: "enginner" },
//    { name: "matang", age: "25", occupation: "enginner" },
//    { name: "poojan", age: "20", occupation: "enginner" },
// ];

// var newWB = xlsx.utils.book_new();
// var newWS = xlsx.utils.json_to_sheet(jsonData);
// xlsx.utils.book_append_sheet(newWB, newWS, "newdata");
// xlsx.writeFile(newWB, "newexcelfile.xlsx");

request("http://sis.scfhs.org.sa/BarcodeApp/?id=1-1Z9QJBP&lang=enu", function (
   error,
   response,
   html
) {
   if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      let dataArrName = [];
      var dataArrValue = [];

      $(".main label").each((i, el) => {
         const spanName = $(el).text().replace(/\s\s+/g, "");
         const item = $(el).children("span").next().val();
         //console.log(i + ')' + spanName + ': ' + item);
         dataArrName[i] = spanName;
         dataArrValue[i] = item;
      });

      var jsonData = [];
      jsonData.push({
         "ID": dataArrValue[1],
         "RegistrationNo": dataArrValue[2],
         "SpecialityType": dataArrValue[8],
         "Speciality": dataArrValue[16],
      });

      console.log(jsonData);
   }
});
