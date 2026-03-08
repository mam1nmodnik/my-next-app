"use client";

import { Layout } from "antd";
import FooterContainer from "@/shared/ui/Footer/FooterContainer";

const { Footer } = Layout;
export function FooterMobile() {

  return (
    <Footer
      style={{ textAlign: "center" }}
      className="flex justify-center w-full fixed bottom-2 "
    >
      <FooterContainer />
    </Footer>
  );
}
