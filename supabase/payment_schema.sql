-- =====================================================
-- Qur'an Flow — Midtrans Payment Schema
-- Version: 1.1 (idempotent - safe to run multiple times)
-- Run this in Supabase SQL Editor
-- =====================================================

-- =====================================================
-- SUBSCRIPTIONS TABLE
-- =====================================================
create table if not exists public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  plan_type text not null check (plan_type in ('monthly', 'yearly')),
  status text not null default 'pending' check (status in ('pending', 'active', 'expired', 'failed')),
  midtrans_order_id text unique,
  gross_amount bigint,
  start_date timestamptz,
  end_date timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

-- Drop dulu sebelum buat (aman dijalankan berkali-kali)
drop policy if exists "Users can view their own subscriptions" on public.subscriptions;
drop policy if exists "Service role can manage subscriptions" on public.subscriptions;

create policy "Users can view their own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create policy "Service role can manage subscriptions"
  on public.subscriptions for all
  using (true)
  with check (true);

-- =====================================================
-- TRANSACTIONS TABLE
-- =====================================================
create table if not exists public.transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  order_id text unique not null,
  gross_amount bigint not null,
  payment_type text,
  transaction_status text,
  fraud_status text,
  midtrans_transaction_id text,
  created_at timestamptz not null default now()
);

alter table public.transactions enable row level security;

-- Drop dulu sebelum buat (aman dijalankan berkali-kali)
drop policy if exists "Users can view their own transactions" on public.transactions;
drop policy if exists "Service role can manage transactions" on public.transactions;

create policy "Users can view their own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Service role can manage transactions"
  on public.transactions for all
  using (true)
  with check (true);

-- =====================================================
-- Helper: Check if user has active premium
-- =====================================================
create or replace function public.is_user_premium(check_user_id uuid)
returns boolean as $$
begin
  return exists (
    select 1 from public.subscriptions
    where user_id = check_user_id
      and status = 'active'
      and end_date > now()
  );
end;
$$ language plpgsql security definer;
