import { useRouter } from "next/router";
import React from "react";

export function HeadingSec({ title }) {
  return (
    <>
      <div id="content-title">
        {title}
      </div>
    </>
  );
}
