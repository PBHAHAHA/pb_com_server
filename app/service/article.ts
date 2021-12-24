import { Service } from 'egg';

export default class ArticleService extends Service {
  public async list() {
    const {app} = this
    const res = app.mysql.get('article')
    return res;
  }

  public async add(params) {
    const {app} = this
    const res = app.mysql.insert('article',params)
    return res
  }
}
