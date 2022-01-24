import { Service } from 'egg';

export default class ArticleService extends Service {
  public async list() {
    const {app} = this
    const res = await app.mysql.select('article')
    if(res){
      return res
    }else{
      return {
        code: 204,
        data: [],
        msg: "暂无数据"
      }
    }
  }

  public async add(params) {
    const {app} = this
    const res = app.mysql.insert('article',params)
    return res
  }

  public async getArticleById(id) {
    // console.log('------id--------',id)
    const {app} = this
    try {
      const article = await app.mysql.get('article',{id: Number(id)})
      // console.log("------------------------------",article)
      return article
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
