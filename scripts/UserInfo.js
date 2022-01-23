export class UserInfo {
  constructor(userNameSelector, userjobSelector) {
    this._userNameSelector = userNameSelector;
    this._userjobSelector = userjobSelector;
  }
  getUserInfo() {
    return {
      name: this._name,
      job: this._job
    }
  }
  setUserInfo(name, job) {
    this._userNameSelector.textContent = name;
    this._userjobSelector.textContent = job;
  }
}
