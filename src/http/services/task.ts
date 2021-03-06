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
    const maxTaskPosition = await taskRepository
      .createQueryBuilder('tasks')
      .where('tasks.date = :date', { date })
      .orderBy('tasks.position', 'DESC')
      .getRawOne();
    const newPosition = maxTaskPosition ? maxTaskPosition.tasks_position + 1 : 0;

    const newTask = taskRepository.create({ content, user: { id: userId }, position: newPosition, date });
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
      'tasks.position position',
      'tasks.date date',
    ])
    .orderBy('tasks.position', 'DESC');

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
  const taskInfo = await taskRepository.findOne({ where: { id: taskId }, relations: ['user'] });

  if (taskInfo.user.id !== userId) {
    abort(400, 'You cant not update this task');
  }

  try {
    const maxTaskPosition = await taskRepository
      .createQueryBuilder('tasks')
      .where('tasks.date = :date', { date })
      .orderBy('tasks.position', 'DESC')
      .getRawOne();
    const newPosition = maxTaskPosition ? maxTaskPosition.tasks_position + 1 : 0;

    await taskRepository.update(taskId, { position: newPosition, date });
  } catch (error) {
    abort(500, 'Can not update task');
  }
}

interface UpdateTaskPositionParams {
  position: number;
  userId: number;
  taskId: number;
}
export async function updateTaskPosition({ position, userId, taskId }: UpdateTaskPositionParams): Promise<any> {
  try {
    await getManager().transaction(async (transaction) => {
      const taskRepository = transaction.getRepository(Tasks);
      const taskInfo = await taskRepository.findOne({ where: { id: taskId }, relations: ['user'] });

      if (taskInfo.user?.id !== userId) {
        abort(400, 'You cant not update this task');
      }

      const taskDate = taskInfo.date;

      await taskRepository
        .createQueryBuilder('tasks')
        .where('tasks.date = :date', { date: taskDate })
        .andWhere('tasks.position >= :taskPosition', { taskPosition: position })
        .orderBy('tasks.position', 'DESC')
        .update()
        .set({ position: () => 'tasks.position + 1' })
        .execute();

      taskInfo.position = position;

      await taskRepository.save(taskInfo);
    });
  } catch (error) {
    abort(500, 'Can not update task');
  }
}

interface UpdateTaskStatusParams {
  status: number;
  userId: number;
  taskId: number;
}
export async function updateTaskStatus({ status, userId, taskId }: UpdateTaskStatusParams): Promise<any> {
  const taskRepository = getRepository(Tasks);
  const taskInfo = await taskRepository.findOne({ where: { id: taskId }, relations: ['user'] });

  if (taskInfo.user?.id !== userId) {
    abort(400, 'You cant not update this task');
  }

  try {
    await taskRepository.update(taskId, { status });
  } catch (error) {
    abort(500, 'Can not update task');
  }
}

interface DeleteTaskParams {
  userId: number;
  taskId: number;
}
export async function removeTask({ userId, taskId }: DeleteTaskParams): Promise<any> {
  const taskRepository = getRepository(Tasks);
  const taskInfo = await taskRepository.findOne({ where: { id: taskId }, relations: ['user'] });

  if (taskInfo.user?.id !== userId) {
    abort(400, 'You cant not remove this task');
  }

  try {
    await taskRepository.remove(taskInfo);
  } catch (error) {
    abort(500, 'Can not update task');
  }
}
