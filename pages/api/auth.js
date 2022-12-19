export default async function handler(req, res) {
  const token = req.body;
  const human = await validateHuman(token);
  if (!human) {
    res.status(400);
    res.json({ errors: ["Suspicious activity has been detected"] });
    return;
  }
  res.status(201);
  res.json({ message: "Success!" });
}
async function validateHuman(token) {
  const secret = process.env.SECRET_RECAPTCHA_SITE_KEY;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {
      method: "POST",
    }
  );
  const data = await response.json();
  console.log("data", data);
  return data.success;
}
