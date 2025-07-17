import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../environments/environment'; // Adjust path if needed

// Define an interface for your user profile
// Make sure these match your Supabase 'profiles' table column names exactly
export interface UserProfile {
  id: string; // This should still match auth.users.id
  nickname: string; // Changed from 'username' to 'nickname'
  phone_number: string; // Matches your column name
  // Add other profile fields here if you have them
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  async getSession() {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) {
      console.error('Error getting session:', error);
      return null;
    }
    return data.session;
  }

  async getUser(): Promise<User | null> {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    if (error) {
      console.error('Error getting user:', error);
      return null;
    }
    return user;
  }

  authChanges() {
    return this.supabase.auth.onAuthStateChange;
  }

  /**
   * Fetches the user's profile data from the 'profiles' table.
   * Now fetches 'nickname' and 'phone_number'.
   *
   * IMPORTANT: Ensure you have Row Level Security (RLS) policies set up
   * on your 'profiles' table in Supabase to allow users to read their own profile.
   *
   * @param userId The ID of the user whose profile to fetch (from auth.getUser().id).
   */
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from('profiles') // Your Supabase profile table name
      .select('id, nickname, phone_number') // <--- IMPORTANT: Changed 'username' to 'nickname' here
      .eq('id', userId) // Filter by the user's ID
      .single(); // Use .single() if you expect only one row for a given ID

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data as UserProfile; // Cast to your UserProfile interface
  }

  // Optional: Add a method to update the user's profile
  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await this.supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    if (error) {
      console.error('Error updating profile:', error);
      return null;
    }
    return data;
  }
}