import { getRepository, getManager } from 'typeorm';

import { abort } from '../../helper/error';
import Tasks from '../entities/Tasks';

interface AddTaskParams {
  content: string;
  userId: number;
  date: string;
}
export async function addTask({ content, userId, date }: AddTaskParams): Promise<void> {
  const taskRepository = getRepository(Tasks);

  try {
    const maxTaskRank = await taskRepository
      .createQueryBuilder('tasks')
      .where('tasks.date = :date', { date })
      .orderBy('tasks.rank', 'DESC')
      .getRawOne();
    const newRank = maxTaskRank ? maxTaskRank.tasks_rank + 1 : 0;

    const newTask = taskRepository.create({ content, user: { id: userId }, rank: newRank, date });
    await taskRepository.save(newTask);
  } catch (error) {
    abort(500, 'Can not add new task');
  }
}

interface GetTaskListParams {
  date: string;
  userId: number;
}
export async function getTaskList({ date, userId }: GetTaskListParams): Promise<Record<string, unknown>> {
  const queryBuilder = getRepository(Tasks)
    .createQueryBuilder('tasks')
    .where('tasks.date = :date', { date })
    .andWhere('tasks.userId = :userId', { userId })
    .select([
      'tasks.id id',
      'tasks.content content',
      'tasks.status status',
      'tasks.rank',
      "DATE_FORMAT(tasks.date,'%y-%m-%d') date",
    ])
    .orderBy('tasks.rank', 'DESC');

  const tasks = await queryBuilder.getRawMany();

  return { tasks };
}

interface UpdateTaskContentParams {
  content: string;
  userId: number;
  taskId: number;
}
export async function updateTaskContent({ content, userId, taskId }: UpdateTaskContentParams): Promise<any> {
  const taskRepository = getRepository(Tasks);
  const taskInfo = await taskRepository.findOne({ where: { id: taskId }, relations: ['user'] });

  if (taskInfo.user?.id !== userId) {
    abort(400, 'You cant not update this task');
  }

  try {
    await taskRepository.update(taskId, { content });
  } catch (error) {
    abort(500, 'Can not update task');
  }
}

interface UpdateTaskDateParams {
  date: string;
  userId: number;
  taskId: number;
}
export async function updateTaskDate({ date, userId, taskId }: UpdateTaskDateParams): Promise<any> {
  const taskRepository = getRepository(Tasks);
  const taskInfo = await taskRepository.findOne(taskId);

  if (taskInfo.user?.id !== userId) {
    abort(400, 'You cant not update this task');
  }

  try {
    const maxTaskRank = await taskRepository
      .createQueryBuilder('tasks')
      .where('tasks.date = :date', { date })
      .orderBy('tasks.rank', 'DESC')
      .getRawOne();
    const newRank = maxTaskRank ? maxTaskRank.tasks_rank + 1 : 0;

    await taskRepository.update(taskId, { rank: newRank, date });
  } catch (error) {
    abort(500, 'Can not update task');
  }
}

interface UpdateTaskRankParams {
  rank: number;
  userId: number;
  taskId: number;
}
export async function updateTaskRank({ rank, userId, taskId }: UpdateTaskRankParams): Promise<any> {
  const taskRepository = getRepository(Tasks);
  const taskInfo = await taskRepository.findOne({ where: { id: taskId }, relations: ['user'] });

  if (taskInfo.user?.id !== userId) {
    abort(400, 'You cant not update this task');
  }

  const taskDate = taskInfo.date;
  const tasksQueryBuilder = taskRepository.createQueryBuilder('tasks');

  try {
    await getManager().transaction(async () => {
      await tasksQueryBuilder
        .where('tasks.date = :date', { date: taskDate })
        .andWhere('tasks.rank >= :taskRank', { taskRank: rank })
        .update()
        .set({ rank: () => 'tasks.rank + 1' })
        .execute();

      taskInfo.rank = rank;

      await taskRepository.save(taskInfo);
    });
  } catch (error) {
    abort(500, 'Can not update task');
  }
}
