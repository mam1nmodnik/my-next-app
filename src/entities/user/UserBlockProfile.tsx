import { Divider } from "antd";
import ProfilePost from "../post/container/MyPostContainer";
import IsUserProfilInfoContainer from "./container/IsUserProfilInfoContainer";

export default function UserBlockProfile() {
  return (
    <div className="w-full flex justify-center h-full min-h-screen">
      <div className="max-w-[568px] w-full border border-r-white/45 border-l-white/45">
        <div className="w-full aspect-[3/1] max-h-[200px] bg-[#3E3E3E]" />
        <IsUserProfilInfoContainer />
        <Divider
          size="small"
          className="border border-white/35 m-0"
          style={{ margin: 0 }}
        />
        <ProfilePost />
      </div>
    </div>
  );
}
