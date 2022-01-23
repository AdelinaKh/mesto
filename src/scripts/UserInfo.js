export class UserInfo {
  constructor(userNameSelector, userjobSelector) {
    this._userNameSelector = userNameSelector;
    this._userjobSelector = userjobSelector;
  }
  getUserInfo() {
    return {
      name: this._userNameSelector.textContent ,
      job: this._userjobSelector.textContent
    }
  }
  setUserInfo({name, job}) {
    this._userNameSelector.textContent = name;
    this._userjobSelector.textContent = job;
  }
}
