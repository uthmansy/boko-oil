import { useState } from "react";
import { useMutation } from "react-query";
import useAuthStore from "../store/auth";
import { App } from "antd";

interface HookReturn {
  collapsed: boolean;
  handleCollapse: () => void;
  isLoading: boolean;
  handleSignOut: () => void;
}

function useDashboard(): HookReturn {
  const [collapsed, setCollapsed] = useState(false);
  const { signOut } = useAuthStore();
  const { message } = App.useApp();

  const { mutate: handleSignOut, isLoading } = useMutation({
    mutationFn: async () => {
      await signOut();
    },
    onError: (error) => {
      message.error(error as string);
    },
  });

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return { collapsed, handleCollapse, isLoading, handleSignOut };
}

export default useDashboard;
