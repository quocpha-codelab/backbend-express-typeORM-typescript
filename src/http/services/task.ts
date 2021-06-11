import { getRepository } from 'typeorm';

import { abort } from '../../helper/error';
import Tasks from '../entities/Tasks';

interface AddTaskParams {
  title: string;
  content: string;
  userId: number;
}
export async function addTask({ title, content, userId }: AddTaskParams): Promise<void> {
  const taskRepository = getRepository(Tasks);

  try {
    await taskRepository.save({ title, content, userId });
  } catch (error) {
    abort(500, 'Can not add new task');
  }
}

interface GetTaskListParams {
  skip: number;
  take: number;
  userId: number;
}
export async function getTaskList({ skip, take, userId }: GetTaskListParams): Promise<Record<string, unknown>> {
  const queryBuilder = getRepository(Tasks)
    .createQueryBuilder('task')
    .where('task.userId = :id', { id: userId })
    .select(['task.id id', 'task.title title', 'task.content content', 'task.status status']);

  const total = await queryBuilder.getCount();

  queryBuilder.skip(skip).take(take);

  const tasks = await queryBuilder.getRawMany();

  return {
    tasks,
    total,
    skip,
    take,
  };
}

interface UpdateTaskParams {
  title: string;
  content: string;
  userId: number;
  taskId: number;
  status: number;
}
export async function updateTask({ title, content, userId, taskId, status }: UpdateTaskParams): Promise<any> {
  // const taskRepository = getRepository(Tasks);
  // const taskInfo = taskRepository.findOne(taskId);
  // return taskInfo;
  // try {
  //   await taskRepository.update(taskId, { status });
  // } catch (error) {
  //   abort(500, 'Can not update task');
  // }
}
