export default async (req, res) => {
  const { id } = req.query;
  const data = await fetch(`http://localhost:3333/episode/${id}`).then(res => res.json());
  return res.json(data);
}
