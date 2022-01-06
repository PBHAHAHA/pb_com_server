import { Controller } from 'egg';

class UserController extends Controller {
  async register() {
    const {ctx} = this
    const {password,username,ctime} = ctx.request.body
    console.log(password,username)

    const userInfo = await ctx.service.user.getUserByName(username) // 获取用户信息
    // 判断是否已经存在
    if (userInfo && userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '用户已被注册，请重新输入',
        data: null
      }
      return
    }

    const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png'
    const result = await ctx.service.user.register({
      username,
      password,
      signature: '世界和平。',
      ctime: ctime || JSON.stringify(new Date()),
      avatar: defaultAvatar
    });
    if(result){
      ctx.body = {
        code: 200,
        msg: "注册成功",
        data: null
      }
    }else{
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null
      }
    }
  }

  async login() {
    const {ctx,app} = this
    const { username, password } = ctx.request.body
    // 根据用户名，在数据库查找相对应的id操作
    const userInfo = await ctx.service.user.getUserByName(username)
    // 没找到说明没有该用户
    if (!userInfo || !userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账号不存在',
        data: null
      }
      return
    }

    // 找到用户，并且判断输入密码与数据库中用户密码。
    if (userInfo && password != userInfo.password) {
      ctx.body = {
        code: 500,
        msg: '账号密码错误',
        data: null
      }
      return
    }

    //生成token

    const token = app.jwt.sign({
      id: userInfo.id,
      username: userInfo.username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // token 有效期为 24 小时
    }, app.config.jwt.secret)


    ctx.body = {
      code: 200,
      message: "登录成功",
      data: {
        token
      }
    }
  }
  
  async test() {
    console.log('123')
    const {ctx, app} = this;
    const token = String(ctx.request.header.authorization);//先拿到token 再通过egg-jwt解密token
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    // 响应接口
    ctx.body = {
      code: 200,
      message: '获取成功',
      data: {
        decode
      }
    }
  }
}
export default UserController