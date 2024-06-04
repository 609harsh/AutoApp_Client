export type AppType = {
  id: string;
  name: string;
  icon: any;
  isPublic: boolean;
  isMaintenanceOn: boolean;
  currentVersionId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type itemType = {
  key: string;
  label: JSX.Element;
};
