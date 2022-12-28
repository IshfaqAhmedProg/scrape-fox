import { useRouter } from "next/router";
import TaskPage from "../../../components/DashboardComponents/Home/TaskPage";

export default function Task() {
  const router = useRouter();
  const { task } = router.query;
  return <TaskPage task={task} />;
}
