import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1640314832971_1555';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.mysql = {
    client: {
      host: "localhost",
      port: "3306",
      user: "root",
      password: "123456",
      database: "pb_com_sql",
    },
    app: true, //是否加载到app
    agent: false, //是否加载到agent
  }

  config.security = {
    csrf: {
      headerName: 'csrf_token',// 自定义请求头
    }
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};


