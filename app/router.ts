import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret); // 传入加密字符串
  // 管理系统路由
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/test',_jwt, controller.user.test);//测试接口
  router.post('/api/article/add',_jwt,controller.article.add)//添加文章

  // web展示路由
  router.get('/web/home/info', controller.home.index);
  router.get('/web/article/list',controller.article.list)
};
