import { LegacyRef } from "react";

// auth data
export type AuthData = {
  email: string;
  password: string;
};

export type initialAuthData = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  profileId: EntityId;
  userId: EntityId;
  error: EntityError;
  isLoading: boolean;
};

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  sex: Sex;
};

export type EntityId = number | null;

//users data
export type UserData = {
  id: EntityId;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  profileId: EntityId;
  profile: {
    id: EntityId;
    city: string | null;
    country: string | null;
    birthDay: string | null;
    sex: string | null;
    status: string | null;
    avatarUrl: string | null;
  };
};

export type EntityError = string | null | undefined;

export type initialUserData = {
  users: UserData[];
  isLoading: boolean;
  error: EntityError;
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
  conversations: ConversationData[];
  currentDialog: null | ConversationData;
  isChatSelected: boolean;
  error: EntityError;
  isLoading: boolean;
};

//messages data
export type MessageData = {
  id: number;
  content: string;
  createdAt: string;
  author: UserData;
};

export type initialMessagesData = {
  conversationId: number;
  messages: MessageData[];
  editMessageId: number | null;
  error: EntityError;
  isLoading: boolean;
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
  user: Omit<UserData, "id" | "email" | "profile">;
};

export type initialProfilesData = {
  currentUserProfile: UserProfile | null;
  authorizedUserAvatar: string | null;
  userForUpdate: Omit<UserData, "email" | "profileId"> | null;
  isLoading: boolean;
  error: EntityError;
};

export type UserProfileInfoForUpdate = Omit<UserProfile, "user"> & {
  firstName: string;
  lastName: string;
};

export type ValidationErrors = {
  statusCode: number;
  message: string;
};
