import { LegacyRef } from "react";

// auth data
export type AuthData = {
  email: string;
  password: string;
};

export type initialAuthData = {
  id: null | number;
  email: string;
};

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  sex: Sex;
};

//users data
export type UserData = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profileId: number;
};

export type initialUserData = {
  data: UserData[];
};

//conversations data
export type ConversationData = {
  creator: UserData;
  recipient: UserData;
  id: number;
  createdAt: string;
};

export type NewConversationData = {
  creator?: UserData;
  recipientId: number;
  message: string;
  createdAt?: string;
};

export type initialConversationsData = {
  data: ConversationData[];
  currentDialog: null | ConversationData;
  isChatSelected: boolean;
};

//messages data
export type MessageData = {
  id: number;
  content: string;
  createdAt: string;
  author: UserData;
};

export type initialMessagesData = {
  id: number;
  messages: MessageData[];
  editMessageId?: number;
};

export type SendMessageData = {
  conversationId: number;
  content: string;
};

export type MessagesProps = MessageData & {
  lastMessageRef: LegacyRef<HTMLDivElement> | undefined;
  handleClick: (content: string) => void;
};

export type EditMessageData = {
  messageId: number;
  content: string;
};

//checkbox data
export type ActiveCheckBox = {
  male: boolean;
  female: boolean;
};

//users profiles data
export enum Sex {
  male = "male",
  female = "female",
  none = "",
}

export type UserProfile = {
  id: number;
  city: string | null;
  country: string | null;
  birthDay: string | null;
  sex: Sex;
  status: string | null;
  avatarUrl: string | null;
  user: Omit<UserData, "id" | "email">;
};

export type initialProfilesData = {
  data: UserProfile[];
  currentUserProfile: UserProfile | null;
  userForUpdate: Omit<UserData, "email" | "profileId"> | null;
};

export type UserProfileInfoForUpdate = {
  id?: number;
  birthDay?: string | null;
  city?: string | null;
  country?: string | null;
  sex?: Sex;
  status?: string | null;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string | null;
};
