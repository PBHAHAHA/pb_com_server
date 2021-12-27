import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/api/home/info', controller.home.index);

  router.post('/api/article/add',controller.article.add)
  router.get('/api/article/list',controller.article.list)
};
