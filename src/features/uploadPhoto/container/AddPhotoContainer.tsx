import { UploadFile, UploadProps } from "antd";
import AddPhoto from "../ui/AddPhoto";
import { onPreview } from "../lib/preview";

type props = {
  fileList: UploadFile[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
};

export default function AddPhotoContainer(props: props) {
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    props.setFileList(newFileList);
  };
  return (
    <AddPhoto
      onChange={onChange}
      onPreview={onPreview}
      fileList={props.fileList}
    /> 
  );
}
