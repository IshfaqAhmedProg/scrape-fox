export function estimatedTTC(query, service) {
  switch (service) {
    case "Email Validator":
      {
        return calculateTTC("00:00:02", query);
      }
      break;
    case "Phone Number Validator":
      {
        return calculateTTC("00:00:03", query);
      }
      break;
    case "WhatsApp Validator":
      {
        return calculateTTC("00:00:03", query);
      }
      break;
    case "Google Maps Scraper":
      {
        return calculateTTC("00:00:03", query);
      }
      break;
    default:
      break;
  }
}
function calculateTTC(hms, query) {
  var a = hms.split(":"); // split it at the colons

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
  var newSeconds = query * seconds;

  // multiply by 1000 because Date() requires miliseconds
  var date = new Date(newSeconds * 1000);
  var hh = date.getUTCHours();
  var mm = date.getUTCMinutes();
  var ss = date.getSeconds();

  if (hh < 10) {
    hh = "0" + hh;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (ss < 10) {
    ss = "0" + ss;
  }
  var t = hh + ":" + mm + ":" + ss;
  return t;
}
