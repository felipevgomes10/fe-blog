import en from "./src/i18n/messages/en.json";

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
