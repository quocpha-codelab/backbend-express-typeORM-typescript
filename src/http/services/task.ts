import { getRepository } from 'typeorm';

import { abort } from '../../helper/error';
import Tasks from "../entities/Tasks";

interface AddTaskParams {
	title: string;
	content: string;
	userId: number;
}

interface GetTaskListParams {
	skip: number;
	take: number;
	userId: number;
}

export async function addTask({ title, content, userId }: AddTaskParams) : Promise<void> {
	const taskRepository = getRepository(Tasks);

	try {
		await taskRepository.save({ title, content, userId });
	} catch (error) {
		console.log(error);
		return abort(500, 'Can not add new task');
	}
}

export async function getTaskList({ skip, take, userId }: GetTaskListParams) : Promise<object> {
	const queryBuilder = getRepository(Tasks)
		.createQueryBuilder('task')
		.where('task.userId = :id', { id: userId })
		.select([
			'task.id id',
			'task.title title',
			'task.content content',
			'task.status status',
		]);

	const total = await queryBuilder.getCount();

	queryBuilder
		.skip(skip)
		.take(take);
	
	const tasks = await queryBuilder.getRawMany();

	return {
		tasks,
		total,
		skip,
		take,
	};
}