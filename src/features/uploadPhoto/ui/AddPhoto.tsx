import { Upload, UploadFile, UploadProps } from "antd";

type props = {
  onChange: UploadProps["onChange"];
  onPreview: UploadProps["onPreview"];
  fileList: UploadFile[];
};

export default function AddPhoto(props: props) {
  return (
    <div className="h-fit flex flex-row gap-2 items-center">
      <Upload
        listType="picture-card"
        fileList={props.fileList}
        onChange={props.onChange}
        onPreview={props.onPreview}
        beforeUpload={() => {
          return false;
        }}
        maxCount={1}
      >
        {props.fileList.length < 1 && "+ Upload"}
      </Upload>
      <h2 className="text-xl font-bold text-white">add photo</h2>
    </div>
  );
}
