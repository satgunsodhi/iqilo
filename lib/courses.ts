import { competitiveProgrammingRoadmap } from "@/data/courses/competitive-programming-roadmap";
import { advancedBridgeRoadmap } from "@/data/courses/advanced-bridge-roadmap";
import type { Course } from "./types";

const courses: Course[] = [
  competitiveProgrammingRoadmap,
  advancedBridgeRoadmap,
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
