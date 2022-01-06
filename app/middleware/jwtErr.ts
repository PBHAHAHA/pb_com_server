import { Context } from 'egg';
export default (secret) => {
  return async function jwtErr(ctx:Context,next: () => Promise<any>) {
    const token = String(ctx.request.header.authorization)
    let decode:String;
    if(token!='undefined'&&token){
      try {
        decode = ctx.app.jwt.verify(token, secret);
        console.log(decode)
        await next()
      } catch (error) {
        console.log("鉴权Error",error)
        ctx.status = 200
        ctx.body = {
          msg: "token已过期，请重新登录",
          code: 401
        }
        return;
      }
    }else{
      ctx.status = 200;
      ctx.body = {
        code: 401,
        msg: 'token不存在',
      };
      return;
    }
  }
}