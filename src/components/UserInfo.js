export class UserInfo {
  constructor(userNameSelector, userjobSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userjobSelector);
  }
  getUserInfo() {
    return {
      name: this._userName.textContent ,
      job: this._userJob.textContent
    }
  }
  setUserInfo({name, job}) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }
}
