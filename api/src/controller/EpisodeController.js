import db from '../database/EpisodeData.json';
export default class EpisodeController {
  async index(_,res) { return res.json(db); }
  async show(req,res) {
    const { id } = req.params;
    const data = db.filter(d => d.id === id);
    if(data.length <= 0) {
      return res.status(404).json({
        error: 'Not found episode with id',
        code: 404
      })
    }
    return res.json(data[0]);
  }
}