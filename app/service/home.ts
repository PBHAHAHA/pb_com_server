import { Service } from 'egg';

/**
 * Test Service
 */
export default class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async index() {
    const {app} = this
    const res = app.mysql.get('home')
    return res;
  }
}
