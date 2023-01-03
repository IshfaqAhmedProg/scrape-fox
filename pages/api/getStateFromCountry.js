const handler = (req, res) => {
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "aTJhR2RKUk9OdWV6bno3MkIwd2ZlaVQwcExueHF1QWxmZnV3UDg2WA==");

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };
    if (req.method === "POST") {
        return new Promise((resolve, reject) => {
            fetch(
                `https://api.countrystatecity.in/v1/countries/${req.body.iso}/states`,
                requestOptions
            )
                .then(response => response.json())
                .then(response => {
                    res.status(200).json(response);
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

