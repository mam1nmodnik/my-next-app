import { createContext, ReactNode, useContext, useState } from "react";
import { message } from "antd";
import type { ApiFeedback, ApiNotice } from "@/shared/api/types";
import { useEffect } from "react";

type MessageType = {
  notice?: ApiNotice | undefined;
  content?: string;
};

type TypeMessageContext = {
  openMessage: (response: Partial<ApiFeedback>) => void;
};

const MessageContext = createContext<TypeMessageContext | undefined>(undefined);

export function MessageContextProvider({ children }: { children: ReactNode }) {
  const [myMessage, setMyMessage] = useState<MessageType>({});
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (!myMessage.notice || !myMessage.content) return;
    messageApi.open({
      
      type: myMessage.notice,
      content: myMessage.content,
    });
  }, [myMessage, messageApi]);

  function openMessage(response: Partial<ApiFeedback>) {
    setMyMessage({
      notice: response.notice,
      content: response.message,
    });
  }

  return (
    <MessageContext.Provider value={{ openMessage }}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
}

export function useMessageContext() {
  const context = useContext(MessageContext);
  if (!context)
    throw new Error(
      "useMessageContext must be used inside MessageContextProvider",
    );
  return context;
}
