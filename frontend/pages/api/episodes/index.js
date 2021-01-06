export default async (req,res) => {
  const data = await fetch(`http://localhost:3333/episodes`).then(res => res.json());
  return res.json(data);
}