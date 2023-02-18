export type AuthData = {
  email: string;
  password: string;
};

export type initialAuthData = {
  id: string;
  email: string;
  statusText: string;
};

export type UserData = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

export type initialUserData = {
  data: UserData[];
};

type ConversationData = {
  creator: UserData;
  recipient: UserData;
  id: number;
  createdAt: string;
  messages: string[];
};

export type initialConversationsData = {
  data: ConversationData[];
};

export type NewConversationData = {
  recipientId: number;
  message: string;
};
