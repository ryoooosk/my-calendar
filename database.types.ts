export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      schedule_reminders: {
        Row: {
          created_at: string;
          id: number;
          identifier: string;
          reminder_offset: number;
          reminder_time: string;
          reminder_type: string;
          schedule_id: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          identifier: string;
          reminder_offset: number;
          reminder_time: string;
          reminder_type: string;
          schedule_id: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          identifier?: string;
          reminder_offset?: number;
          reminder_time?: string;
          reminder_type?: string;
          schedule_id?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'schedule_reminders_schedule_id_fkey';
            columns: ['schedule_id'];
            isOneToOne: false;
            referencedRelation: 'schedules';
            referencedColumns: ['id'];
          },
        ];
      };
      schedules: {
        Row: {
          color: string;
          created_at: string;
          deleted_at: string | null;
          end_date: string;
          event_id: string;
          id: number;
          is_all_day: boolean;
          is_public: boolean;
          notes: string | null;
          start_date: string;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          color?: string;
          created_at?: string;
          deleted_at?: string | null;
          end_date: string;
          event_id: string;
          id?: number;
          is_all_day?: boolean;
          is_public?: boolean;
          notes?: string | null;
          start_date: string;
          title: string;
          updated_at?: string;
          user_id?: string;
        };
        Update: {
          color?: string;
          created_at?: string;
          deleted_at?: string | null;
          end_date?: string;
          event_id?: string;
          id?: number;
          is_all_day?: boolean;
          is_public?: boolean;
          notes?: string | null;
          start_date?: string;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'schedules_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          biography: string | null;
          created_at: string;
          deleted_at: string | null;
          display_name: string;
          email: string;
          id: string;
          updated_at: string;
          user_name: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          biography?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          display_name: string;
          email: string;
          id?: string;
          updated_at?: string;
          user_name?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          biography?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          display_name?: string;
          email?: string;
          id?: string;
          updated_at?: string;
          user_name?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

// Schema: public
// Tables
export type ScheduleReminders =
  Database['public']['Tables']['schedule_reminders']['Row'];
export type InsertScheduleReminders =
  Database['public']['Tables']['schedule_reminders']['Insert'];
export type UpdateScheduleReminders =
  Database['public']['Tables']['schedule_reminders']['Update'];

export type Schedules = Database['public']['Tables']['schedules']['Row'];
export type InsertSchedules =
  Database['public']['Tables']['schedules']['Insert'];
export type UpdateSchedules =
  Database['public']['Tables']['schedules']['Update'];

export type Users = Database['public']['Tables']['users']['Row'];
export type InsertUsers = Database['public']['Tables']['users']['Insert'];
export type UpdateUsers = Database['public']['Tables']['users']['Update'];
