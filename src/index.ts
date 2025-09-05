import promptSync from "prompt-sync";
import type { Student } from "./types.js";

const prompt = promptSync();

const students: Student[] = [];

function createStudent(
  name: string,
  english: number,
  math: number,
  history: number
): Student {
  return { name, grades: { English: english, Math: math, History: history } };
}

function addStudent(student: Student): void {
  students.push(student);
}

function getStudentByName(name: string): Student | undefined {
  return students.find((student) => student.name === name);
}

function getAllStudentNames(): string[] {
  return students.map((student) => student.name);
}
