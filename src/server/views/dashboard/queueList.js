async function handler(req, res) {
  const {Queues} = req.app.locals;
  const queuesList = Queues.list();
  const queues = [];
  for( let queueMeta of queuesList) {
  	try{
  		const queue = await Queues.get(queueMeta.name, queueMeta.host);
  		queueMeta.jobCounts = await queue.getJobCounts();	
      queues.push(queueMeta);	
  	} catch(err) {
  		console.log(err);
  	}  	
  }
  console.log(queues);
  return res.render('dashboard/templates/queueList', { queues });
}

module.exports = handler;
