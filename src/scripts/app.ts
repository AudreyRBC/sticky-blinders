import "../styles/main.scss"

import Grid from "./Helpers/Grid"
import WindowAPP from "./Helpers/Window"
import HelloMe from "./Helpers/HelloMe"
class _APP {
  constructor() {
    this.init()
  }

  init() {
    new WindowAPP()
    new Grid()

    HelloMe()
  }
}

document.addEventListener('DOMContentLoaded', () => new _APP())