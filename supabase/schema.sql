-- =====================================================
-- Qur'an Flow — Supabase Database Schema
-- Version: 1.0
-- Run this in your Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =====================================================
-- PROFILES TABLE
-- =====================================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  display_name text,
  avatar_url text,
  current_level int not null default 1,
  streak_days int not null default 0,
  total_xp int not null default 0,
  last_activity date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', new.email),
    lower(split_part(new.email, '@', 1)) || '_' || floor(random() * 1000)::text
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =====================================================
-- LESSONS TABLE (static curriculum content)
-- =====================================================
create table if not exists public.lessons (
  id text primary key, -- e.g. 'alif', 'ba', 'reading-alif'
  level_id int not null default 1,
  phase text not null check (phase in ('writing', 'reading')),
  letter text not null,
  letter_name text not null,
  transliteration text,
  guide_path text,
  audio_url text,
  lesson_order int not null default 0,
  created_at timestamptz not null default now()
);

-- No RLS needed — lessons are public
alter table public.lessons enable row level security;
create policy "Lessons are viewable by everyone"
  on public.lessons for select using (true);

-- =====================================================
-- USER_PROGRESS TABLE
-- =====================================================
create table if not exists public.user_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id text references public.lessons(id) not null,
  completed boolean not null default false,
  accuracy_score float check (accuracy_score >= 0 and accuracy_score <= 100),
  attempts int not null default 1,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, lesson_id)
);

alter table public.user_progress enable row level security;

create policy "Users can view their own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- =====================================================
-- SEED: Initial Writing Lessons (Level 1 — Huruf Tunggal)
-- =====================================================
insert into public.lessons (id, level_id, phase, letter, letter_name, transliteration, lesson_order)
values
  ('alif', 1, 'writing', 'ا', 'Alif', 'a', 1),
  ('ba', 1, 'writing', 'ب', 'Ba', 'b', 2),
  ('ta', 1, 'writing', 'ت', 'Ta', 't', 3),
  ('tsa', 1, 'writing', 'ث', 'Tsa', 'th', 4),
  ('jim', 1, 'writing', 'ج', 'Jim', 'j', 5),
  ('ha', 1, 'writing', 'ح', 'Ha', 'h', 6),
  ('kha', 1, 'writing', 'خ', 'Kha', 'kh', 7),
  ('dal', 1, 'writing', 'د', 'Dal', 'd', 8),
  ('dzal', 1, 'writing', 'ذ', 'Dzal', 'dh', 9),
  ('ra', 1, 'writing', 'ر', 'Ra', 'r', 10),
  ('zai', 1, 'writing', 'ز', 'Zai', 'z', 11),
  ('sin', 1, 'writing', 'س', 'Sin', 's', 12),
  ('syin', 1, 'writing', 'ش', 'Syin', 'sh', 13),
  ('shad', 1, 'writing', 'ص', 'Shad', 's}', 14),
  ('dhad', 1, 'writing', 'ض', 'Dhad', 'd}', 15),
  ('tha', 1, 'writing', 'ط', 'Tha', 't}', 16),
  ('zha', 1, 'writing', 'ظ', 'Zha', 'z}', 17),
  ('ain', 1, 'writing', 'ع', 'Ain', '''', 18),
  ('ghain', 1, 'writing', 'غ', 'Ghain', 'gh', 19),
  ('fa', 1, 'writing', 'ف', 'Fa', 'f', 20),
  ('qaf', 1, 'writing', 'ق', 'Qaf', 'q', 21),
  ('kaf', 1, 'writing', 'ك', 'Kaf', 'k', 22),
  ('lam', 1, 'writing', 'ل', 'Lam', 'l', 23),
  ('mim', 1, 'writing', 'م', 'Mim', 'm', 24),
  ('nun', 1, 'writing', 'ن', 'Nun', 'n', 25),
  ('waw', 1, 'writing', 'و', 'Waw', 'w', 26),
  ('ha2', 1, 'writing', 'ه', 'Ha', 'h', 27),
  ('ya', 1, 'writing', 'ي', 'Ya', 'y', 28)
on conflict (id) do nothing;

-- Level 2: Reading lessons
insert into public.lessons (id, level_id, phase, letter, letter_name, transliteration, lesson_order)
values
  ('reading-alif', 2, 'reading', 'ا', 'Alif', 'a', 1),
  ('reading-ba', 2, 'reading', 'ب', 'Ba', 'b', 2),
  ('reading-ta', 2, 'reading', 'ت', 'Ta', 't', 3),
  ('reading-jim', 2, 'reading', 'ج', 'Jim', 'j', 4),
  ('reading-ha', 2, 'reading', 'ح', 'Ha', 'h', 5)
on conflict (id) do nothing;

-- =====================================================
-- Helper Views
-- =====================================================
create or replace view public.user_stats as
select
  p.id,
  p.display_name,
  p.streak_days,
  p.total_xp,
  p.current_level,
  count(up.id) filter (where up.completed = true) as completed_lessons,
  avg(up.accuracy_score) filter (where up.completed = true) as avg_accuracy
from public.profiles p
left join public.user_progress up on up.user_id = p.id
group by p.id, p.display_name, p.streak_days, p.total_xp, p.current_level;

-- Grant access to authenticated users
grant select on public.user_stats to authenticated;
