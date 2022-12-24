const handler = (req, res) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_EMAIL_VALIDATOR_KEY,
      "X-RapidAPI-Host": process.env.RAPID_API_EMAIL_VALIDATOR_HOST,
    },
  };
  if (req.method === "POST") {
    try {
      fetch(
        `https://mailcheck.p.rapidapi.com/?domain=${req.body.domain}`,
        options
      )
        .then((mailCheckRes) => mailCheckRes.json())
        .then((mailCheckRes) => {
          console.log(mailCheckRes, "response from mailcheck");
          res.status(200).json({
            status: "success",
            message: "Enquiry submitted successfully",
          });
        });
    } catch (err) {
      res.status(405).json({
        status: "failure",
        message: "Error submitting the enquiry form",
      });
    }
  } else {
    res.status(405);
    res.end();
  }
};
export default handler;
