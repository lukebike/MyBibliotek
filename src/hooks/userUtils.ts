import dayjs from "dayjs";

export function getNewUsers(users: { registrationDate: string }[]): number {
  const now = dayjs();
  const thisMonth = now.month();
  const thisYear = now.year();
  const usersThisMonth = users.filter((u) => {
    const reg = dayjs(u.registrationDate);
    return reg.year() === thisYear && reg.month() === thisMonth;
  }).length;

  return usersThisMonth;
}
