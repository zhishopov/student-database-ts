import promptSync from "prompt-sync";
import type { LetterGrade, Student } from "./types.js";

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

function gradeToLetter(percent: number): LetterGrade {
  if (percent >= 93) return "A";
  if (percent >= 90) return "A-";
  if (percent >= 87) return "B+";
  if (percent >= 83) return "B";
  if (percent >= 80) return "B-";
  if (percent >= 77) return "C+";
  if (percent >= 73) return "C";
  if (percent >= 70) return "C-";
  if (percent >= 60) return "D";
  return "F";
}

const GPA_MAP: Record<LetterGrade, number> = {
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  D: 1.0,
  F: 0.0,
};

function letterToGpa(letter: LetterGrade): number {
  return GPA_MAP[letter];
}

function averagePercent(student: Student): number {
  const values = Object.values(student.grades);
  const gradesSum = values.reduce(
    (prevGrade, currentGrade) => prevGrade + currentGrade,
    0
  );
  const finalAverage = gradesSum / values.length;

  return finalAverage;
}

function averageGpa(student: Student): number {
  const letters = (Object.values(student.grades) as number[]).map(
    gradeToLetter
  );
  const gpas = letters.map(letterToGpa);
  const gpaSum = gpas.reduce((prevGpa, currentGpa) => prevGpa + currentGpa, 0);
  const average = gpaSum / gpas.length;

  return average;
}
