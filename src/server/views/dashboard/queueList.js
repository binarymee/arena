async function handler(req, res) {
  const {Queues} = req.app.locals;
  const basePath = req.baseUrl;
  const queuesList = Queues.list();
  const queues = [];
  for( let queueMeta of queuesList) {
    try{
      const queue = await Queues.get(queueMeta.name, queueMeta.hostId);
      queueMeta.jobCounts = await queue.getJobCounts(); 
      queues.push(queueMeta); 
    } catch(err) {
      console.log(err);
    }   
  }
  return res.render('dashboard/templates/queueList', { basePath, queues });
}

module.exports = handler;
