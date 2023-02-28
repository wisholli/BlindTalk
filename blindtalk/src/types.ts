export type AuthData = {
  email: string;
  password: string;
};

export type initialAuthData = {
  id: null | number;
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
  messages: MessageData[];
};

export type initialConversationsData = {
  data: ConversationData[];
  currentDialog: null | ConversationData;
};

export type NewConversationData = {
  recipientId: number;
  message: string;
};

export type MessageData = {
  id?: number;
  content: string;
  createdAt: string;
  author: UserData;
};

export type initialMessagesData = {
  id: number;
  messages: MessageData[];
};

export type SendMessageData = {
  conversationId: number;
  content: string;
};
