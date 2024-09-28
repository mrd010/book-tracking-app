import { Router } from 'express';

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.json({ msg: 'api start' });
});

export default apiRouter;
