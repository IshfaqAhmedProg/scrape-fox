const handler = (req, res) => {
  const photoURL = `https://whatsapp-profile-pic.p.rapidapi.com/wspic/url?phone=${req.body.number}`;
  const detailsURL = `https://whatsapp-checker.p.rapidapi.com/check/?number=${req.body.number}`;

  const detailsOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7772f18dd2msha82037263e66724p1cbf32jsn985bd3afc601",
      "X-RapidAPI-Host": "whatsapp-checker.p.rapidapi.com",
    },
  };
  const photoOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "bb619020c8msh0e24b40e791c34dp1b6430jsnb4541194a915",
      "X-RapidAPI-Host": "whatsapp-profile-pic.p.rapidapi.com",
    },
  };
  if (req.method === "POST") {
    Promise.all([
      fetch(detailsURL, detailsOptions).then((resp) => resp.json()),
      fetch(photoURL, photoOptions).then((resp) => resp.text()),
    ]).then((response) => {
      res.status(200).send(response);
    });
  } else {
    res.status(405);
    res.end();
  }
};
export default handler;
