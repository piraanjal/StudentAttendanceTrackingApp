import { integer, pgTable, varchar, serial, boolean } from "drizzle-orm/pg-core"; // Use 'boolean' instead of 'pgBoolean'

export const GRADES = pgTable('grades', {
  id: serial('id').primaryKey(),
  grade: varchar('grade', { length: 10 }).notNull(),
});

export const STUDENTS = pgTable('students', {
  id: serial('id').primaryKey(), // serial for auto-increment
  name: varchar('name', { length: 20 }).notNull(),
  grade: varchar('grade', { length: 10 }).notNull(),
  address: varchar('address', { length: 50 }),
  contact: varchar('contact', { length: 11 }),
});

export const ATTENDANCE = pgTable('attendance', {
  id: serial('id').primaryKey(),  // Use serial() for auto-increment
  studentId: integer('studentId', { length: 11 }).notNull(),
  present: boolean('present').default(false),  // Use 'boolean()' for boolean values
  day: integer('day', { length: 11 }).notNull(),
  date: varchar('date', { length: 20 }).notNull(),  // Renamed 'Date'
});
