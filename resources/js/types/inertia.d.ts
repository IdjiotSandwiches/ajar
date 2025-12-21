import { User } from "./user";

declare module "@inertiajs/core" {
  interface PageProps {
    auth: {
      user?: User;
    };
    enums: {
        roles_enum: Record<string, number>;
        degree_type_enum: Record<string, number>;
        reminder_enum: Record<string, number>;
        state_enum: Record<string, number>;
        days_enum: Record<string, string>;
    };
    [key: string]: any;
  }
}
