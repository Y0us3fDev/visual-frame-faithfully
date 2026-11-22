import {
  Activity, Ambulance, Baby, Bone, Brain, Eye, Flower2, HeartPulse, Hand, Scissors, Stethoscope, Syringe, Microscope, type LucideIcon,
} from "lucide-react";

export const departmentIcons: Record<string, LucideIcon> = {
  heart: HeartPulse,
  brain: Brain,
  bone: Bone,
  baby: Baby,
  flower: Flower2,
  ambulance: Ambulance,
  stethoscope: Stethoscope,
  scissors: Scissors,
  eye: Eye,
  hand: Hand,
  activity: Activity,
  syringe: Syringe,
  microscope: Microscope,
};
export const departmentIconFor = (key: string): LucideIcon => departmentIcons[key] ?? Stethoscope;
