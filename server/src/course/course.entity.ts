import { Schema } from 'mongoose'

export class Course {
  constructor(public title: string, public price: number, public image: string) {}
}