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
}
