import { Controller } from "egg";

export default class ArticleController extends Controller {
  public async list() {
    const {ctx} = this
    ctx.body = await ctx.service.article.list()
  }

  public async add() {
    const {ctx} = this
    const {title,content,info,poll_count,is_top,article_type_id,article_tag,create_date = new Date()} = ctx.request.body
    if(!title || !content || !article_type_id || !create_date){
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null
      }
    }
    try {
      const result = await ctx.service.article.add({
        title,content,info,poll_count,is_top,article_type_id,article_tag,create_date
      })
      console.log(result)
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: null
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }

  public async getArticleById() {
    const { ctx } = this
    const { id } = ctx.request.body
    const art = await ctx.service.article.getArticleById(id)
    if(art) {
      console.log("请求成~",art)
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: art
      }
      return
    }else{
      ctx.body = {
        code: 400,
        msg: '无数据',
        data: art
      }
      return
    }
  }
}