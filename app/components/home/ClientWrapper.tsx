"use client";

import React, { ReactNode } from "react";

interface ClientWrapperProps {
  children: ReactNode;
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  return <>{children}</>;
};

export default ClientWrapper;
