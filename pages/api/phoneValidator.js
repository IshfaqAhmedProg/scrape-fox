const handler = (req, res) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "veriphone.p.rapidapi.com",
    },
  };
  if (req.method === "POST") {
    console.log(req.body.number);
    try {
      fetch(
        `https://veriphone.p.rapidapi.com/verify?phone=%2B${req.body.number}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response, "response from phone veriphone");
          res.status(200).json(response);
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
