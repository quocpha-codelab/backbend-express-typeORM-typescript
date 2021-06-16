import * as dayjs from 'dayjs';

export const formatDate = (dateTime: string | number): string => dayjs(dateTime).format('YYYY-MM-DD');

export const CURRENT_DATE = dayjs().format('YYYY-MM-DD');
