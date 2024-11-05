import express, { type Application } from 'express'

class ExpressApp {
  public app: Application
  constructor() {
    this.app = express()
  }
}

export default ExpressApp
