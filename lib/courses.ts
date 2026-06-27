import { competitiveProgrammingRoadmap } from "@/data/courses/core-programming-roadmap";
import { advancedBridgeRoadmap } from "@/data/courses/advanced-programming-roadmap";
import { quantFoundationRoadmap } from "@/data/courses/python-for-quants-data-wrangling";
import { QuantMLRoadmap } from "@/data/courses/python-for-quants-predictive-modeling";
import { deepLearningQuantRoadmap } from "@/data/courses/python-for-quants-deep-learning-portfolio";
import { derivativesRiskRoadmap } from "@/data/courses/python-for-quants-derivatives-risk";
import type { Course } from "./types";

const courses: Course[] = [
  competitiveProgrammingRoadmap,
  advancedBridgeRoadmap,
  quantFoundationRoadmap,
  QuantMLRoadmap,
  deepLearningQuantRoadmap,
  derivativesRiskRoadmap
];

export function listCourses(): Course[] {
  return courses;
}

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function getDayByNumber(
  course: Course,
  dayNumber: number
): { day: import("./types").Day; week: import("./types").Week } | undefined {
  for (const week of course.weeks) {
    const day = week.days.find((d) => d.dayNumber === dayNumber);
    if (day) return { day, week };
  }
  return undefined;
}
