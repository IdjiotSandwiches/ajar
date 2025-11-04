import { User } from "./user";

declare module "@inertiajs/core" {
  interface PageProps {
    auth: {
      user?: User;
    };
    enums: {
        roles_enum: Record<string, number>;
    };
    [key: string]: any;
  }
}
