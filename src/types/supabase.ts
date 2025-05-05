export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          account_name: string
          balance: number
          description: string | null
          id: string
          type: Database["public"]["Enums"]["account_type"]
        }
        Insert: {
          account_name: string
          balance?: number
          description?: string | null
          id?: string
          type: Database["public"]["Enums"]["account_type"]
        }
        Update: {
          account_name?: string
          balance?: number
          description?: string | null
          id?: string
          type?: Database["public"]["Enums"]["account_type"]
        }
        Relationships: []
      }
      damages: {
        Row: {
          added_by: string | null
          created_at: string | null
          date: string
          id: string
          item: string | null
          quantity: number
          warehouse: string | null
        }
        Insert: {
          added_by?: string | null
          created_at?: string | null
          date: string
          id?: string
          item?: string | null
          quantity: number
          warehouse?: string | null
        }
        Update: {
          added_by?: string | null
          created_at?: string | null
          date?: string
          id?: string
          item?: string | null
          quantity?: number
          warehouse?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "damages_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "damages_item_fkey"
            columns: ["item"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "damages_warehouse_fkey"
            columns: ["warehouse"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["name"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      employee_payroll: {
        Row: {
          created_at: string | null
          employee_id: string | null
          id: string
          note: string | null
          payroll_id: string | null
          payroll_type: Database["public"]["Enums"]["payroll_type"]
          to_be_paid: number
        }
        Insert: {
          created_at?: string | null
          employee_id?: string | null
          id?: string
          note?: string | null
          payroll_id?: string | null
          payroll_type: Database["public"]["Enums"]["payroll_type"]
          to_be_paid: number
        }
        Update: {
          created_at?: string | null
          employee_id?: string | null
          id?: string
          note?: string | null
          payroll_id?: string | null
          payroll_type?: Database["public"]["Enums"]["payroll_type"]
          to_be_paid?: number
        }
        Relationships: [
          {
            foreignKeyName: "employee_payroll_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_payroll_payroll_id_fkey"
            columns: ["payroll_id"]
            isOneToOne: false
            referencedRelation: "payrolls"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          address: string | null
          allowance: number | null
          bank_account_number: string | null
          bank_name: string | null
          bank_routing_number: string | null
          bonus: number | null
          city: string | null
          country: string | null
          created_at: string | null
          created_by: string
          date_created: string | null
          date_employed: string
          date_of_birth: string | null
          department: string
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          employment_status: Database["public"]["Enums"]["employment_status"]
          first_name: string
          id: string
          last_name: string
          national_id: string | null
          payroll_type: Database["public"]["Enums"]["payroll_type"]
          performance_rating: number | null
          phone_number: string | null
          position: string
          postal_code: string | null
          salary: number | null
          state: string | null
          status: string | null
          supervisor_id: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          allowance?: number | null
          bank_account_number?: string | null
          bank_name?: string | null
          bank_routing_number?: string | null
          bonus?: number | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          created_by: string
          date_created?: string | null
          date_employed: string
          date_of_birth?: string | null
          department: string
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          employment_status?: Database["public"]["Enums"]["employment_status"]
          first_name: string
          id?: string
          last_name: string
          national_id?: string | null
          payroll_type: Database["public"]["Enums"]["payroll_type"]
          performance_rating?: number | null
          phone_number?: string | null
          position: string
          postal_code?: string | null
          salary?: number | null
          state?: string | null
          status?: string | null
          supervisor_id?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          allowance?: number | null
          bank_account_number?: string | null
          bank_name?: string | null
          bank_routing_number?: string | null
          bonus?: number | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          created_by?: string
          date_created?: string | null
          date_employed?: string
          date_of_birth?: string | null
          department?: string
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          employment_status?: Database["public"]["Enums"]["employment_status"]
          first_name?: string
          id?: string
          last_name?: string
          national_id?: string | null
          payroll_type?: Database["public"]["Enums"]["payroll_type"]
          performance_rating?: number | null
          phone_number?: string | null
          position?: string
          postal_code?: string | null
          salary?: number | null
          state?: string | null
          status?: string | null
          supervisor_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "employees_department_fkey"
            columns: ["department"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "employees_position_fkey"
            columns: ["position"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["name"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          approved: boolean
          approved_by: string | null
          beneficiary: string | null
          category: Database["public"]["Enums"]["expense_categories"]
          created_at: string | null
          created_by: string | null
          date: string
          description: string | null
          id: string
          invoice_number: string | null
          notes: string | null
          payment_method: Database["public"]["Enums"]["payment_mode"] | null
        }
        Insert: {
          amount: number
          approved?: boolean
          approved_by?: string | null
          beneficiary?: string | null
          category: Database["public"]["Enums"]["expense_categories"]
          created_at?: string | null
          created_by?: string | null
          date: string
          description?: string | null
          id?: string
          invoice_number?: string | null
          notes?: string | null
          payment_method?: Database["public"]["Enums"]["payment_mode"] | null
        }
        Update: {
          amount?: number
          approved?: boolean
          approved_by?: string | null
          beneficiary?: string | null
          category?: Database["public"]["Enums"]["expense_categories"]
          created_at?: string | null
          created_by?: string | null
          date?: string
          description?: string | null
          id?: string
          invoice_number?: string | null
          notes?: string | null
          payment_method?: Database["public"]["Enums"]["payment_mode"] | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "expenses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
        ]
      }
      external_stocks: {
        Row: {
          balance: number
          created_at: string
          dispatched: number
          id: string
          order_number: string | null
        }
        Insert: {
          balance?: number
          created_at?: string
          dispatched?: number
          id?: string
          order_number?: string | null
        }
        Update: {
          balance?: number
          created_at?: string
          dispatched?: number
          id?: string
          order_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "external_stocks_order_number_fkey"
            columns: ["order_number"]
            isOneToOne: true
            referencedRelation: "stock_purchases"
            referencedColumns: ["order_number"]
          },
        ]
      }
      inventory: {
        Row: {
          created_at: string
          id: string
          item: string
          item_packaged: string | null
          packaged_unit_cost: number | null
          purchase_order_number: string | null
          qty_packaged: number | null
          qty_sold: number | null
          qty_sold_price: number | null
          quantity: number
          vehicle_id: string
          warehouse: string
        }
        Insert: {
          created_at?: string
          id?: string
          item: string
          item_packaged?: string | null
          packaged_unit_cost?: number | null
          purchase_order_number?: string | null
          qty_packaged?: number | null
          qty_sold?: number | null
          qty_sold_price?: number | null
          quantity: number
          vehicle_id: string
          warehouse: string
        }
        Update: {
          created_at?: string
          id?: string
          item?: string
          item_packaged?: string | null
          packaged_unit_cost?: number | null
          purchase_order_number?: string | null
          qty_packaged?: number | null
          qty_sold?: number | null
          qty_sold_price?: number | null
          quantity?: number
          vehicle_id?: string
          warehouse?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_item_fkey"
            columns: ["item"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "inventory_item_packaged_fkey"
            columns: ["item_packaged"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "inventory_purchase_order_number_fkey"
            columns: ["purchase_order_number"]
            isOneToOne: false
            referencedRelation: "stock_purchases"
            referencedColumns: ["order_number"]
          },
          {
            foreignKeyName: "inventory_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_warehouse_fkey"
            columns: ["warehouse"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["name"]
          },
        ]
      }
      inventory_items: {
        Row: {
          code: string
          created_at: string
          id: string
          name: string
          type: Database["public"]["Enums"]["inventory_item_type"]
          unit: string
          unit_price: number | null
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          name: string
          type: Database["public"]["Enums"]["inventory_item_type"]
          unit: string
          unit_price?: number | null
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          name?: string
          type?: Database["public"]["Enums"]["inventory_item_type"]
          unit?: string
          unit_price?: number | null
        }
        Relationships: []
      }
      inventory_transfers: {
        Row: {
          balance: number
          created_at: string
          created_by: string
          date: string
          destination_stock_id: string
          id: string
          item: string
          origin_stock_id: string
          quantity: number
          taken: number
        }
        Insert: {
          balance: number
          created_at?: string
          created_by: string
          date: string
          destination_stock_id: string
          id?: string
          item: string
          origin_stock_id: string
          quantity: number
          taken?: number
        }
        Update: {
          balance?: number
          created_at?: string
          created_by?: string
          date?: string
          destination_stock_id?: string
          id?: string
          item?: string
          origin_stock_id?: string
          quantity?: number
          taken?: number
        }
        Relationships: [
          {
            foreignKeyName: "inventory_transfers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "inventory_transfers_destination_stock_id_fkey"
            columns: ["destination_stock_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_transfers_item_fkey"
            columns: ["item"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "inventory_transfers_origin_stock_id_fkey"
            columns: ["origin_stock_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["id"]
          },
        ]
      }
      payrolls: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          month: number
          paid_by: string | null
          status: Database["public"]["Enums"]["payroll_status"]
          total_paid: number
          year: number
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          month: number
          paid_by?: string | null
          status?: Database["public"]["Enums"]["payroll_status"]
          total_paid?: number
          year: number
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          month?: number
          paid_by?: string | null
          status?: Database["public"]["Enums"]["payroll_status"]
          total_paid?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "payrolls_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
        ]
      }
      positions: {
        Row: {
          created_at: string | null
          department: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          department?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "positions_department_fkey"
            columns: ["department"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["name"]
          },
        ]
      }
      product_submission: {
        Row: {
          accepted_by: string | null
          created_at: string | null
          date_accepted: string | null
          date_rejected: string | null
          date_submitted: string | null
          id: string
          product: string | null
          quantity: number | null
          rejected_by: string | null
          status: Database["public"]["Enums"]["product_submission_status"]
          submitted_by: string | null
          warehouse: string | null
        }
        Insert: {
          accepted_by?: string | null
          created_at?: string | null
          date_accepted?: string | null
          date_rejected?: string | null
          date_submitted?: string | null
          id?: string
          product?: string | null
          quantity?: number | null
          rejected_by?: string | null
          status?: Database["public"]["Enums"]["product_submission_status"]
          submitted_by?: string | null
          warehouse?: string | null
        }
        Update: {
          accepted_by?: string | null
          created_at?: string | null
          date_accepted?: string | null
          date_rejected?: string | null
          date_submitted?: string | null
          id?: string
          product?: string | null
          quantity?: number | null
          rejected_by?: string | null
          status?: Database["public"]["Enums"]["product_submission_status"]
          submitted_by?: string | null
          warehouse?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_submission_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "product_submission_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "product_submission_rejected_by_fkey"
            columns: ["rejected_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "product_submission_submitted_by_fkey"
            columns: ["submitted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "product_submission_warehouse_fkey"
            columns: ["warehouse"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["name"]
          },
        ]
      }
      production_raw_materials: {
        Row: {
          created_at: string | null
          id: string
          item: string | null
          production_id: string | null
          quantity: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          item?: string | null
          production_id?: string | null
          quantity: number
        }
        Update: {
          created_at?: string | null
          id?: string
          item?: string | null
          production_id?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "production_raw_materials_item_fkey"
            columns: ["item"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "production_raw_materials_production_id_fkey"
            columns: ["production_id"]
            isOneToOne: false
            referencedRelation: "production_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      production_runs: {
        Row: {
          created_at: string
          date: string
          id: string
          produced_by: string | null
          product: string | null
          quantity_produced: number
          warehouse: string | null
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          produced_by?: string | null
          product?: string | null
          quantity_produced: number
          warehouse?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          produced_by?: string | null
          product?: string | null
          quantity_produced?: number
          warehouse?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "production_runs_produced_by_fkey"
            columns: ["produced_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "production_runs_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "production_runs_warehouse_fkey"
            columns: ["warehouse"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["name"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          restricted: boolean
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
          username: string | null
          warehouse: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          restricted?: boolean
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          username?: string | null
          warehouse?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          restricted?: boolean
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          username?: string | null
          warehouse?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_warehouse_fkey"
            columns: ["warehouse"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["name"]
          },
        ]
      }
      purchase_order_payments: {
        Row: {
          account_name: string | null
          account_number: string | null
          amount: number
          bank_name: string | null
          created_at: string
          date: string
          id: string
          order_number: string
          payment_mode: Database["public"]["Enums"]["payment_mode"]
          payment_ref: string | null
          transaction_id: string | null
        }
        Insert: {
          account_name?: string | null
          account_number?: string | null
          amount: number
          bank_name?: string | null
          created_at?: string
          date: string
          id?: string
          order_number: string
          payment_mode: Database["public"]["Enums"]["payment_mode"]
          payment_ref?: string | null
          transaction_id?: string | null
        }
        Update: {
          account_name?: string | null
          account_number?: string | null
          amount?: number
          bank_name?: string | null
          created_at?: string
          date?: string
          id?: string
          order_number?: string
          payment_mode?: Database["public"]["Enums"]["payment_mode"]
          payment_ref?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_order_payments_order_number_fkey"
            columns: ["order_number"]
            isOneToOne: false
            referencedRelation: "stock_purchases"
            referencedColumns: ["order_number"]
          },
          {
            foreignKeyName: "purchase_order_payments_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      request_items: {
        Row: {
          created_at: string | null
          id: string
          item: string | null
          quantity: number
          request_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          item?: string | null
          quantity: number
          request_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          item?: string | null
          quantity?: number
          request_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "request_items_item_fkey"
            columns: ["item"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "request_items_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "requests"
            referencedColumns: ["id"]
          },
        ]
      }
      requests: {
        Row: {
          accepted_by: string | null
          created_at: string | null
          date_accepted: string | null
          date_rejected: string | null
          date_requested: string
          id: string
          rejected_by: string | null
          requested_by: string
          status: Database["public"]["Enums"]["request_status"]
          warehouse: string
        }
        Insert: {
          accepted_by?: string | null
          created_at?: string | null
          date_accepted?: string | null
          date_rejected?: string | null
          date_requested: string
          id?: string
          rejected_by?: string | null
          requested_by: string
          status?: Database["public"]["Enums"]["request_status"]
          warehouse: string
        }
        Update: {
          accepted_by?: string | null
          created_at?: string | null
          date_accepted?: string | null
          date_rejected?: string | null
          date_requested?: string
          id?: string
          rejected_by?: string | null
          requested_by?: string
          status?: Database["public"]["Enums"]["request_status"]
          warehouse?: string
        }
        Relationships: [
          {
            foreignKeyName: "requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "requests_rejected_by_fkey"
            columns: ["rejected_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "requests_warehouse_fkey"
            columns: ["warehouse"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["name"]
          },
        ]
      }
      sale_dispatch: {
        Row: {
          created_at: string | null
          destination: string | null
          dispatch_date: string
          dispatch_price: number
          id: string
          origin_vehicle: string
          qty_dispatched: number
          sale_id: string
        }
        Insert: {
          created_at?: string | null
          destination?: string | null
          dispatch_date: string
          dispatch_price?: number
          id?: string
          origin_vehicle: string
          qty_dispatched: number
          sale_id: string
        }
        Update: {
          created_at?: string | null
          destination?: string | null
          dispatch_date?: string
          dispatch_price?: number
          id?: string
          origin_vehicle?: string
          qty_dispatched?: number
          sale_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sale_dispatch_origin_vehicle_fkey"
            columns: ["origin_vehicle"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_dispatch_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          balance: number
          created_at: string
          customer_name: string
          customer_phone: string | null
          date: string
          external_stock: string | null
          id: string
          item_purchased: string
          order_number: string
          paid: number
          payment_balance: number
          price: number
          quantity: number
          quantity_taken: number
          sequence_number: number
          type: Database["public"]["Enums"]["sales_type"]
          unit_price: number | null
          warehouse: string | null
        }
        Insert: {
          balance?: number
          created_at?: string
          customer_name: string
          customer_phone?: string | null
          date: string
          external_stock?: string | null
          id?: string
          item_purchased: string
          order_number: string
          paid?: number
          payment_balance: number
          price: number
          quantity: number
          quantity_taken?: number
          sequence_number: number
          type: Database["public"]["Enums"]["sales_type"]
          unit_price?: number | null
          warehouse?: string | null
        }
        Update: {
          balance?: number
          created_at?: string
          customer_name?: string
          customer_phone?: string | null
          date?: string
          external_stock?: string | null
          id?: string
          item_purchased?: string
          order_number?: string
          paid?: number
          payment_balance?: number
          price?: number
          quantity?: number
          quantity_taken?: number
          sequence_number?: number
          type?: Database["public"]["Enums"]["sales_type"]
          unit_price?: number | null
          warehouse?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_external_stock_fkey"
            columns: ["external_stock"]
            isOneToOne: false
            referencedRelation: "external_stocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_item_purchased_fkey"
            columns: ["item_purchased"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "sales_warehouse_fkey"
            columns: ["warehouse"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["name"]
          },
        ]
      }
      sales_payments: {
        Row: {
          account_name: string | null
          account_number: string | null
          amount: number
          bank_name: string | null
          created_at: string | null
          date: string | null
          id: string
          order_number: string | null
          payment_mode: Database["public"]["Enums"]["payment_mode"]
          payment_ref: string | null
        }
        Insert: {
          account_name?: string | null
          account_number?: string | null
          amount: number
          bank_name?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          order_number?: string | null
          payment_mode: Database["public"]["Enums"]["payment_mode"]
          payment_ref?: string | null
        }
        Update: {
          account_name?: string | null
          account_number?: string | null
          amount?: number
          bank_name?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          order_number?: string | null
          payment_mode?: Database["public"]["Enums"]["payment_mode"]
          payment_ref?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_payments_order_number_fkey"
            columns: ["order_number"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["order_number"]
          },
        ]
      }
      stock_purchases: {
        Row: {
          balance: number
          created_at: string
          date: string
          id: string
          item: string | null
          order_number: string
          paid: number
          price: number
          quantity: number
          seller: string
          sequence_number: number
          unit_price: number | null
        }
        Insert: {
          balance: number
          created_at?: string
          date: string
          id?: string
          item?: string | null
          order_number: string
          paid?: number
          price: number
          quantity?: number
          seller: string
          sequence_number: number
          unit_price?: number | null
        }
        Update: {
          balance?: number
          created_at?: string
          date?: string
          id?: string
          item?: string | null
          order_number?: string
          paid?: number
          price?: number
          quantity?: number
          seller?: string
          sequence_number?: number
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_purchases_item_fkey"
            columns: ["item"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["name"]
          },
        ]
      }
      stocks: {
        Row: {
          balance: number | null
          created_at: string
          damaged: number
          dispatched: number | null
          id: string
          item: string | null
          order_number: string | null
          packaged_received: number
          produced: number
          production_balance: number
          production_inflow: number | null
          qty_packaged: number
          received: number | null
          type: Database["public"]["Enums"]["stock_type"] | null
          utilized: number
          warehouse: string | null
        }
        Insert: {
          balance?: number | null
          created_at?: string
          damaged?: number
          dispatched?: number | null
          id?: string
          item?: string | null
          order_number?: string | null
          packaged_received?: number
          produced?: number
          production_balance?: number
          production_inflow?: number | null
          qty_packaged?: number
          received?: number | null
          type?: Database["public"]["Enums"]["stock_type"] | null
          utilized?: number
          warehouse?: string | null
        }
        Update: {
          balance?: number | null
          created_at?: string
          damaged?: number
          dispatched?: number | null
          id?: string
          item?: string | null
          order_number?: string | null
          packaged_received?: number
          produced?: number
          production_balance?: number
          production_inflow?: number | null
          qty_packaged?: number
          received?: number | null
          type?: Database["public"]["Enums"]["stock_type"] | null
          utilized?: number
          warehouse?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stocks_item_fkey"
            columns: ["item"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "stocks_order_number_fkey"
            columns: ["order_number"]
            isOneToOne: false
            referencedRelation: "stock_purchases"
            referencedColumns: ["order_number"]
          },
          {
            foreignKeyName: "stocks_warehouse_fkey"
            columns: ["warehouse"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["name"]
          },
        ]
      }
      transactions: {
        Row: {
          account_id: string
          amount: number
          created_at: string
          date: string
          id: string
          type: Database["public"]["Enums"]["transaction_type"]
        }
        Insert: {
          account_id: string
          amount: number
          created_at?: string
          date: string
          id?: string
          type: Database["public"]["Enums"]["transaction_type"]
        }
        Update: {
          account_id?: string
          amount?: number
          created_at?: string
          date?: string
          id?: string
          type?: Database["public"]["Enums"]["transaction_type"]
        }
        Relationships: [
          {
            foreignKeyName: "transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_enrollment: {
        Row: {
          created_at: string | null
          email: string
          enrolled_by: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          status: Database["public"]["Enums"]["user_enrollment_status"]
          warehouse: string
        }
        Insert: {
          created_at?: string | null
          email: string
          enrolled_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["user_enrollment_status"]
          warehouse: string
        }
        Update: {
          created_at?: string | null
          email?: string
          enrolled_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["user_enrollment_status"]
          warehouse?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_enrollment_enrolled_by_fkey"
            columns: ["enrolled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "user_enrollment_warehouse_fkey"
            columns: ["warehouse"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["name"]
          },
        ]
      }
      vehicle_expenses: {
        Row: {
          added_by: string
          amount: number
          created_at: string | null
          date: string
          description: string | null
          id: string
          order_number: string | null
          title: string
          vehicle_id: string
        }
        Insert: {
          added_by: string
          amount: number
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          order_number?: string | null
          title: string
          vehicle_id: string
        }
        Update: {
          added_by?: string
          amount?: number
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          order_number?: string | null
          title?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_expenses_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "vehicle_expenses_order_number_fkey"
            columns: ["order_number"]
            isOneToOne: false
            referencedRelation: "stock_purchases"
            referencedColumns: ["order_number"]
          },
          {
            foreignKeyName: "vehicle_expenses_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          created_at: string | null
          date_dispatched: string
          date_packaged: string | null
          date_received: string | null
          destination: string | null
          destination_address: string | null
          dispatched_by: string
          driver_name: string | null
          driver_number: string | null
          external_origin_id: string | null
          fee_paid: number | null
          from_external_stock: boolean
          id: string
          inventory_transfer_id: string | null
          is_inventory_transfer: boolean
          item: string
          item_packaged: string | null
          origin_state: Database["public"]["Enums"]["state_type"] | null
          origin_stock_id: string | null
          other_waybill_number: string | null
          packaged: boolean
          packaged_balance: number | null
          packaged_by: string | null
          packaged_damage: number | null
          paid_on_dispatch: number | null
          paid_on_receive: number | null
          qty_carried: number
          qty_dispatched: number | null
          qty_packaged: number | null
          qty_received: number | null
          received_by: string | null
          sale_order_number: string | null
          shortage: number
          sold_value: number
          status: Database["public"]["Enums"]["vehicle_status"]
          to_customer: boolean
          total_expenses: number
          transport_fee: number | null
          transporter: string | null
          type: Database["public"]["Enums"]["dispatch_type"]
          vehicle_number: string
          waybill_number: string
        }
        Insert: {
          created_at?: string | null
          date_dispatched: string
          date_packaged?: string | null
          date_received?: string | null
          destination?: string | null
          destination_address?: string | null
          dispatched_by: string
          driver_name?: string | null
          driver_number?: string | null
          external_origin_id?: string | null
          fee_paid?: number | null
          from_external_stock?: boolean
          id?: string
          inventory_transfer_id?: string | null
          is_inventory_transfer?: boolean
          item: string
          item_packaged?: string | null
          origin_state?: Database["public"]["Enums"]["state_type"] | null
          origin_stock_id?: string | null
          other_waybill_number?: string | null
          packaged?: boolean
          packaged_balance?: number | null
          packaged_by?: string | null
          packaged_damage?: number | null
          paid_on_dispatch?: number | null
          paid_on_receive?: number | null
          qty_carried: number
          qty_dispatched?: number | null
          qty_packaged?: number | null
          qty_received?: number | null
          received_by?: string | null
          sale_order_number?: string | null
          shortage?: number
          sold_value?: number
          status?: Database["public"]["Enums"]["vehicle_status"]
          to_customer?: boolean
          total_expenses?: number
          transport_fee?: number | null
          transporter?: string | null
          type?: Database["public"]["Enums"]["dispatch_type"]
          vehicle_number: string
          waybill_number: string
        }
        Update: {
          created_at?: string | null
          date_dispatched?: string
          date_packaged?: string | null
          date_received?: string | null
          destination?: string | null
          destination_address?: string | null
          dispatched_by?: string
          driver_name?: string | null
          driver_number?: string | null
          external_origin_id?: string | null
          fee_paid?: number | null
          from_external_stock?: boolean
          id?: string
          inventory_transfer_id?: string | null
          is_inventory_transfer?: boolean
          item?: string
          item_packaged?: string | null
          origin_state?: Database["public"]["Enums"]["state_type"] | null
          origin_stock_id?: string | null
          other_waybill_number?: string | null
          packaged?: boolean
          packaged_balance?: number | null
          packaged_by?: string | null
          packaged_damage?: number | null
          paid_on_dispatch?: number | null
          paid_on_receive?: number | null
          qty_carried?: number
          qty_dispatched?: number | null
          qty_packaged?: number | null
          qty_received?: number | null
          received_by?: string | null
          sale_order_number?: string | null
          shortage?: number
          sold_value?: number
          status?: Database["public"]["Enums"]["vehicle_status"]
          to_customer?: boolean
          total_expenses?: number
          transport_fee?: number | null
          transporter?: string | null
          type?: Database["public"]["Enums"]["dispatch_type"]
          vehicle_number?: string
          waybill_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_destination_fkey"
            columns: ["destination"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicles_dispatched_by_fkey"
            columns: ["dispatched_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "vehicles_external_origin_id_fkey"
            columns: ["external_origin_id"]
            isOneToOne: false
            referencedRelation: "external_stocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicles_inventory_transfer_id_fkey"
            columns: ["inventory_transfer_id"]
            isOneToOne: false
            referencedRelation: "inventory_transfers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicles_item_fkey"
            columns: ["item"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "vehicles_item_packaged_fkey"
            columns: ["item_packaged"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "vehicles_origin_stock_id_fkey"
            columns: ["origin_stock_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicles_packaged_by_fkey"
            columns: ["packaged_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "vehicles_received_by_fkey"
            columns: ["received_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "vehicles_sale_order_number_fkey"
            columns: ["sale_order_number"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["order_number"]
          },
        ]
      }
      warehouses: {
        Row: {
          address: string
          code: string
          created_at: string
          id: string
          location: Database["public"]["Enums"]["state_type"]
          name: string
          stock_receiver_phone: string
        }
        Insert: {
          address: string
          code: string
          created_at?: string
          id?: string
          location: Database["public"]["Enums"]["state_type"]
          name: string
          stock_receiver_phone: string
        }
        Update: {
          address?: string
          code?: string
          created_at?: string
          id?: string
          location?: Database["public"]["Enums"]["state_type"]
          name?: string
          stock_receiver_phone?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_production: {
        Args: { production_data: Json }
        Returns: undefined
      }
      create_purchase_order: {
        Args: { order_data: Json; items_data: Json }
        Returns: undefined
      }
      create_request: {
        Args: { request_data: Json }
        Returns: undefined
      }
      generate_monthly_financial_report: {
        Args: Record<PropertyKey, never>
        Returns: {
          year_month: string
          total_sales: number
          total_purchases: number
          profit: number
        }[]
      }
    }
    Enums: {
      account_type: "outbound" | "inbound"
      dispatch_type: "normal" | "sale"
      employment_status: "active" | "not_active"
      expense_categories:
        | "Payroll"
        | "Office Supplies"
        | "Utilities"
        | "Rent"
        | "Travel"
        | "Marketing"
        | "Legal and Professional Services"
        | "Insurance"
        | "Technology"
        | "Maintenance and Repairs"
        | "Employee Benefits"
        | "Training and Development"
        | "Entertainment"
        | "Miscellaneous"
      inventory_item_type: "raw" | "product"
      payment_mode: "cash" | "transfer" | "pos"
      payroll_status: "paid" | "pending"
      payroll_type: "salary" | "allowance"
      product_submission_status: "pending" | "accepted" | "rejected"
      request_status: "accepted" | "pending" | "rejected"
      sales_type: "internal" | "external"
      state_type:
        | "abia"
        | "adamawa"
        | "akwa ibom"
        | "anambra"
        | "bauchi"
        | "bayelsa"
        | "benue"
        | "borno"
        | "cross river"
        | "delta"
        | "ebonyi"
        | "edo"
        | "ekiti"
        | "enugu"
        | "gombe"
        | "imo"
        | "jigawa"
        | "kaduna"
        | "kano"
        | "katsina"
        | "kebbi"
        | "kogi"
        | "kwara"
        | "lagos"
        | "nasarawa"
        | "niger"
        | "ogun"
        | "ondo"
        | "osun"
        | "oyo"
        | "plateau"
        | "rivers"
        | "sokoto"
        | "taraba"
        | "yobe"
        | "zamfara"
        | "abuja"
      stock_type: "internal" | "external"
      transaction_type: "credit" | "debit"
      user_enrollment_status: "pending" | "enrolled"
      user_role:
        | "SUPER ADMIN"
        | "DEFAULT"
        | "ADMIN"
        | "INVENTORY"
        | "PRODUCTION"
        | "MANAGER"
        | "ACCOUNTING"
        | "LOGISTICS"
      vehicle_status: "dispatched" | "delivered" | "received"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_type: ["outbound", "inbound"],
      dispatch_type: ["normal", "sale"],
      employment_status: ["active", "not_active"],
      expense_categories: [
        "Payroll",
        "Office Supplies",
        "Utilities",
        "Rent",
        "Travel",
        "Marketing",
        "Legal and Professional Services",
        "Insurance",
        "Technology",
        "Maintenance and Repairs",
        "Employee Benefits",
        "Training and Development",
        "Entertainment",
        "Miscellaneous",
      ],
      inventory_item_type: ["raw", "product"],
      payment_mode: ["cash", "transfer", "pos"],
      payroll_status: ["paid", "pending"],
      payroll_type: ["salary", "allowance"],
      product_submission_status: ["pending", "accepted", "rejected"],
      request_status: ["accepted", "pending", "rejected"],
      sales_type: ["internal", "external"],
      state_type: [
        "abia",
        "adamawa",
        "akwa ibom",
        "anambra",
        "bauchi",
        "bayelsa",
        "benue",
        "borno",
        "cross river",
        "delta",
        "ebonyi",
        "edo",
        "ekiti",
        "enugu",
        "gombe",
        "imo",
        "jigawa",
        "kaduna",
        "kano",
        "katsina",
        "kebbi",
        "kogi",
        "kwara",
        "lagos",
        "nasarawa",
        "niger",
        "ogun",
        "ondo",
        "osun",
        "oyo",
        "plateau",
        "rivers",
        "sokoto",
        "taraba",
        "yobe",
        "zamfara",
        "abuja",
      ],
      stock_type: ["internal", "external"],
      transaction_type: ["credit", "debit"],
      user_enrollment_status: ["pending", "enrolled"],
      user_role: [
        "SUPER ADMIN",
        "DEFAULT",
        "ADMIN",
        "INVENTORY",
        "PRODUCTION",
        "MANAGER",
        "ACCOUNTING",
        "LOGISTICS",
      ],
      vehicle_status: ["dispatched", "delivered", "received"],
    },
  },
} as const
