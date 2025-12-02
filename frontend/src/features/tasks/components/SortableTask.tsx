import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../../../types/task";
import TaskCard from "./TaskCard";
import { User } from "../../../types/user";

type Props = {
  task: Task;
  status: Task["status"];
  users: User[];
};

export default function SortableTask({ task, status, users }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      data: {
        type: "task",
        status,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    marginBottom: "0.5rem",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} users={users} />
    </div>
  );
}
