export class UserInfo {
  constructor(userNameSelector, userjobSelector, userAvatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userjobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }
  getUserInfo() {
    return {
      name: this._userName.textContent ,
      job: this._userJob.textContent
    }
  }
  getAvatarInfo() {
    return {
      avatar: this._userAvatar.src
    }
  }
  setUserInfo({name, job}) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }
  setAvatarInfo(avatar) {
    this._userAvatar.src = avatar;
  }
}
