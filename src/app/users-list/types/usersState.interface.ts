import { NotificationInterface } from "@shared/types/notification.interface";
import { UserInterface } from "@shared/types/user.interface";

export interface UsersStateInterface {
  notification: NotificationInterface | null;
  data: UserInterface[];
  selectedUser: UserInterface | null;
}
