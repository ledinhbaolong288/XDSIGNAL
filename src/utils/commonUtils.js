import notifee from '@notifee/react-native';
import { FIREBASE_DBR } from '../../firebaseConfig';
import { onValue, ref, set } from 'firebase/database';
import { t } from 'i18next';

export async function onDisplayNotification({ title, body }) {
  // Request permissions (required for iOS)
  await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId,
      // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

export function timeAgo(prevDate) {

  const diff = Number(new Date().getTime()) - prevDate;
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;
  switch (true) {
    case diff < minute:
      const seconds = Math.round(diff / 1000);
      return `${seconds} ${seconds > 1 ? t("seconds") : t("seconds")}`
    case diff < hour:
      return Math.round(diff / minute) + t("minutes ago");
    case diff < day:
      return Math.round(diff / hour) + t("hours ago");
    case diff < month:
      return Math.round(diff / day) + t("days ago");
    case diff < year:
      return Math.round(diff / month) + t("months ago");
    case diff > year:
      return Math.round(diff / year) + t("years ago");
    default:
      return "";
  }
};

export const addNotification = (title, body, body2, noti) => {
  const db = FIREBASE_DBR;
  const date = new Date().getTime()
  noti === null ? null :
    set(ref(db, "noti/" + `${noti}` + `${date}`), {
      title: title,
      body: body,
      body2: body2,
      time: `${date}`
    });
}

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}