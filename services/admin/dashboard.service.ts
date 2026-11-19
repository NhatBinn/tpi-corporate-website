import * as repo from "@/repositories/admin/dashboard.repository";
import { runMutation, runQuery } from "./shared";

export const getDashboardStats = () => runQuery("getDashboardStats", repo.countDashboardStats);
export const getAdminFeedback = () => runQuery("getAdminFeedback", repo.findAdminFeedback);
export const removeFeedback = (id: string) => runMutation("removeFeedback", () => repo.deleteFeedback(id));
