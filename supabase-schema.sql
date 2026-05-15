-- Run this in your Supabase SQL Editor

-- Profiles (auto-created when a user signs up)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  created_at timestamptz default now()
);

-- Subscriptions
create table if not exists subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  status text default 'inactive', -- active, canceled, past_due, inactive
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Bookings
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  booking_date date not null,
  time_slot text not null,
  status text default 'pending', -- pending, confirmed, canceled
  notes text,
  meet_link text,
  created_at timestamptz default now()
);

-- Messages
create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  sender text not null, -- 'student' or 'teacher'
  content text not null,
  created_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Row Level Security
alter table profiles enable row level security;
alter table subscriptions enable row level security;
alter table bookings enable row level security;
alter table messages enable row level security;

create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

create policy "Users can view own subscription" on subscriptions for select using (auth.uid() = user_id);

create policy "Users can view own bookings" on bookings for select using (auth.uid() = user_id);
create policy "Users can insert own bookings" on bookings for insert with check (auth.uid() = user_id);
create policy "Users can update own bookings" on bookings for update using (auth.uid() = user_id);

create policy "Users can view own messages" on messages for select using (auth.uid() = user_id);
create policy "Users can insert own messages" on messages for insert with check (auth.uid() = user_id);
