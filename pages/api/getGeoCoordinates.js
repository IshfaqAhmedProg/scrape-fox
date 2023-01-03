const handler = (req, res) => {
    const requestOptions = {
        method: 'GET',
    };
    console.log(req.body.loc);
    if (req.method === "POST") {
        return new Promise((resolve, reject) => {
            fetch(
                `http://api.positionstack.com/v1/forward?access_key=${process.env.NEXT_PUBLIC_GEOCODING_API}&query=${req.body.loc}`,
                requestOptions
            )
                .then(response => response.json())
                .then(response => {
                    res.status(200).send(response.data);
                    resolve();
                })
                .catch(error => {
                    res.json(error);
                    res.status(405).end();
                    resolve(); // in case something goes wrong in the catch block (as vijay commented)
                });
        });
    } else {
        res.status(405);
        res.end();
    }
};
export default handler;

