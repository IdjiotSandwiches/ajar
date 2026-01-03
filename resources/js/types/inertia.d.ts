import { User } from "./user";

declare module "@inertiajs/core" {
  interface PageProps {
    auth: {
      user?: User;
      notifications?: any[];
    };
    enums: {
        roles_enum: Record<string, number>;
        degree_type_enum: Record<string, number>;
        reminder_enum: Record<string, number>;
        state_enum: Record<string, number>;
        days_enum: Record<string, string>;
        payment_status_enum: Record<string, string>;
        course_status_enum: Record<string, string>;
        learning_status_enum: Record<string, number>;
    };
    [key: string]: any;
  }
}
