import React from "react";

interface Props {
  path: any;
  title: string;
  component: React.FC;
  rightMenus?: React.FC;
  noHeader?: boolean;
}

export default function Route(_: Props) {
  // 실제로 그리는 것은 Routes

  return null;
}
