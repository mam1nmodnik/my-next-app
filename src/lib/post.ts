import { NoticeType } from "antd/es/message/interface";

type DeletePost = {
    id: number; 
    openMessege: (response:{ notice: NoticeType | undefined, message: string} ) => void
}


export const deletePost = async ({id, openMessege}: DeletePost) => {
    const response = await fetch(`/api/posts/delete-post/${id}`, {
        method: "DELETE",
    });
    const res = await response.json();
    openMessege(res)
}