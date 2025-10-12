import type { FormEvent } from "react";

export type FormValueType = {
  title: string;
  content: string;
};

export type PostsContextType = {
  openWindow: boolean;
  setFormValue: React.Dispatch<React.SetStateAction<FormValueType>>;
  formValue: FormValueType;
  newPost: (event: FormEvent<HTMLFormElement>) => void;
  deletePost: (key: number) => void;
  showModal: () => void;
  handleCancel: () => void;
};
